#!/usr/bin/env python3
"""Create the public submission dataset without contact details."""

from __future__ import annotations

import csv
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urlparse

SOURCE = Path("/Users/sherryjiang/Downloads/Build_With_Gemini_Hack_-_2026_export (1).csv")
DESTINATION = Path(__file__).resolve().parents[1] / "data" / "submissions.json"

FINALISTS = [
    "OrcAIPlay",
    "Project Rehab",
    "Gemma Companion",
    "familiar",
    "The Heirloom",
    "Remember AI",
    "Sentry",
]

PROJECT_NEEDS_UPDATE = {
    9: "not_found", 11: "not_found", 12: "not_found", 18: "not_found",
    19: "server_error", 29: "not_found", 30: "server_error", 39: "server_error",
    47: "not_found", 54: "server_error", 55: "auth_redirect", 58: "auth_redirect",
}

DEMO_NEEDS_UPDATE = {
    15: "cookie_gate", 17: "edit_link", 20: "cookie_gate", 21: "edit_link",
    42: "not_found", 43: "server_error", 44: "server_error", 50: "generic_target",
    57: "shortener_blocked", 58: "cookie_gate", 59: "wrong_content_type",
    60: "wrong_content_type", 61: "wrong_content_type",
}


def urls(value: str) -> list[str]:
    return [item.rstrip(").,]") for item in re.findall(r"https?://[^\s<]+", value or "")]


def display_name(value: str) -> str:
    if not value.startswith("http"):
        return value.strip()
    parsed = urlparse(value)
    return parsed.netloc.removeprefix("www.").split(".")[0] or value


def summary(value: str) -> str:
    cleaned = re.sub(r"https?://\S+", "", value or "")
    cleaned = re.sub(r"^#+\s*", "", cleaned, flags=re.MULTILINE)
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    if len(cleaned) <= 420:
        return cleaned
    clipped = cleaned[:417].rsplit(" ", 1)[0]
    return f"{clipped}…"


def stable_shuffle_key(item: dict[str, object]) -> str:
    source = f"build-with-gemini-2026:{item['id']}:{item['name']}"
    return hashlib.sha256(source.encode("utf-8")).hexdigest()


def link_audit(item_id: int, links: list[str], needs_update: dict[int, str]) -> dict[str, str]:
    if not links:
        return {"status": "missing", "reason": "not_submitted"}
    if item_id in needs_update:
        return {"status": "needs_update", "reason": needs_update[item_id]}
    return {"status": "complete", "reason": "ok"}


with SOURCE.open(newline="", encoding="utf-8-sig") as handle:
    rows = list(csv.DictReader(handle))

public_rows = []
for index, row in enumerate(rows, start=1):
    project_links = urls(row.get("GitHub", ""))
    video_links = urls(row.get("Video", ""))
    public_rows.append(
        {
            "id": index,
            "name": display_name(row.get("Team", "")) or f"Project {index}",
            "members": [name.strip() for name in row.get("Members", "").split(",") if name.strip() and not name.strip().startswith("http")],
            "summary": summary(row.get("Description", "")),
            "tracks": [track.strip().replace("Google Deepmind - ", "") for track in row.get("Sponsor Prizes", "").split(";") if track.strip()],
            "projectLinks": project_links,
            "videoLinks": video_links,
            "projectLinkAudit": link_audit(index, project_links, PROJECT_NEEDS_UPDATE),
            "videoLinkAudit": link_audit(index, video_links, DEMO_NEEDS_UPDATE),
        }
    )

finalist_order = {name: index for index, name in enumerate(FINALISTS)}
public_rows.sort(
    key=lambda item: (
        0 if item["name"] in finalist_order else 1,
        finalist_order.get(item["name"], stable_shuffle_key(item)),
    )
)

for public_index, item in enumerate(public_rows, start=1):
    item["publicId"] = public_index
    item["isFinalist"] = item["name"] in finalist_order

DESTINATION.parent.mkdir(parents=True, exist_ok=True)
DESTINATION.write_text(json.dumps(public_rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {len(public_rows)} public submissions to {DESTINATION}")

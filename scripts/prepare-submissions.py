#!/usr/bin/env python3
"""Create the public submission dataset without contact details."""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path
from urllib.parse import urlparse

SOURCE = Path("/Users/sherryjiang/Downloads/Build_With_Gemini_Hack_-_2026_export (1).csv")
DESTINATION = Path(__file__).resolve().parents[1] / "data" / "submissions.json"


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


with SOURCE.open(newline="", encoding="utf-8-sig") as handle:
    rows = list(csv.DictReader(handle))

public_rows = []
for index, row in enumerate(rows, start=1):
    public_rows.append(
        {
            "id": index,
            "name": display_name(row.get("Team", "")) or f"Project {index}",
            "members": [name.strip() for name in row.get("Members", "").split(",") if name.strip() and not name.strip().startswith("http")],
            "summary": summary(row.get("Description", "")),
            "tracks": [track.strip().replace("Google Deepmind - ", "") for track in row.get("Sponsor Prizes", "").split(";") if track.strip()],
            "projectLinks": urls(row.get("GitHub", "")),
            "videoLinks": urls(row.get("Video", "")),
        }
    )

DESTINATION.parent.mkdir(parents=True, exist_ok=True)
DESTINATION.write_text(json.dumps(public_rows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Wrote {len(public_rows)} public submissions to {DESTINATION}")

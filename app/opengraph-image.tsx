import { ImageResponse } from "next/og";

export const alt = "Build with Gemini Hackathon 2026 — 61 builds, one remarkable day";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#ffffff",
        color: "#202124",
        fontFamily: "Google Sans, Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "54px 64px 42px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#5f6368", fontSize: 21, fontWeight: 500 }}>
          <span style={{ display: "flex", width: 24, height: 24, background: "#9b72cb", clipPath: "polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%)" }} /> Build with Gemini Hackathon 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 400, letterSpacing: -6, lineHeight: .88 }}>61 builds.</div>
          <div style={{ display: "flex", color: "#1a73e8", fontSize: 112, fontWeight: 400, letterSpacing: -6, lineHeight: .88 }}>One remarkable day.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", borderTop: "1px solid #dadce0", paddingTop: 20, color: "#5f6368", fontSize: 18 }}>
          <span style={{ display: "flex", width: "34%" }}>22 August 2026 · Singapore</span>
          <span style={{ display: "flex", width: "33%", borderLeft: "1px solid #dadce0", paddingLeft: 24 }}>61 submissions</span>
          <span style={{ display: "flex", width: "33%", borderLeft: "1px solid #dadce0", paddingLeft: 24 }}>3 prize tracks</span>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", height: 4 }}><span style={{ display: "flex", width: "25%", background: "#1a73e8" }} /><span style={{ display: "flex", width: "25%", background: "#d93025" }} /><span style={{ display: "flex", width: "25%", background: "#f9ab00" }} /><span style={{ display: "flex", width: "25%", background: "#188038" }} /></div>
      </div>
    </div>,
    size,
  );
}

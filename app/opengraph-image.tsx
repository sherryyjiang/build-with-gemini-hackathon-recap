import { ImageResponse } from "next/og";

export const alt = "Build with Gemini Hackathon 2026 — 61 builds, one day";
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
        background: "#17142f",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "62%", padding: "58px 64px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 23, fontWeight: 700 }}>
          <span style={{ display: "flex", width: 28, height: 28, background: "#9fc1ff", clipPath: "polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%)" }} /> Build with Gemini
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#9fc1ff", fontSize: 104, fontWeight: 800, letterSpacing: -5, lineHeight: .9 }}>61 builds.</div>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 800, letterSpacing: -5, lineHeight: .9 }}>One day.</div>
        </div>
        <div style={{ display: "flex", fontSize: 20, color: "#dce4ff" }}>22 August 2026 · Singapore</div>
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "38%", background: "#356bc9" }}>
        <div style={{ position: "absolute", width: 360, height: 360, border: "2px solid rgba(255,255,255,.55)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", width: 230, height: 230, border: "1px solid rgba(255,255,255,.35)", borderRadius: "50%" }} />
        <div style={{ display: "flex", width: 150, height: 150, background: "white", clipPath: "polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%)", transform: "translateY(-8px)" }} />
        <div style={{ position: "absolute", top: 64, right: 52, display: "flex", flexDirection: "column", padding: "14px 18px", background: "#244b90" }}>
          <b style={{ fontSize: 38 }}>3</b><span style={{ fontSize: 12, letterSpacing: 1 }}>PRIZE TRACKS</span>
        </div>
        <div style={{ position: "absolute", bottom: 54, left: 44, width: 18, height: 18, borderRadius: "50%", background: "#fbbc04" }} />
        <div style={{ position: "absolute", top: 190, left: 34, width: 14, height: 14, borderRadius: "50%", background: "#ea4335" }} />
      </div>
    </div>,
    size,
  );
}

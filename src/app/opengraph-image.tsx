import { ImageResponse } from "next/og";

export const alt = "Rosemont Grove | Luxury Detached Homes in Brampton";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(145deg, #1A1814 0%, #2C2A26 55%, #5C6452 160%)",
          color: "#F7F3EC",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#C4B8A8",
            }}
          >
            Rosemont Grove · Brampton
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.05, maxWidth: 900 }}>
            Luxury Detached Homes by Hallett Homes
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#E8DFD0",
          }}
        >
          <div>59 residences · 38′ & 41′ detached</div>
          <div>Heritage Rd & Steeles Ave W</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

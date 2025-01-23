import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Metin Faruk Bıyık - Geliştirici";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #ffffff, #f8fafc)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "48px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 25% 25%, rgba(0, 100, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(150, 0, 255, 0.05) 0%, transparent 50%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            maxWidth: "800px",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "64px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #0066ff, #9900ff)",
                backgroundClip: "text",
                color: "transparent",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Metin Faruk Bıyık
            </h1>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                background: "linear-gradient(to right, #0066ff, #9900ff)",
                backgroundClip: "text",
                color: "transparent",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Geliştirici
            </p>
          </div>
          <p
            style={{
              fontSize: "32px",
              color: "#334155",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Web teknolojileri ve modern uygulama geliştirme alanında kendini sürekli geliştiren, öğrenmeye ve paylaşmaya tutkulu bir yazılım geliştirici.
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 
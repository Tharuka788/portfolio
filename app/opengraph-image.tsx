import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Tharuka Umayanga Portfolio";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image() {
    // Font
    const interSemiBold = await fetch(
        new URL("https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVu0-UEuy9.woff"),
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#030014", // Dark background
                    backgroundImage:
                        "linear-gradient(to bottom right, #030014 0%, #1a0b2e 50%, #030014 100%)",
                    fontFamily: "Inter",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "80%",
                        height: "80%",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "20px",
                        background: "rgba(255, 255, 255, 0.03)",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                    }}
                >
                    {/* Profile Image (Simulated with div if fetching fails, but user asked to use uploaded photo) */}
                    {/* If you have a local image, you'd typically need to base64 encode it or fetch it. 
              Since this runs on edge, fetching from public URL is safer. 
              Here we will try to use a text-based avatar if image loading is complex in this env without absolute URL, 
              but let's try a simple approach first. 
           */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 40,
                            width: 150,
                            height: 150,
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #7000ff, #bd00ff)',
                            color: 'white',
                            fontSize: 80,
                            fontWeight: 700,
                            overflow: 'hidden'
                        }}
                    >
                        {/* Requires absolute URL in production. For now, using initials. */}
                        TU
                    </div>

                    <div
                        style={{
                            fontSize: 60,
                            fontStyle: "normal",
                            fontWeight: 700,
                            color: "white",
                            marginTop: 20,
                            lineHeight: 1.2,
                            whiteSpace: "pre-wrap",
                            textAlign: "center",
                        }}
                    >
                        Tharuka Umayanga
                    </div>

                    <div
                        style={{
                            fontSize: 30,
                            fontStyle: "normal",
                            fontWeight: 400,
                            color: "#a3a3a3",
                            marginTop: 20,
                            textAlign: "center",
                        }}
                    >
                        IT Undergraduate at SLIIT
                    </div>

                    <div
                        style={{
                            fontSize: 24,
                            fontStyle: "normal",
                            fontWeight: 400,
                            color: "#7000ff",
                            marginTop: 10,
                            textAlign: "center",
                        }}
                    >
                        Full Stack Developer
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: "Inter",
                    data: interSemiBold,
                    style: "normal",
                    weight: 600,
                },
            ],
        },
    );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Slider({ images = [], autoPlay = true, interval = 4000 }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next, total]);

  if (total === 0) return null;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: "16px",
    }}>
      {images.map((src, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.05)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <Image
            src={src}
            alt={`Slide ${i + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority={i === 0}
          />
        </div>
      ))}

      {total > 1 && (
        <>
          <button onClick={prev} style={{
            position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)", color: "#fff", border: "none",
            width: 44, height: 44, borderRadius: "50%", fontSize: "1.2rem",
            cursor: "pointer", zIndex: 2, backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "0.3s",
          }}
          onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={e => e.target.style.background = "rgba(0,0,0,0.5)"}
          >‹</button>
          <button onClick={next} style={{
            position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)", color: "#fff", border: "none",
            width: 44, height: 44, borderRadius: "50%", fontSize: "1.2rem",
            cursor: "pointer", zIndex: 2, backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "0.3s",
          }}
          onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.2)"}
          onMouseLeave={e => e.target.style.background = "rgba(0,0,0,0.5)"}
          >›</button>

          <div style={{
            position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 8, zIndex: 2,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? 28 : 10, height: 10, borderRadius: 5,
                  background: i === current ? "#fff" : "rgba(255,255,255,0.4)",
                  border: "none", cursor: "pointer", transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

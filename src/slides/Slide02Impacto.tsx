// src/slides/Slide02Impacto.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { AlertTriangle } from "lucide-react";
import { COLORS, PillarBar, useActiveItem, SlideShell, FONTS } from "../lib/utils";

export function Slide02Impacto() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Entire slide lifecycle (avoids fade-out before end)
  const masterOp = useActiveItem(0);

  // Kinetic timings
  const impactSpring = (delay: number) => spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.8 }
  });

  const eduS = impactSpring(15);
  const eduOp = interpolate(frame, [15, 25], [0, 1], { extrapolateRight: "clamp" });
  const eduTranslate = interpolate(eduS, [0, 1], [40, 0]);

  const enfS = impactSpring(40);
  const enfOp = interpolate(frame, [40, 45], [0, 1], { extrapolateRight: "clamp" });
  const enfScale = interpolate(enfS, [0, 1], [2.5, 1]);

  const desS = impactSpring(70);
  const desOp = interpolate(frame, [70, 75], [0, 1], { extrapolateRight: "clamp" });
  const desScale = interpolate(desS, [0, 1], [3, 1]);

  const alertBeat = spring({
    frame: (frame - 70) % 30,
    fps,
    config: { damping: 10, stiffness: 200 }
  });
  const alertScale = interpolate(alertBeat, [0, 1], [1, 1.05]);

  return (
    <SlideShell style={{ padding: "0 60px", alignItems: "center", justifyContent: "center", position: "relative" }}>
      <PillarBar style={{ position: "absolute", top: 120, width: "calc(100% - 160px)", height: 18, borderRadius: 9 }} />

      <div style={{ ...masterOp.style, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        
        {/* Background Gigantic Icon */}
        <div style={{ 
           position: "absolute", opacity: 0.04, 
           transform: `scale(${desScale}) rotate(${interpolate(frame, [0, 300], [0, -10])}deg)` 
        }}>
           <AlertTriangle size={1500} color={COLORS.red} strokeWidth={1} />
        </div>

        {/* 1. Intro phrase */}
        <h2 style={{ 
           opacity: eduOp, 
           transform: `translateY(${eduTranslate}px)`,
           fontSize: 40, fontFamily: FONTS.display, fontWeight: 900, 
           color: COLORS.textGray, letterSpacing: 10, textTransform: "uppercase", 
           margin: "0 0 100px 0", textAlign: "center" 
        }}>
           A Educação Brasileira
        </h2>

        {/* 2. Middle Impact */}
        <h1 style={{ 
           opacity: enfOp, 
           transform: `scale(${enfScale})`,
           fontSize: 100, fontFamily: FONTS.display, fontWeight: 900, 
           color: COLORS.navy, letterSpacing: -2, textTransform: "uppercase", 
           margin: 0, textAlign: "center", lineHeight: 1 
        }}>
           Enfrenta um
        </h1>

        {/* 3. Final Huge Punch with Icon */}
        <div style={{
           opacity: desOp,
           transform: `scale(${desScale})`,
           display: "flex", flexDirection: "column", alignItems: "center",
           marginTop: 20
        }}>
           <div style={{ transform: `scale(${alertScale})`, marginBottom: 30, color: COLORS.red }}>
              <AlertTriangle size={140} strokeWidth={2.5} />
           </div>
           
           <h1 style={{ 
              fontSize: 140, fontFamily: FONTS.display, fontWeight: 900, 
              color: COLORS.red, letterSpacing: -6, textTransform: "uppercase", 
              margin: 0, textAlign: "center", lineHeight: 0.9, textShadow: `0 40px 100px rgba(255,0,0,0.2)`
           }}>
              Grande <br /> Desafio
           </h1>
        </div>

      </div>
    </SlideShell>
  );
}

// src/slides/Slide01Capa.tsx
import React from "react";
import { Img, useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { Cpu, Database, GraduationCap } from "lucide-react";
import { useFadeIn, COLORS, FONTS, LOGO_PNG, HUD_RING_PNG, GLASS_STYLE, TransparentImg } from "../lib/utils";

export function Slide01Capa() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bgOpacity = useFadeIn(0, 60);

  // Helper para as pancadas de texto
  const impactSpring = (delay: number) => spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 220, mass: 0.8 }
  });

  // Timings Extratos do Audio
  // 0 - 80: "Projeto Alpha"
  const projAlphaOpacity = interpolate(frame, [0, 20, 70, 90], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // 90: "Tecnologia"
  const techS = impactSpring(90);
  const techOp = interpolate(frame, [90, 95, 125, 138], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const techScale = interpolate(techS, [0, 1], [4, 1]);

  // 138: "Dados"
  const dadosS = impactSpring(138);
  const dadosOp = interpolate(frame, [138, 143, 165, 180], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const dadosScale = interpolate(dadosS, [0, 1], [4, 1]);

  // 180: "Educação"
  const eduS = impactSpring(180);
  const eduOp = interpolate(frame, [180, 185, 230, 250], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const eduScale = interpolate(eduS, [0, 1], [4, 1]);

  // 240+: O Hook Final (Logo, Ring, Subtitle)
  const landingSpring = spring({ frame: frame - 230, fps, config: { damping: 16, stiffness: 100 } });
  const heroOp = landingSpring;
  const heroScale = interpolate(landingSpring, [0, 1], [0.8, 1]);
  const ringRotate = frame * 0.5;

  // Styler para as pancadas
  const impactStyle: React.CSSProperties = {
    position: "absolute",
    fontFamily: FONTS.display,
    fontWeight: 900,
    textTransform: "uppercase",
    margin: 0,
    textAlign: "center",
    letterSpacing: -8,
    textShadow: `0 40px 100px rgba(0,0,0,0.15)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 15 // spacing right between icon and word
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      boxSizing: "border-box",
      fontFamily: FONTS.body,
      opacity: bgOpacity,
      position: "relative",
      background: COLORS.white,
      overflow: "hidden"
    }}>
      
      {/* 1. Intro Fade (Projeto Alpha) */}
      <div style={{ position: "absolute", opacity: projAlphaOpacity, zIndex: 10 }}>
         <h1 style={{ ...impactStyle, position: "relative", color: COLORS.navy, fontSize: 130 }}>
            Projeto <span style={{ color: COLORS.blue }}>Alpha</span>
         </h1>
      </div>

      {/* 2. Impact Words */}
      <div style={{ ...impactStyle, fontSize: 130, opacity: techOp, transform: `scale(${techScale}) translateY(-20px)`, color: COLORS.navy, zIndex: 20 }}>
         <Cpu size={150} strokeWidth={1.5} />
         TECNOLOGIA
      </div>
      <div style={{ ...impactStyle, fontSize: 240, opacity: dadosOp, transform: `scale(${dadosScale}) translateY(-20px)`, color: COLORS.blue, zIndex: 20 }}>
         <Database size={260} strokeWidth={2} />
         DADOS
      </div>
      <div style={{ ...impactStyle, fontSize: 150, opacity: eduOp, transform: `scale(${eduScale}) translateY(-20px)`, color: COLORS.red, zIndex: 20 }}>
         <GraduationCap size={160} strokeWidth={1.5} />
         EDUCAÇÃO
      </div>

      {/* 3. The Grand Landing (Frame 240+) */}
      <div style={{ 
        position: "absolute", width: "100%", height: "100%", 
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity: heroOp, transform: `scale(${heroScale})`, zIndex: 30
      }}>
         {/* Revolving Background HUD */}
         <div style={{ position: "absolute", top: "45%", left: "50%", transform: `translate(-50%, -50%) rotate(${ringRotate}deg)`, width: 1400, height: 1400, opacity: 0.08, pointerEvents: "none" }}>
            <TransparentImg src={HUD_RING_PNG} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
         </div>

         {/* Hero Logo */}
         <div style={{ display: "flex", width: 440, height: 440, justifyContent: "center", alignItems: "center", position: "relative", marginBottom: 80 }}>
            <div style={{ width: 440, height: 440, background: COLORS.white, borderRadius: "50%", padding: 60, boxShadow: "0 60px 160px rgba(13,27,62,0.15)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 10 }}>
               <Img src={LOGO_PNG} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            {/* Outer Energy Rings */}
            <div style={{ position: "absolute", borderRadius: "50%", border: `3px solid ${COLORS.blue}33`, width: 540, height: 540, transform: `scale(${1 + Math.sin(frame/15)*0.08})`, opacity: 0.6, boxShadow: `0 0 60px ${COLORS.blue}22` }} />
         </div>

         {/* Master Subtitle */}
         <div style={{ 
           textAlign: "center", ...GLASS_STYLE, borderRadius: 60, padding: "50px 80px",
           border: `1px solid rgba(255,255,255,0.8)`, boxShadow: "0 50px 120px rgba(13,27,62,0.1)",
           background: "rgba(255,255,255,0.95)"
         }}>
           <p style={{ fontSize: 52, color: COLORS.navy, fontWeight: 900, lineHeight: 1.2, margin: 0, letterSpacing: -2 }}>
             Trabalhando Juntos <br />
             <span style={{ color: COLORS.blue, fontSize: 64, textTransform: "uppercase" }}>
               Pelo Potencial do Estudante
             </span>
           </p>
         </div>
      </div>

    </div>
  );
}

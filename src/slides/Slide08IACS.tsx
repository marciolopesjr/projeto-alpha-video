// src/slides/Slide08IACS.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, PillarBar, useActiveItem, GLASS_STYLE, SlideShell, SlideTitle, NumberTicker, AnimatedText } from "../lib/utils";

export function Slide08IACS({ index = 0 }: { index?: number }) {
  const frame = useCurrentFrame();
  const titleAnim = useActiveItem(0, 360);
  const cardAnim = useActiveItem(60, 360);

  // Smooth cinematic spring for the gauge needle
  const sprNeedle = spring({
    frame: frame - 100,
    fps: 60,
    config: { damping: 15, stiffness: 60, mass: 1 },
  });

  const needle = interpolate(sprNeedle, [0, 1], [-90, 52], { 
    extrapolateLeft: "clamp", 
    extrapolateRight: "clamp" 
  });

  return (
    <SlideShell style={{ padding: "140px 80px" }}>
      <PillarBar style={{ position: "absolute", top: 120, width: "calc(100% - 200px)", height: 18, borderRadius: 9 }} />
      <SlideTitle anim={titleAnim} style={{ marginBottom: 40, marginTop: 40 }}>
        <AnimatedText text="Índice Alpha" startFrame={20} /><br />
        <span style={{ color: COLORS.blue }}><AnimatedText text="(IACS)" startFrame={60} /></span>
      </SlideTitle>
      
      <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", flexDirection: "column", gap: 50, alignItems: "center", justifyContent: "center" }}>
        
        {index === 0 && (
          <>
            <div style={{ ...cardAnim.style, flexDirection: "column", alignItems: "center", gap: 20 }}>
               <svg viewBox="0 0 280 180" style={{ width: 550, filter: "drop-shadow(0 60px 140px rgba(13,27,62,0.2))" }}>
                  <path d="M 30 160 A 110 110 0 0 1 250 160" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="24" strokeLinecap="round" />
                  <path d="M 30 160 A 110 110 0 0 1 100 62" fill="none" stroke={COLORS.red} strokeWidth="24" strokeLinecap="round" />
                  <path d="M 100 62 A 110 110 0 0 1 180 62" fill="none" stroke={COLORS.yellow} strokeWidth="24" strokeLinecap="round" />
                  <path d="M 180 62 A 110 110 0 0 1 250 160" fill="none" stroke={COLORS.green} strokeWidth="24" strokeLinecap="round" />
                  <g transform={`rotate(${needle}, 140, 160)`}>
                    <line x1="140" y1="160" x2="140" y2="45" stroke={COLORS.navy} strokeWidth="10" strokeLinecap="round" />
                  </g>
                  <circle cx="140" cy="160" r="16" fill={COLORS.navy} />
               </svg>
               
               <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: 130, fontWeight: 900, color: COLORS.navy, margin: 0, letterSpacing: -6 }}>
                     <NumberTicker value={86} startFrame={140} duration={80} />
                  </h2>
                  <p style={{ fontSize: 44, fontWeight: 900, color: COLORS.green, letterSpacing: -2, margin: 0 }}>SAUDÁVEL</p>
               </div>
            </div>

            <div style={{ ...cardAnim.style, width: "100%", flexDirection: "column", gap: 20 }}>
               {[["SAUDÁVEL", COLORS.green, "80-100%"], ["ATENÇÃO", COLORS.yellow, "60-79%"], ["INTERVENÇÃO", COLORS.red, "0-59%"]].map(([l,c, v],i) => (
                 <div key={i} style={{ 
                   ...GLASS_STYLE, 
                   borderRadius: 30, 
                   padding: "25px 40px", 
                   borderLeft: `15px solid ${c as string}`, 
                   boxShadow: "0 20px 50px rgba(0,0,0,0.04)", 
                   display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
                   background: "rgba(255,255,255,0.95)"
                  }}>
                    <span style={{ fontSize: 32, fontWeight: 900, color: COLORS.navy, letterSpacing: -1 }}>{l as string}</span>
                    <span style={{ fontSize: 28, fontWeight: 800, color: COLORS.textGray }}>{v as string}</span>
                 </div>
               ))}
            </div>
          </>
        )}

        {index === 1 && (
          <div style={{ ...cardAnim.style, width: "100%", background: COLORS.navy, borderRadius: 60, padding: "100px 72px", boxShadow: "0 80px 180px rgba(13,27,62,0.6)", border: "4px solid rgba(255,255,255,0.1)", flexDirection: "column", gap: 50, alignItems: "center", position: "relative", overflow: "hidden" }}>
             {/* Dynamic Background Grid for scale effect */}
             <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, background: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

             <div style={{ position: "relative", zIndex: 2, textAlign: "center", display: "flex", flexDirection: "column", gap: 20 }}>
                <p style={{ fontSize: 56, fontWeight: 700, color: "rgba(255,255,255,0.6)", margin: 0, letterSpacing: 4 }}>ESCALABILIDADE</p>
                <h3 style={{ fontSize: 100, fontWeight: 900, color: COLORS.white, margin: 0, lineHeight: 1, letterSpacing: -5 }}>
                  Gerencie <span style={{ color: COLORS.yellow }}><NumberTicker value={50} startFrame={100} duration={60} /></span> escolas 
                </h3>
                <p style={{ fontSize: 72, fontWeight: 900, color: COLORS.yellow, margin: 0, letterSpacing: -3 }}>
                  <AnimatedText text="em segundos." startFrame={160} />
                </p>
             </div>

             <div style={{ width: "100%", height: 16, background: "rgba(255,255,255,0.05)", borderRadius: 8, overflow: "hidden", position: "relative" }}>
                <div style={{ 
                  width: interpolate(frame - 100, [0, 80], [0, 100], { extrapolateRight: "clamp" }) + "%", 
                  height: "100%", 
                  background: `linear-gradient(90deg, ${COLORS.blue}, ${COLORS.yellow})`,
                  boxShadow: `0 0 30px ${COLORS.yellow}80`
                }} />
             </div>

             <div style={{ display: "flex", gap: 20, opacity: 0.5 }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} style={{ 
                    width: 24, 
                    height: 24, 
                    borderRadius: "50%", 
                    background: COLORS.white,
                    transform: `scale(${1 + Math.sin(frame/10 + i)*0.3})`,
                    boxShadow: i === 2 ? `0 0 20px ${COLORS.white}` : "none"
                  }} />
                ))}
             </div>
          </div>
        )}


      </div>
    </SlideShell>
  );
}

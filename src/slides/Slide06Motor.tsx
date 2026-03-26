// src/slides/Slide06Motor.tsx
import React from "react";
import { Gamepad2, Zap, BarChart3, Settings } from "lucide-react";
import { COLORS, PillarBar, useActiveItem, GLASS_STYLE, SlideShell, SlideTitle, AnimatedText } from "../lib/utils";
import { useCurrentFrame } from "remotion";

const STEPS_DATA = [
  { label: "Interação Gamificada", icon: Gamepad2, desc: "Alunos jogam e interagem no aplicativo.", color: COLORS.blue },
  { label: "Algoritmo Invisível",   icon: Zap, desc: "Monitoramento constante em tempo real.",  color: COLORS.navy },
  { label: "Dashboards p/ Gestão",  icon: BarChart3, desc: "Dados claros para decisões estratégicas.", color: COLORS.green },
];

export function Slide06Motor({ index = 0 }: { index?: number }) {
  const frame = useCurrentFrame();
  const titleAnim = useActiveItem(0, 360);
  const cardAnim = useActiveItem(60, 360);
  const s = STEPS_DATA[index];

  const spinRotate = frame * 2.5;

  return (
    <SlideShell style={{ padding: "140px 80px" }}>
      <PillarBar style={{ position: "absolute", top: 120, width: "calc(100% - 200px)", height: 18, borderRadius: 9 }} />
      
      <SlideTitle anim={titleAnim} style={{ marginBottom: 60, marginTop: 40 }}>
        <AnimatedText text="Motor de" startFrame={20} /><br />
        <span style={{ color: COLORS.blue }}><AnimatedText text="Tradução" startFrame={60} /></span>
      </SlideTitle>

      <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Backdrop Decorative Gear - Moved to back layer */}
        <div style={{ 
          position: "absolute", 
          zIndex: -1, 
          bottom: -200, left: -200, 
          opacity: 0.04, 
          color: COLORS.navy, 
          transform: `scale(1.2) rotate(${spinRotate * 0.2}deg)`,
          pointerEvents: "none"
        }}>
          <Settings size={800} strokeWidth={0.5} />
        </div>

        <div style={{ 
          ...cardAnim.style, 
          width: "100%", 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          gap: 60,
          position: "relative",
          zIndex: 10
        }}>
           {/* Massive Tech Circle */}
           <div style={{ 
             width: 450, 
             height: 450, 
             borderRadius: "80px", 
             background: COLORS.white,
             ...GLASS_STYLE,
             display: "flex", 
             alignItems: "center", 
             justifyContent: "center", 
             color: s.color,
             boxShadow: `0 40px 100px ${s.color}25`,
             borderBottom: `18px solid ${s.color}`,
             position: "relative",
             zIndex: 5
           }}>
              {/* Rotating Tech Rings */}
              <div style={{
                position: "absolute",
                inset: -25,
                border: `4px dashed ${s.color}40`,
                borderRadius: "100px",
                transform: `rotate(${spinRotate}deg)`,
                pointerEvents: "none"
              }} />
              <div style={{
                position: "absolute",
                inset: -50,
                border: `2px solid ${s.color}20`,
                borderRadius: "120px",
                transform: `rotate(${-spinRotate * 0.5}deg)`,
                pointerEvents: "none"
              }} />

              <s.icon size={260} strokeWidth={1.2} style={{ position: "relative", zIndex: 10 }} />
           </div>


           {/* Large Impact Content */}
           <div style={{ 
             textAlign: "center", 
             padding: "60px 50px",
             ...GLASS_STYLE,
             borderRadius: "50px",
             background: "rgba(255,255,255,0.92)",
             boxShadow: "0 40px 120px rgba(0,0,0,0.08)",
             borderLeft: `22px solid ${s.color}`,
             width: "100%",
             display: "flex",
             flexDirection: "column",
             alignItems: "center",
             gap: 20
           }}>
              <div style={{ 
                background: s.color, color: COLORS.white, 
                width: 65, height: 65, borderRadius: "50%", 
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 34, fontWeight: 900,
                marginBottom: 10
              }}>
                {index + 1}
              </div>
              
              <h3 style={{ 
                fontSize: 64, 
                fontWeight: 900, 
                color: COLORS.navy, 
                margin: 0, 
                letterSpacing: -3, 
                textTransform: "uppercase",
                lineHeight: 1
              }}>
                <AnimatedText text={s.label} startFrame={75} />
              </h3>

              <p style={{ fontSize: 44, color: COLORS.textGray, margin: 0, fontWeight: 600, lineHeight: 1.1 }}>
                {s.desc}
              </p>
           </div>
        </div>
      </div>
    </SlideShell>
  );
}

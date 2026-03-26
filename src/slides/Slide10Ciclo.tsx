// src/slides/Slide10Ciclo.tsx
import React from "react";
import { Compass, Smartphone, Cloud, ClipboardCheck, RefreshCw } from "lucide-react";
import { COLORS, PillarBar, useActiveItem, GLASS_STYLE, SlideShell, SlideTitle, AnimatedText } from "../lib/utils";
import { useCurrentFrame } from "remotion";

const STEPS = [
  { label: "Diagnóstico", icon: Compass, color: COLORS.blue },
  { label: "Monitoramento", icon: Smartphone, color: COLORS.green },
  { label: "Análise",       icon: Cloud, color: COLORS.yellow },
  { label: "Ação",          icon: ClipboardCheck, color: COLORS.red },
];

export function Slide10Ciclo({ index = 0 }: { index?: number }) {
  const frame = useCurrentFrame();
  const titleAnim = useActiveItem(0, 360);
  const cardAnim = useActiveItem(60, 360);
  const s = STEPS[index];

  return (
    <SlideShell style={{ padding: "140px 80px" }}>
      <PillarBar style={{ position: "absolute", top: 120, width: "calc(100% - 200px)", height: 18, borderRadius: 9 }} />
      <SlideTitle anim={titleAnim} style={{ marginBottom: 60, marginTop: 40 }}>
        <AnimatedText text="Ciclo de" startFrame={20} /><br />
        <span style={{ color: COLORS.blue }}><AnimatedText text="Melhoria" startFrame={60} /></span>
      </SlideTitle>

      <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        
        <div style={{ 
          ...cardAnim.style, 
          width: "100%", 
          ...GLASS_STYLE, 
          borderRadius: 60, 
          padding: "80px 50px", 
          borderBottom: `24px solid ${s.color}`, 
          boxShadow: `0 50px 120px ${s.color}15`, 
          flexDirection: "column", 
          alignItems: "center", 
          gap: 60,
          background: "rgba(255,255,255,0.95)"
        }}>
           <div style={{ 
             color: s.color, 
             filter: `drop-shadow(0 30px 60px ${s.color}20)`,
             transform: `scale(${1 + Math.sin(frame/25)*0.05})`
           }}>
             <s.icon size={300} strokeWidth={1} />
           </div>
           
           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <div style={{ 
                background: `${s.color}20`, 
                padding: "10px 40px", 
                borderRadius: 30,
              }}>
                 <span style={{ fontSize: 32, fontWeight: 900, color: s.color, letterSpacing: 10 }}>PASSO 0{index+1}</span>
              </div>
              <h3 style={{ fontSize: 92, fontWeight: 900, color: COLORS.navy, margin: 0, letterSpacing: -5 }}>
                <AnimatedText text={s.label} startFrame={75} />
              </h3>
           </div>
        </div>

        {/* Rotation Indicator */}
        <div style={{ position: "absolute", bottom: -100, opacity: 0.1 }}>
           <RefreshCw size={200} color={COLORS.navy} />
        </div>
      </div>
    </SlideShell>
  );
}


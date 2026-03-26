import React from "react";
import { useCurrentFrame } from "remotion";
import { Target, Brain, Heart, Globe } from "lucide-react";
import { 
  COLORS, 
  PillarBar, 
  useActiveItem, 
  GLASS_STYLE, 
  AnimatedText, 
  SlideShell, 
  SlideTitle, 
} from "../lib/utils";

const PILLARS_DATA = [
  { icon: Target, title: "Gestão do Foco", color: COLORS.red },
  { icon: Brain, title: "Autorregulação", color: COLORS.blue },
  { icon: Heart, title: "Inteligência Emocional", color: COLORS.yellow },
  { icon: Globe, title: "Cultura Digital", color: COLORS.green }
];

export function Slide05Pilares({ index = 0 }: { index?: number }) {
  const frame = useCurrentFrame();
  const titleAnim  = useActiveItem(0, 360);
  const p = PILLARS_DATA[index];
  const cardAnim = useActiveItem(60, 360);

  const sweepPos = (frame * 8) % 2000;

  return (
    <SlideShell style={{ padding: "140px 80px", alignItems: "center", justifyContent: "flex-start" }}>
      <PillarBar style={{ position: "absolute", top: 120, width: "calc(100% - 160px)", height: 18, borderRadius: 9 }} />

      <SlideTitle anim={titleAnim} style={{ marginBottom: 40, marginTop: 40 }}>
        <AnimatedText text="4 Pilares do" startFrame={20} /><br />
        <span style={{ color: COLORS.blue }}><AnimatedText text="Projeto Alpha" startFrame={50} /></span>
      </SlideTitle>

      <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          
          <div 
            style={{ 
              ...cardAnim.style,
              position: "absolute", 
              width: "100%",
              height: 900,
              ...GLASS_STYLE, 
              borderRadius: 60, 
              padding: "80px 40px", 
              borderLeft: `24px solid ${p.color}`,
              boxShadow: `0 60px 140px ${p.color}20`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 60,
              background: "rgba(255,255,255,0.95)",
              overflow: "hidden"
            }}
          >
             {/* Shine Effect */}
             <div style={{
                position: "absolute", top: 0, left: sweepPos - 800, width: 600, height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                transform: "skewX(-30deg)",
                pointerEvents: "none",
                opacity: 0.5
             }} />

             <div style={{ 
                width: 380, 
                height: 380, 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: COLORS.white,
                borderRadius: "50%",
                padding: 40,
                boxShadow: `0 30px 80px ${p.color}30`,
                transform: `scale(${1 + Math.sin(frame/30)*0.04})`,
                position: "relative",
                border: `2px solid ${p.color}15`,
                color: p.color
             }}>
                <p.icon size={260} strokeWidth={1.2} />
             </div>


             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <div style={{ 
                  background: `${p.color}15`, 
                  padding: "10px 30px", 
                  borderRadius: 20,
                  marginBottom: 10
                }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: p.color, letterSpacing: 8, textTransform: "uppercase" }}>PILAR 0{index+1}</span>
                </div>
                
                <h2 style={{ 
                  fontSize: 72, 
                  fontWeight: 900, 
                  color: COLORS.navy, 
                  margin: 0, 
                  lineHeight: 1,
                  letterSpacing: -4,
                  textAlign: "center"
                }}>
                  <AnimatedText text={p.title} startFrame={75} />
                </h2>
             </div>
          </div>
      </div>

      <div style={{ textAlign: "center", opacity: 0.4, marginTop: 40, width: "100%" }}>
         <span style={{ fontSize: 24, fontWeight: 900, color: COLORS.textGray, letterSpacing: 10 }}>CORE METHODOLOGY</span>
      </div>
    </SlideShell>
  );
}



// src/slides/Slide11Sistemico.tsx
import React from "react";
import { Trophy, Star, Users, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

import { COLORS, PillarBar, useActiveItem, GLASS_STYLE, SlideShell, SlideTitle, AnimatedText, NumberTicker } from "../lib/utils";
import { useCurrentFrame, spring, interpolate } from "remotion";

export function Slide11Sistemico({ index = 0 }: { index?: number }) {
  const frame = useCurrentFrame();
  const titleAnim  = useActiveItem(0, 360);
  const cardAnim = useActiveItem(60, 360);

  const indicators = [
    { label: "Engajamento", color: COLORS.blue, icon: Users, value: 92 },
    { label: "Permanência", color: COLORS.green, icon: ShieldCheck, value: 88 },
    { label: "Convivência", color: COLORS.yellow, icon: Heart, value: 95 },
  ];

  return (
    <SlideShell style={{ padding: "140px 80px" }}>
      <PillarBar style={{ position: "absolute", top: 120, width: "calc(100% - 200px)", height: 18, borderRadius: 9 }} />
      <SlideTitle anim={titleAnim} style={{ marginBottom: 40, marginTop: 40 }}>
        <AnimatedText text="Indicadores" startFrame={20} /><br />
        <span style={{ color: COLORS.blue }}><AnimatedText text="Nacionais" startFrame={60} /></span>
      </SlideTitle>

      <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        
        {index === 0 && (
          <div style={{ ...cardAnim.style, width: "100%", display: "flex", flexDirection: "column", gap: 100 }}>



             {indicators.map((item, i) => {
               const delay = 80 + (i * 15);
               const spr = spring({ frame: frame - delay, fps: 60, config: { damping: 12, stiffness: 100 } });
               
               return (
                 <div key={i} style={{ 
                    ...GLASS_STYLE, 
                    borderRadius: 40, 
                    padding: "45px 50px", 
                    boxShadow: "0 24px 80px rgba(0,0,0,0.1)", 
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30,
                    background: "rgba(255,255,255,0.98)",
                    borderLeft: `20px solid ${item.color}`,
                    transform: `translateX(${interpolate(spr, [0, 1], [100, 0])}px) scale(${spr})`,
                    opacity: spr
                 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
                        <div style={{ background: `${item.color}15`, padding: "24px", borderRadius: "50%" }}>
                            <item.icon size={64} color={item.color} strokeWidth={2.5} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <span style={{ fontSize: 48, fontWeight: 900, color: COLORS.navy, display: "block", letterSpacing: -2 }}>{item.label}</span>
                            <span style={{ fontSize: 28, color: COLORS.textGray, fontWeight: 700, textTransform: "uppercase" }}>Impacto Sistêmico</span>
                        </div>
                    </div>
                    <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <div style={{ fontSize: 56, fontWeight: 900, color: item.color, display: "flex", alignItems: "center", gap: 5 }}>
                            <NumberTicker value={item.value} startFrame={delay + 20} duration={60} />%
                            <ArrowUpRight size={32} />
                        </div>
                        <div style={{ width: 120, height: 10, background: `${item.color}20`, borderRadius: 5, marginTop: 8 }}>
                            <div style={{ width: `${item.value}%`, height: "100%", background: item.color, borderRadius: 5 }} />
                        </div>
                    </div>
                 </div>
               );
             })}
          </div>
        )}

        {index === 1 && (
          <div style={{ 
              ...cardAnim.style, 
              width: "100%", 
              background: COLORS.navy, 
              borderRadius: 80, 
              padding: "100px 72px", 
              boxShadow: "0 80px 200px rgba(13,27,62,0.7)", 
              flexDirection: "column", 
              alignItems: "center", 
              gap: 100, 
              border: "4px solid rgba(255,255,255,0.15)",
              position: "relative",
              overflow: "hidden"
          }}>

             {/* Background Glow — simplificado em gradiente radial puro sem blur na CPU */}
             <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 800, background: `radial-gradient(circle, ${COLORS.yellow}20 0%, transparent 70%)` }} />

             <div style={{ 
                transform: `scale(${spring({ frame: frame - 100, fps: 60, config: { damping: 10, stiffness: 60, mass: 2 } })})`,
                zIndex: 2
             }}>
                <Trophy size={180} color={COLORS.yellow} strokeWidth={1.5} />
             </div>

             <div style={{ textAlign: "center", zIndex: 2 }}>
                <h3 style={{ fontSize: 92, fontWeight: 900, color: COLORS.white, margin: 0, letterSpacing: -5, lineHeight: 1.1 }}>
                  Impulso <br /> <span style={{ color: COLORS.yellow }}>no IDEB</span>
                </h3>
             </div>

             <div style={{ 
                 background: "rgba(255,255,255,0.1)", 
                 padding: "25px 50px", 
                 borderRadius: 40, 
                 display: "flex", 
                 alignItems: "center", 
                 gap: 30,
                 border: "2px solid rgba(255,255,255,0.1)",
                 zIndex: 2,
                 marginTop: 30,
                 transform: `scale(${interpolate(frame, [130, 160], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
                 opacity: interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
             }}>


                <Star size={44} color={COLORS.yellow} fill={COLORS.yellow} />
                <span style={{ fontSize: 36, color: COLORS.white, fontWeight: 900, letterSpacing: 1, textTransform: "uppercase" }}>Liderança Nacional</span>
             </div>
          </div>
        )}


      </div>
    </SlideShell>
  );
}

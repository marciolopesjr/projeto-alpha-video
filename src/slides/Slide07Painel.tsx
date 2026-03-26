// src/slides/Slide07Painel.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";
import { COLORS, PillarBar, useActiveItem, GLASS_STYLE, SlideShell, SlideTitle, AnimatedText } from "../lib/utils";

const RadarScanning = () => {
  const frame = useCurrentFrame();
  const rotation = frame * 4;
  
  return (
    <div style={{ position: "relative", width: 450, height: 450, borderRadius: "50%", border: `4px solid ${COLORS.blue}20`, background: `${COLORS.navy}08`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Radar Circles */}
        <div style={{ position: "absolute", width: "70%", height: "70%", border: "1px solid rgba(21, 101, 192, 0.2)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", width: "40%", height: "40%", border: "1px solid rgba(21, 101, 192, 0.2)", borderRadius: "50%" }} />
        
        {/* Radar Sweep */}
        <div style={{ 
            position: "absolute", 
            width: "100%", height: "100%", 
            background: `conic-gradient(from ${rotation}deg, ${COLORS.blue}60, transparent 90deg)`, 
            borderRadius: "50%" 
        }} />

        {/* Blind Spots Pins */}
        {[45, 160, 290].map((deg, i) => {
            const distance = 35 + (i * 5);
            const x = 50 + distance * Math.cos(deg * Math.PI / 180);
            const y = 50 + distance * Math.sin(deg * Math.PI / 180);
            // Flash when sweep passes
            const relativeRot = (rotation % 360);
            const diff = Math.abs(relativeRot - deg);
            const isNear = diff < 20 || diff > 340;
            
            return (
                <div key={i} style={{ 
                    position: "absolute", 
                    left: `${x}%`, top: `${y}%`, 
                    width: 24, height: 24, 
                    background: COLORS.red, 
                    borderRadius: "50%",
                    boxShadow: `0 0 30px ${COLORS.red}`,
                    opacity: isNear ? 1 : 0.3,
                    transform: `translate(-50%, -50%) scale(${isNear ? 1.5 : 1})`,
                    transition: "all 0.1s ease-out"
                }} />
            );
        })}
    </div>
  );
};

const ProficiencyHeatmap = () => {
    const frame = useCurrentFrame();
    
    // Spring dynamics for segments expansion
    const s1 = spring({ frame: frame - 80, fps: 60, config: { damping: 12, stiffness: 60 } });
    const s2 = spring({ frame: frame - 90, fps: 60, config: { damping: 12, stiffness: 60 } });
    const s3 = spring({ frame: frame - 100, fps: 60, config: { damping: 12, stiffness: 60 } });

    return (
        <div style={{ width: "100%", position: "relative", padding: "20px 0" }}>
           <div style={{ 
               display: "flex", 
               height: 240, 
               borderRadius: 120, 
               overflow: "hidden", 
               border: "8px solid white",
               boxShadow: "0 50px 120px rgba(13,27,62,0.15)",
               background: "rgba(0,0,0,0.05)",
               position: "relative"
           }}>
              {/* Critical Segment */}
              <div style={{ 
                  flex: s1 * 1.5, 
                  background: `linear-gradient(180deg, ${COLORS.red} 0%, #B71C1C 100%)`, 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  color: "white", fontSize: 36, fontWeight: 900,
                  borderRight: "2px solid rgba(255,255,255,0.2)"
              }}>
                <span style={{ opacity: s1 }}>{Math.round(s1 * 15)}%</span>
              </div>
              
              {/* Alert Segment */}
              <div style={{ 
                  flex: s2 * 2.5, 
                  background: `linear-gradient(180deg, ${COLORS.yellow} 0%, #F57F17 100%)`, 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  color: COLORS.navy, fontSize: 36, fontWeight: 900,
                  borderRight: "2px solid rgba(255,255,255,0.1)"
              }}>
                 <span style={{ opacity: s2 }}>{Math.round(s2 * 25)}%</span>
              </div>
              
              {/* Healthy Segment */}
              <div style={{ 
                  flex: s3 * 6, 
                  background: `linear-gradient(180deg, ${COLORS.green} 0%, #1B5E20 100%)`, 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  color: "white", fontSize: 44, fontWeight: 900 
              }}>
                 <span style={{ opacity: s3 }}>{Math.round(s3 * 60)}%</span>
              </div>

              {/* Technical Scanner Beam */}
              <div style={{ 
                  position: "absolute", 
                  top: 0, bottom: 0, 
                  width: 30, 
                  background: "linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)",
                  left: `${((frame * 1.2) % 120) - 10}%`,
                  pointerEvents: "none"
              }} />
           </div>
           
           {/* Segment Labels with Indicators */}
           <div style={{ display: "flex", justifyContent: "space-between", padding: "40px 40px 0" }}>
                {[
                    { label: "Crítico", color: COLORS.red, val: "Ação Imediata" },
                    { label: "Alerta", color: COLORS.yellow, val: "Monitoramento" },
                    { label: "Saudável", color: COLORS.green, val: "Consistente" }
                ].map((item, i) => (
                    <div key={i} style={{ 
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                        opacity: 0.9
                    }}>

                        <div style={{ width: 40, height: 8, borderRadius: 4, background: item.color }} />
                        <span style={{ fontSize: 24, fontWeight: 900, color: COLORS.navy, textTransform: "uppercase" }}>{item.label}</span>
                        <span style={{ fontSize: 18, fontWeight: 700, color: COLORS.textGray, textTransform: "uppercase", opacity: 0.6 }}>{item.val}</span>
                    </div>
                ))}
           </div>
        </div>
    );
};

const PAINEL_DATA = [
  { 
    title: "Mapeamento de Pontos Cegos", 
    desc: "Enxergue o que os dados comuns escondem.",
    color: COLORS.blue,
    type: "radar"
  },
  { 
    title: "Níveis de Proficiência", 
    desc: "Fim da 'média' ilusória. Foco no nivelamento.",
    color: COLORS.blue,
    type: "dist"
  },
  { 
    title: "Dados em Tempo Real", 
    desc: "Decisões imediatas baseadas em evidências.",
    color: COLORS.navy,
    type: "info"
  }
];

export function Slide07Painel({ index = 0 }: { index?: number }) {
  const frame = useCurrentFrame();
  const titleAnim = useActiveItem(0, 360);
  const cardAnim = useActiveItem(60, 360);
  const data = PAINEL_DATA[index];

  return (
    <SlideShell style={{ padding: "140px 80px" }}>
      <PillarBar style={{ position: "absolute", top: 120, width: "calc(100% - 160px)", height: 18, borderRadius: 9 }} />
      <SlideTitle anim={titleAnim} style={{ marginBottom: 40, marginTop: 40 }}>
        <AnimatedText text="Anatomia do" startFrame={20} /><br />
        <span style={{ color: COLORS.blue }}><AnimatedText text="Painel" startFrame={60} /></span>
      </SlideTitle>
      
      <div style={{ position: "relative", width: "100%", flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        
        <div style={{ 
          ...cardAnim.style, 
          ...GLASS_STYLE,
          width: "100%", 
          background: data.type === "info" ? COLORS.navy : "rgba(255,255,255,0.95)", 
          borderRadius: 60, 
          padding: "80px 60px", 
          boxShadow: data.type === "info" ? "0 80px 180px rgba(13,27,62,0.6)" : "0 40px 100px rgba(0,0,0,0.1)", 
          display: "flex",
          flexDirection: "column", 
          alignItems: "center",
          gap: 50,
          border: data.type === "info" ? "2px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.8)"
        }}>

           <h4 style={{ 
             fontSize: 56, 
             fontWeight: 900, 
             color: data.type === "info" ? COLORS.white : COLORS.navy, 
             margin: 0, 
             letterSpacing: -3,
             textAlign: "center",
             lineHeight: 1
           }}>
             {data.title}
           </h4>

           {data.type === "radar" && <RadarScanning />}
           {data.type === "dist" && <ProficiencyHeatmap />}

           {data.type === "info" && (
             <div style={{ padding: "60px", background: "rgba(21, 101, 192, 0.1)", borderRadius: 60, border: "2px dashed rgba(255,255,255,0.2)", width: "100%", display: "flex", flexDirection: "column", gap: 30, alignItems: "center" }}>
                <div style={{ color: COLORS.yellow, fontSize: 130, fontWeight: 900, letterSpacing: -8, textShadow: "0 0 40px rgba(249,168,37,0.3)" }}>+85%</div>
                <p style={{ fontSize: 48, fontWeight: 900, color: COLORS.white, margin: 0, textAlign: "center", lineHeight: 1.1, textTransform: "uppercase" }}>
                  Velocidade de <br /> <span style={{ color: COLORS.yellow }}>Resposta Pedagógica</span>
                </p>
             </div>
           )}

           <p style={{ 
             fontSize: 44, 
             color: data.type === "info" ? "rgba(255,255,255,0.7)" : COLORS.textGray, 
             fontWeight: 600, 
             textAlign: "center",
             margin: 0,
             lineHeight: 1.2
           }}>
             {data.desc}
           </p>
        </div>

      </div>
    </SlideShell>
  );
}




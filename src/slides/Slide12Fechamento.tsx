// src/slides/Slide12Fechamento.tsx
import React from "react";
import { Img, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { Globe, ArrowRight, Star } from "lucide-react";
import {
  COLORS,
  FONTS,
  useFadeIn,
  useActiveItem,
  LOGO_PNG,
  GLASS_STYLE,
  AnimatedText,
  SlideShell,
  SlideTitle,
  TransparentImg,
  HUD_RING_PNG
} from "../lib/utils";

/**
 * Partículas de Poeira Estelar (Final Cinematic)
 */
const FinalParticles = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: -200, pointerEvents: "none", opacity: 0.3 }}>
      {Array.from({ length: 25 }).map((_, i) => {
        const x = (i * 123) % 1000;
        const y = (i * 456) % 1000;
        const size = 2 + (i % 6);
        const drift = Math.sin((frame + i * 40) / 120) * 100;
        const speed = 0.3 + (i % 5) * 0.2;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x / 10}%`,
              top: `${y / 10}%`,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: i % 2 === 0 ? COLORS.blue : COLORS.navy,
              transform: `translateY(${-frame * speed}px) translateX(${drift}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

const CardShine = ({ delay = 100 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 80], [-100, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.42, 0, 0.58, 1),
  });

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background: `linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.4) ${progress}%, transparent ${progress + 20}%)`,
      pointerEvents: "none",
      zIndex: 10
    }} />
  );
};

export function Slide12Fechamento() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bgAlpha = useFadeIn(0, 60);

  const logoAnim = useActiveItem(20, 999);
  const titleAnim = useActiveItem(80, 999);
  const infoAnim = useActiveItem(160, 999);
  const footerAnim = useActiveItem(240, 999);

  const logoFloat = Math.sin(frame / 40) * 15;
  const logoPulse = 1 + Math.sin(frame / 80) * 0.04;

  // Título Especial (Fim)
  const titleSpring = (delay: number) => spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1.2 }
  });

  const t1 = titleSpring(90);
  const t2 = titleSpring(120);

  return (
    <SlideShell style={{ padding: "0 80px", opacity: bgAlpha, justifyContent: "center", overflow: "hidden" }}>
      <FinalParticles />

      {/* Background HUD Aura */}
      <div style={{
        position: "absolute",
        top: "40%", left: "50%",
        transform: `translate(-50%, -50%) rotate(${frame * 0.2}deg)`,
        width: 1400, height: 1400,
        opacity: 0.08,
        zIndex: 0,
        pointerEvents: "none"
      }}>
        <TransparentImg src={HUD_RING_PNG} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60, width: "100%", zIndex: 10 }}>

        {/* Floating Final Logo com Aura - Agora em tamanho 'Super-Trunfo' */}
        <div style={{
          ...logoAnim.style,
          width: 640, height: 640,
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative"
        }}>
          <div style={{
            position: "absolute", borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.blue}22 0%, transparent 70%)`,
            width: "140%", height: "140%",
            transform: `scale(${1 + Math.sin(frame / 20) * 0.1})`,
            opacity: 0.5
          }} />

          <div style={{
            width: 520, height: 520, // Inflado para máxima visibilidade
            background: COLORS.white, borderRadius: "50%", padding: 90,
            boxShadow: "0 100px 220px rgba(13,27,62,0.35), inset 0 0 0 1px rgba(13,27,62,0.05)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transform: `translateY(${logoFloat}px) scale(${logoPulse})`,
            position: "relative", zIndex: 10
          }}>
            <Img src={LOGO_PNG} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>

          {/* Animated Rings - Expandidos para acompanhar o novo ego do logo */}
          {[540, 600].map((size, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%",
              border: `1px solid ${COLORS.blue}${i === 0 ? "33" : "11"}`,
              width: size, height: size,
              transform: `scale(${1 + Math.sin((frame + i * 20) / 15) * 0.05})`,
              opacity: 0.6 - i * 0.3
            }} />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 60 }}>
          <h1 style={{
            fontFamily: FONTS.display,
            fontSize: 180, // De volta ao volume 11, igual à capa
            fontWeight: 900,
            color: COLORS.navy,
            letterSpacing: -12,
            margin: 0,
            lineHeight: 0.85,
            textTransform: "uppercase",
            textAlign: "center"
          }}>
            <span style={{
              display: "block",
              transform: `translateY(${interpolate(t1, [0, 1], [100, 0])}px) scale(${interpolate(t1, [0, 1], [0.8, 1])})`,
              opacity: t1,
            }}>
              Projeto
            </span>
            <span style={{
              display: "block",
              color: COLORS.blue,
              transform: `translateY(${interpolate(t2, [0, 1], [100, 0])}px) scale(${interpolate(t2, [0, 1], [0.8, 1])})`,
              opacity: t2,
            }}>
              Alpha
            </span>
          </h1>

          <div style={{
            ...infoAnim.style,
            textAlign: "center",
            ...GLASS_STYLE,
            borderRadius: 80,
            padding: "80px 100px",
            boxShadow: "0 100px 200px rgba(13,27,62,0.2)",
            border: "1px solid rgba(255,255,255,0.8)",
            width: "max-content",
            position: "relative",
            overflow: "hidden"
          }}>
            <CardShine delay={200} />
            <p style={{
              fontSize: 54,
              color: COLORS.textGray,
              fontWeight: 600,
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: -2
            }}>
              <AnimatedText text="Pronto para transformar o" startFrame={220} /><br />
              <span style={{ color: COLORS.navy, fontWeight: 900 }}>
                <AnimatedText text="Potencial em Performance?" startFrame={260} />
              </span>
            </p>
          </div>
        </div>
      </div>

      <div style={{
        ...footerAnim.style,
        position: "absolute", bottom: 100,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 30
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          <Globe size={40} color={COLORS.blue} />
          <p style={{ fontSize: 40, fontWeight: 900, color: COLORS.navy, letterSpacing: 10, margin: 0, textTransform: "uppercase" }}>

          </p>
          <ArrowRight size={40} color={COLORS.blue} />
        </div>
        <div style={{ width: 240, height: 8, background: `linear-gradient(to right, ${COLORS.blue}, #2979FF)`, borderRadius: 4 }} />
      </div>

      {/* Floating Star Icons for that 'success' feeling */}
      {[
        { top: "15%", left: "15%", delay: 0 },
        { top: "25%", right: "12%", delay: 50 },
        { bottom: "30%", left: "10%", delay: 100 }
      ].map((pos, i) => {
        const pop = spring({ frame: frame - (200 + pos.delay), fps, config: { stiffness: 100 } });
        return (
          <div key={i} style={{
            position: "absolute", ...pos,
            opacity: pop * 0.4,
            transform: `scale(${pop}) rotate(${frame * 0.5}deg)`
          }}>
            <Star size={60} color={COLORS.blue} fill={COLORS.blue} />
          </div>
        )
      })}
    </SlideShell>
  );
}

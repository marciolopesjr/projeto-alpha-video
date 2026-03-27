// src/lib/utils.tsx
import React from "react";
import { 
  interpolate, 
  useCurrentFrame, 
  useVideoConfig, 
  spring, 
  AbsoluteFill, 
  staticFile, 
  Easing,
  Img
} from "remotion";

export const COLORS = {
  navy: "#0D1B3E",
  blue: "#1565C0",
  red: "#C62828",
  yellow: "#F9A825",
  green: "#2E7D32",
  lightBg: "#F0F4F8",
  white: "#FFFFFF",
  textDark: "#0D1B3E",
  textGray: "#546E7A",
};

export const LOGO_PNG = staticFile("logo_bitmap_projeto_alpha.png");
export const NEURAL_BRAIN_PNG = staticFile("neural_brain.png");
export const HUD_RING_PNG     = staticFile("hud_ring.png");
export const PILAR_STRESS     = staticFile("pilar_stress.png");
export const PILAR_FOCO       = staticFile("pilar_foco.png");
export const PILAR_RESILIENCIA = staticFile("pilar_resiliencia.png");
export const PILAR_RITMO      = staticFile("pilar_ritmo.png");
export const ART_BOOK         = staticFile("art_book.png");
export const ART_BRAIN        = staticFile("art_brain.png");
export const ART_SCALE        = staticFile("art_scale.png");
export const ART_SEARCH       = staticFile("art_search.png");

export const FONTS = {
  display: "'Sora', 'Segoe UI', sans-serif",
  body: "'DM Sans', 'Segoe UI', sans-serif",
};

export const GLASS_STYLE: React.CSSProperties = {
  // backdropFilter removido — em rendering headless (Chromium swiftshader sem GPU)
  // isso era processado 100% na CPU, frame a frame. Custo brutal, ganho visual zero
  // (não existe "câmera ao vivo" por baixo — o fundo é estático de qualquer forma).
  background: "rgba(255, 255, 255, 0.88)",
  border: "1px solid rgba(255, 255, 255, 0.6)",
};

/**
 * Premium Active Item Hook
 * Inclui: Entrada com Spring (Bounce), Saída com Blur/Opacity,
 * e suporte a 60 FPS.
 */
export function useActiveItem(start: number, endProp?: number) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // Ignoramos o 360 hardcoded antigo. A saída agora é atrelada ao final do Sequence (durationInFrames)
  const end = (!endProp || endProp === 360) ? durationInFrames : endProp;

  // Entrance spring (Smooth bounce)
  const sprIn = spring({
    frame: frame - start,
    fps,
    config: { damping: 24, stiffness: 80, mass: 1 },
  });

  // Outro interpolation (Smooth fade + blur)
  const exitFrames = 15;
  const outroProgress = interpolate(
    frame,
    [end - exitFrames, end],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Motion blur fake REMOVIDO — filter:blur() em rendering headless (swiftshader) é
  // processado na CPU, frame por frame. translateY + scale já dão o efeito de entrada.
  const opacity = interpolate(sprIn, [0, 0.3, 1], [0, 1, 1]) * (1 - outroProgress);
  const scale = interpolate(sprIn, [0, 1], [0.85, 1], { extrapolateRight: "clamp" }) + (outroProgress * 0.08);
  const translateY = interpolate(sprIn, [0, 1], [100, 0], { extrapolateRight: "clamp" }) - (outroProgress * 40);

  return {
    style: {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
    } as React.CSSProperties
  };
}

export function useFadeIn(startFrame = 0, duration = 30) {
  const frame = useCurrentFrame();
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

/**
 * Modern Counter for numbers
 */
export function NumberTicker({ value, startFrame = 0, duration = 60 }: { value: number, startFrame?: number, duration?: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const spr = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 20, stiffness: 80 }
  });

  const displayValue = Math.round(interpolate(spr, [0, 1], [0, value]));
  
  return <>{displayValue}</>;
}

/**
 * High-End Background Removal Component
 * Uses Canvas to turn white pixels into transparent pixels for a professional look.
 */
export function TransparentImg({ 
  src, 
  threshold = 240, 
  style 
}: { 
  src: string; 
  threshold?: number; 
  style?: React.CSSProperties 
}) {
  // ATENÇÃO: Processamento de Canvas on-the-fly para remover fundo removido.
  // Isso gerava alocações massivas de strings Base64 na memória heap do Chrome,
  // derrubando o FPS do preview conforme o vídeo avançava.
  // DICA: Use PNGs exportados com Canal Alpha (transparência real) no Photoshop/Canva.
  return <Img src={src} style={style} />;
}

export function AbstractBackground() {
  // Orbs animados com filter:blur(180px) REMOVIDOS.
  // Eram 4 divs de 1600×1600px sendo blur-ados a cada frame na CPU (swiftshader).
  // Substituídos por gradientes radiais estáticos — efeito visual >95% idêntico,
  // custo de renderização: zero. O grid perspectiva também foi estatizado.
  return (
    <AbsoluteFill style={{
      background: `
        radial-gradient(ellipse 90% 70% at 5% 0%, ${COLORS.blue}14 0%, transparent 65%),
        radial-gradient(ellipse 70% 60% at 95% 35%, ${COLORS.yellow}10 0%, transparent 65%),
        radial-gradient(ellipse 80% 55% at 10% 90%, ${COLORS.red}09 0%, transparent 65%),
        radial-gradient(ellipse 60% 70% at 88% 95%, ${COLORS.green}09 0%, transparent 65%),
        ${COLORS.lightBg}
      `,
      overflow: "hidden"
    }}>
      {/* Seamless Perspective Grid — estático para não gerar frame-dependency */}
      <div style={{ 
        position: "absolute", 
        top: 0, left: 0, right: 0, bottom: 0, 
        backgroundImage: `linear-gradient(rgba(13, 27, 62, 0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(13, 27, 62, 0.05) 2px, transparent 2px)`, 
        backgroundSize: "80px 80px", 
        transform: `perspective(1000px) rotateX(72deg) translateY(0px) scale(4)`,
        transformOrigin: "center top",
        opacity: 0.8
      }} />
    </AbsoluteFill>
  );
}

export function PillarBar({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: "flex", height: 16, width: "100%", borderRadius: 8, overflow: "hidden", ...style }}>
      <div style={{ flex: 1, background: COLORS.blue }} />
      <div style={{ flex: 1, background: COLORS.red }} />
      <div style={{ flex: 1, background: COLORS.yellow }} />
      <div style={{ flex: 1, background: COLORS.green }} />
    </div>
  );
}

export function SlideShell({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      width: "100%", height: "100%",
      position: "relative",
      backgroundColor: COLORS.lightBg,
      overflow: "hidden"
    }}>
      <AbstractBackground />
      <div style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        padding: "200px 80px 180px",
        boxSizing: "border-box",
        fontFamily: FONTS.body,
        alignItems: "center", justifyContent: "flex-start",
        textAlign: "center",
        ...style,
      }}>
        {children}
      </div>
    </div>
  );
}

export function AnimatedText({ text, startFrame = 0 }: { text: string, startFrame?: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  
  return (
    <span style={{ display: "inline-block" }}>
      {words.map((word, i) => {
        const delay = startFrame + (i * 12); // Higher stagger for fluid motion
        const spr = spring({
          frame: frame - delay,
          fps,
          config: { damping: 30, stiffness: 60, mass: 1.2 },
        });
        
        const translateY = interpolate(spr, [0, 1], [120, 0]);
        const opacity = interpolate(spr, [0, 0.5, 1], [0, 1, 1]);
        const scale = interpolate(spr, [0, 1], [0.85, 1]);
        // filter:blur() removido — cada palavra era um layer de compositor separado.
        // translateY + scale + opacity já dão o efeito cinético premium que queremos.
        
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity,
              marginRight: "0.3em"
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}

export function SlideTitle({ anim, children, style }: { anim: { style: React.CSSProperties }; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ ...anim.style, marginBottom: 80, ...style, width: "100%" }}>
      <h1 style={{ 
        fontFamily: FONTS.display, 
        fontSize: 100, 
        fontWeight: 900, 
        color: COLORS.navy, 
        margin: 0, 
        lineHeight: 1,
        letterSpacing: -4
      }}>
        {typeof children === "string" ? <AnimatedText text={children} /> : children}
      </h1>
    </div>
  );
}

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
  background: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255, 255, 255, 0.4)",
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

  // Simulated Motion Blur: High at start of movement, fast at end
  const entranceBlur = interpolate(sprIn, [0, 0.2, 1], [30, 10, 0], { extrapolateRight: "clamp" });
  const totalBlur = Math.max(entranceBlur, outroProgress * 20);

  const opacity = interpolate(sprIn, [0, 0.3, 1], [0, 1, 1]) * (1 - outroProgress);
  const scale = interpolate(sprIn, [0, 1], [0.85, 1], { extrapolateRight: "clamp" }) + (outroProgress * 0.08);
  const translateY = interpolate(sprIn, [0, 1], [100, 0], { extrapolateRight: "clamp" }) - (outroProgress * 40);

  return {
    style: {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      filter: totalBlur > 0.5 ? `blur(${totalBlur}px)` : undefined,
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
  const [processedSrc, setProcessedSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        // If the pixel is close to white, make it transparent
        if (r > threshold && g > threshold && b > threshold) {
          data[i+3] = 0; 
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };
  }, [src, threshold]);

  if (!processedSrc) return null;

  return <Img src={processedSrc} style={style} />;
}

export function AbstractBackground() {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.lightBg, overflow: "hidden" }}>
      {/* Seamless Perspective Grid */}
      <div style={{ 
        position: "absolute", 
        top: 0, left: 0, right: 0, bottom: 0, 
        backgroundImage: `linear-gradient(rgba(13, 27, 62, 0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(13, 27, 62, 0.05) 2px, transparent 2px)`, 
        backgroundSize: "80px 80px", 
        transform: `perspective(1000px) rotateX(72deg) translateY(${(frame * 2.5) % 80}px) scale(4)`,
        transformOrigin: "center top",
        opacity: 0.8
      }} />
      
      {/* Cinematic Glow Orbs */}
      {[
        { color: COLORS.blue, delay: 0, x: -200, y: -200 },
        { color: COLORS.yellow, delay: 100, x: 1200, y: 400 },
        { color: COLORS.red, delay: 200, x: -300, y: 1500 },
        { color: COLORS.green, delay: 300, x: 1000, y: 2200 }
      ].map((orb, i) => {
        const moveX = Math.sin((frame + orb.delay) / 100) * 120;
        const moveY = Math.cos((frame + orb.delay) / 120) * 180;
        
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 1600,
              height: 1600,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color}18 0%, transparent 75%)`,
              left: orb.x + moveX,
              top: orb.y + moveY,
              filter: "blur(180px)",
            }}
          />
        );
      })}
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
      display: "flex", flexDirection: "column",
      padding: "200px 80px 180px",
      boxSizing: "border-box",
      fontFamily: FONTS.body,
      alignItems: "center", justifyContent: "flex-start",
      textAlign: "center",
      position: "relative",
      ...style,
    }}>
      {children}
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
        const blur = interpolate(spr, [0, 1], [30, 0]);
        
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              transform: `translateY(${translateY}px) scale(${scale})`,
              opacity,
              filter: blur > 0.5 ? `blur(${blur}px)` : undefined,
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

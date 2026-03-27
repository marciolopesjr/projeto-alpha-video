// src/slides/Slide09ROI.tsx
import React from "react";
import { TrendingUp, CheckCircle, Target, Zap, Waves } from "lucide-react";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  AbsoluteFill,
  Easing
} from "remotion";
import {
  COLORS,
  useActiveItem,
  GLASS_STYLE,
  SlideShell,
  SlideTitle,
  AnimatedText,
} from "../lib/utils";

/**
 * Efeito de Partículas em Parallax (Motion Design Profissional)
 */
const FloatingParticles = ({ count = 12, color = COLORS.blue }: { count?: number, color?: string }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: -100, pointerEvents: "none", opacity: 0.4 }}>
      {Array.from({ length: count }).map((_, i) => {
        const x = (i * 373) % 1000;
        const y = (i * 927) % 1000;
        const speed = 0.5 + (i % 3) * 0.4;
        const drift = Math.sin((frame + i * 50) / 100) * 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x / 10}%`,
              top: `${y / 10}%`,
              width: 4 + (i % 4),
              height: 4 + (i % 4),
              borderRadius: "50%",
              backgroundColor: color,
              transform: `translateY(${-frame * speed}px) translateX(${drift}px)`,
              filter: `blur(${1 + (i % 3)}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

/**
 * Efeito de Shine (Brilho que varre o elemento)
 */
const CardShine = ({ delay = 100 }: { delay?: number }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 60], [-100, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.42, 0, 0.58, 1),
  });

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      background: `linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.4) ${progress}%, transparent ${progress + 15}%)`,
      pointerEvents: "none",
      zIndex: 10
    }} />
  );
};

// Helper para calcular ponto na curva Bézier Quadrática (p0, p1, p2) no tempo t [0,1]
const getQuadPoint = (t: number, p0: { x: number, y: number }, p1: { x: number, y: number }, p2: { x: number, y: number }) => {
  const x = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
  const y = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;
  return { x, y };
};

const AnimatedChart = ({ startFrame = 60 }: { startFrame?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 45, mass: 1 },
  });

  // Curva de ROI (Bézier Quadrática)
  const p0 = { x: 50, y: 400 };
  const p1 = { x: 450, y: 380 };
  const p2 = { x: 800, y: 80 };

  // Gerando os pontos para o path de preenchimento (area)
  const path = `M ${p0.x} ${p0.y} Q ${p1.x} ${p1.y} ${p2.x} ${p2.y}`;
  const fillPath = `${path} L ${p2.x} 450 L ${p0.x} 450 Z`;

  // Comprimento aproximado para dash-offset
  const length = 1000;
  const currentPos = getQuadPoint(spr, p0, p1, p2);

  // Efeito de pulso quando o gráfico atinge marcos (70% e 100%)
  const pulse70 = spring({ frame: frame - (startFrame + 40), fps, config: { stiffness: 200 } });
  const pulse100 = spring({ frame: frame - (startFrame + 60), fps, config: { stiffness: 200 } });

  return (
    <div style={{ width: "100%", height: 480, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="850" height="450" viewBox="0 0 850 450" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.blue} stopOpacity="0.4" />
            <stop offset="100%" stopColor={COLORS.blue} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={COLORS.blue} stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2979FF" />
          </linearGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Preenchimento de Área Animado */}
        <path d={fillPath} fill="url(#areaGradient)" style={{ opacity: spr * 0.6 }} />

        {/* Linha Principal */}
        <path
          d={path}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={length}
          strokeDashoffset={interpolate(spr, [0, 1], [length, 0])}
          filter="url(#neonGlow)"
        />

        {/* Marcadores de Dados (Data Points) */}
        {[0.4, 0.7, 1.0].map((t, i) => {
          const pt = getQuadPoint(t, p0, p1, p2);
          const show = spr >= t;
          const pop = spring({ frame: frame - (startFrame + t * 60), fps, config: { damping: 10 } });
          return (
            <g key={i} style={{ opacity: show ? 1 : 0, transform: `scale(${pop})`, transformOrigin: `${pt.x}px ${pt.y}px` }}>
              <circle cx={pt.x} cy={pt.y} r="14" fill={COLORS.white} stroke={COLORS.blue} strokeWidth="4" />
              {i === 2 && <circle cx={pt.x} cy={pt.y} r="30" fill={COLORS.blue} opacity={0.2 * (1 - pulse100)} style={{ transform: `scale(${1 + pulse100 * 2})` }} />}
            </g>
          );
        })}

        {/* Cursor de Linha Seguindo o Path */}
        <g style={{ transform: `translate(${currentPos.x}px, ${currentPos.y}px)` }}>
          <circle r="10" fill={COLORS.blue} />
          <circle r="20" fill={COLORS.blue} opacity={0.3} style={{ transform: `scale(${1 + Math.sin(frame / 5) * 0.2})` }} />
        </g>
      </svg>

      {/* Iconografia flutuante de Performance */}
      <div style={{ position: "absolute", top: 0, right: 30, opacity: spr }}>
        <Zap size={80} color={COLORS.blue} style={{ filter: "drop-shadow(0 0 20px rgba(41,121,255,0.5))" }} />
      </div>
    </div>
  );
};

export function Slide09ROI({ index = 0 }: { index?: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleAnim = useActiveItem(0, 360);
  const cardAnim = useActiveItem(35, 360);

  // Filtro de Motion Blur fake para entrada agressiva
  const entranceBlur = interpolate(frame, [35, 55], [40, 0], { extrapolateRight: "clamp" });

  return (
    <SlideShell style={{ padding: "140px 80px", justifyContent: "center", overflow: "hidden" }}>
      <FloatingParticles count={20} color={index === 0 ? COLORS.blue : COLORS.yellow} />

      {/* HUD de Progresso Cinematic */}
      <div style={{ position: "absolute", top: 60, right: 80, display: "flex", alignItems: "center", gap: 20, opacity: 0.6 }}>
        <div style={{ width: 150, height: 4, background: "rgba(13,27,62,0.1)", borderRadius: 2 }}>
          <div style={{ width: `${index === 0 ? 50 : 100}%`, height: "100%", background: COLORS.navy, transition: "width 1s ease-out" }} />
        </div>
        <span style={{ fontWeight: 900, color: COLORS.navy, fontSize: 24 }}>09 / 12</span>
      </div>

      <SlideTitle anim={titleAnim} style={{ marginBottom: 60 }}>
        <div style={{ position: "relative" }}>
          <AnimatedText text="ROI" startFrame={10} />
          <div style={{
            marginTop: -15,
            color: COLORS.blue,
            // Sincronizando o fade-out com a subida final do slide (outroProgress do useActiveItem)
            // useActiveItem já faz o transform, aqui reforçamos a estética
          }}>
            <AnimatedText text="Pedagógico" startFrame={35} />
          </div>
        </div>
      </SlideTitle>


      <div style={{ position: "relative", width: "100%", maxWidth: 1000, flex: 1, display: "flex", justifyContent: "center" }}>

        {index === 0 && (
          <div style={{
            ...cardAnim.style,
            width: "100%",
            ...GLASS_STYLE,
            borderRadius: 100,
            padding: "80px 60px",
            boxShadow: "0 100px 250px rgba(13,27,62,0.15), inset 0 0 0 2px rgba(255,255,255,0.4)",
            display: "flex",
            flexDirection: "column",
            gap: 40,
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,244,248,0.7) 100%)"
          }}>
            <CardShine delay={60} />
            <AnimatedChart startFrame={65} />
            <div style={{
              marginTop: 40,
              // Estático na entrada, mas some no final quando o slide inteiro sobe
              opacity: interpolate(frame, [330, 360], [1, 0], { extrapolateLeft: "clamp" }),
            }}>
              <h2 style={{
                fontSize: 80,
                fontWeight: 900,
                color: COLORS.navy,
                letterSpacing: -5,
                margin: 0,
                textAlign: "center",
                lineHeight: 0.9,
                textTransform: "uppercase"
              }}>
                Eficácia <br />
                <span style={{
                  color: COLORS.blue,
                  fontSize: 110,
                  background: `linear-gradient(to right, ${COLORS.blue}, #2979FF)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>Garantida</span>
              </h2>
            </div>

          </div>
        )}

        {index === 1 && (
          <div style={{
            ...cardAnim.style,
            width: "100%",
            background: COLORS.navy,
            borderRadius: 100,
            padding: "100px",
            boxShadow: "0 120px 300px rgba(13,27,62,0.8)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            flexDirection: "column",
            gap: 60,
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden"
          }}>
            <CardShine delay={60} />

            {/* Ondas HUD de Background */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: 0.1, pointerEvents: "none" }}>
              <Waves size={1200} color={COLORS.white} />
            </div>

            <div style={{
              transform: `scale(${spring({ frame: frame - 60, fps, config: { damping: 10, mass: 2 } })}) rotate(${interpolate(frame, [60, 120], [10, 0])}deg)`,
              filter: "drop-shadow(0 0 50px rgba(249,168,37,0.6))"
            }}>
              <CheckCircle size={220} color={COLORS.yellow} strokeWidth={2.5} />
            </div>

            <div style={{ textAlign: "center", zIndex: 2 }}>
              <p style={{
                fontSize: 72,
                fontWeight: 900,
                color: COLORS.white,
                margin: 0,
                lineHeight: 1.0,
                letterSpacing: -3
              }}>
                Acompanhe o <br />
                <span style={{
                  color: COLORS.yellow,
                  fontSize: 100,
                  display: "block",
                  marginTop: 15,
                  textShadow: "0 20px 40px rgba(249,168,37,0.3)"
                }}>impacto real</span>
                <span style={{
                  fontSize: 56,
                  opacity: 0.6,
                  fontWeight: 300,
                  display: "block",
                  marginTop: 30,
                  letterSpacing: 2,
                  textTransform: "uppercase"
                }}>de cada projeto.</span>
              </p>
            </div>

            {/* Decorativo flutuante */}
            <div style={{ position: "absolute", bottom: -50, right: -50, opacity: 0.1 }}>
              <Target size={300} color={COLORS.white} />
            </div>
          </div>
        )}

      </div>
    </SlideShell>
  );
}


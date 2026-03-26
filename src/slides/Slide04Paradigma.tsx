// src/slides/Slide04Paradigma.tsx
import React from "react";
import { useCurrentFrame, spring, interpolate, useVideoConfig } from "remotion";
import { TrendingUp, SearchX, Cpu } from "lucide-react";
import { COLORS, useActiveItem, FONTS, PillarBar } from "../lib/utils";

export function Slide04Paradigma({ index = 0 }: { index?: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const masterOp = useActiveItem(0);

  const hit = (delay: number, stiff = 200, damp = 16) =>
    spring({ frame: frame - delay, fps, config: { damping: damp, stiffness: stiff } });

  const getSlideContent = () => {
    switch (index) {

      // ── CENA 0: ENGAJAMENTO & CONVIVÊNCIA ──
      case 0: {
        const t1 = hit(10);
        const t2 = hit(35);
        const line = hit(60, 140, 20);

        return (
          <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "160px 80px", boxSizing: "border-box", gap: 40 }}>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color: COLORS.textGray, letterSpacing: 8 }}>
              O IMPACTO SOCIOEMOCIONAL
            </p>

            <div style={{ opacity: t1, transform: `translateX(${interpolate(t1, [0, 1], [-100, 0])}px)` }}>
              <h1 style={{ margin: 0, fontSize: 130, fontFamily: FONTS.display, fontWeight: 900, color: COLORS.navy, letterSpacing: -5, lineHeight: 0.85 }}>
                ENGAJA-<br />MENTO
              </h1>
            </div>

            <div style={{ width: interpolate(line, [0, 1], [0, 800]), height: 6, background: COLORS.navy, borderRadius: 3 }} />

            <div style={{ opacity: t2, transform: `translateX(${interpolate(t2, [0, 1], [100, 0])}px)` }}>
              <h1 style={{ margin: 0, fontSize: 130, fontFamily: FONTS.display, fontWeight: 900, color: COLORS.navy, letterSpacing: -5, lineHeight: 0.85, textAlign: "right" }}>
                CONVI-<br />VÊNCIA
              </h1>
            </div>
          </div>
        );
      }

      // ── CENA 1: IDEB ──
      case 1: {
        const tIcon = hit(10, 180, 12);
        const tText = hit(40);

        return (
          <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "160px 80px", boxSizing: "border-box" }}>
            <div style={{ transform: `scale(${interpolate(tIcon, [0, 1], [0.3, 1])}) translateY(${interpolate(tIcon, [0, 1], [200, 0])}px)`, opacity: tIcon, color: COLORS.navy }}>
              <TrendingUp size={280} strokeWidth={1.5} />
            </div>

            <div style={{ opacity: tText, transform: `translateY(${interpolate(tText, [0, 1], [60, 0])}px)`, textAlign: "center" }}>
              <p style={{ margin: "40px 0 0", fontSize: 36, fontWeight: 700, color: COLORS.textGray, letterSpacing: 8 }}>INDICADOR NACIONAL</p>
              <h1 style={{ margin: "8px 0 0", fontSize: 240, fontFamily: FONTS.display, fontWeight: 900, color: COLORS.navy, letterSpacing: -12, lineHeight: 0.85 }}>
                IDEB
              </h1>
            </div>
          </div>
        );
      }

      // ── CENA 2: A LACUNA (fundo escuro, APENAS BRANCO — sem cores misturadas) ──
      case 2: {
        const t = hit(15, 160, 18);
        const pulse = 1 + Math.sin(frame / 20) * 0.04;

        return (
          <div style={{ width: "100%", height: "100%", background: COLORS.navy, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "160px 80px", boxSizing: "border-box", gap: 50 }}>
            <div style={{ transform: `scale(${pulse})`, opacity: t, color: "#FFFFFF" }}>
              <SearchX size={160} strokeWidth={1.5} />
            </div>

            <h1 style={{
              opacity: t,
              transform: `translateY(${interpolate(t, [0, 1], [80, 0])}px)`,
              fontSize: 110, fontFamily: FONTS.display, fontWeight: 900,
              color: "#FFFFFF", textTransform: "uppercase",
              margin: 0, textAlign: "center", letterSpacing: -4, lineHeight: 0.9
            }}>
              SEM DADOS<br />SEM DIREÇÃO
            </h1>

            <p style={{
              opacity: t,
              transform: `translateY(${interpolate(t, [0, 1], [60, 0])}px)`,
              fontSize: 38, fontFamily: FONTS.body, fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              margin: 0, textAlign: "center", maxWidth: 700, lineHeight: 1.4
            }}>
              Escolas sem ferramentas para medir o que realmente importa.
            </p>
          </div>
        );
      }

      // ── CENA 3: A SOLUÇÃO ──
      case 3: {
        const wipe = hit(5, 300, 24);
        const wipeY = interpolate(wipe, [0, 1], [1920, 0]);

        const t = hit(40);
        const ic = hit(50, 180, 14);

        return (
          <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
            {/* Wipe de baixo pra cima apaga o dark da cena anterior */}
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "100%", background: "#FFFFFF", transform: `translateY(${wipeY}px)` }} />

            <div style={{ position: "absolute", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "160px 80px", boxSizing: "border-box", gap: 30 }}>

              <div style={{ opacity: ic, transform: `scale(${interpolate(ic, [0, 1], [0.5, 1])})`, color: COLORS.navy }}>
                <Cpu size={180} strokeWidth={1} />
              </div>

              <h1 style={{
                opacity: t,
                transform: `translateY(${interpolate(t, [0, 1], [80, 0])}px)`,
                fontSize: 120, fontFamily: FONTS.display, fontWeight: 900,
                color: COLORS.navy, textTransform: "uppercase",
                margin: 0, textAlign: "center", letterSpacing: -4, lineHeight: 0.85
              }}>
                SOLUÇÃO<br /><span style={{ fontSize: 160 }}>DEFINITIVA</span>
              </h1>

              <div style={{
                opacity: t, width: "100%", height: 6,
                background: COLORS.navy, borderRadius: 3
              }} />

              <p style={{
                opacity: t,
                fontSize: 42, fontFamily: FONTS.body, fontWeight: 500,
                color: COLORS.textGray, margin: 0, textAlign: "center", lineHeight: 1.4
              }}>
                Projeto Alpha converte habilidades humanas<br />em dados estruturados e acionáveis.
              </p>

            </div>
          </div>
        );
      }

      default: return null;
    }
  };

  return (
    <div style={{ ...masterOp.style, width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      {index !== 2 && (
        <PillarBar style={{ position: "absolute", top: 120, left: 80, width: "calc(100% - 160px)", height: 18, borderRadius: 9, zIndex: 100 }} />
      )}
      {getSlideContent()}
    </div>
  );
}

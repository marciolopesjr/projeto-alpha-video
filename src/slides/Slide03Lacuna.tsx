// src/slides/Slide03Lacuna.tsx
import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { useActiveItem, FONTS, COLORS } from "../lib/utils";

export function Slide03Lacuna() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const masterOp = useActiveItem(0);

  const s = (delay: number, stiff = 200, damp = 16) =>
    spring({ frame: frame - delay, fps, config: { damping: damp, stiffness: stiff } });

  // ── CONTINUOUS MOVEMENT DYNAMICS ──
  // Uma escala bem sutil mas constante para a câmera nunca parar de rodar
  const dollyScale = (startFrame: number, speed = 0.0005) => 
    1 + Math.max(0, frame - startFrame) * speed;

  // ── CENA A (0 → 120): "O APRENDIZADO / VAI MUITO ALÉM"
  const cAOp = interpolate(frame, [0, 8, 105, 120], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const line1T = s(5, 300, 20);
  const line1Y = interpolate(line1T, [0, 1], [-200, 0]);
  const line2T = s(30, 280, 18);
  const line2Y = interpolate(line2T, [0, 1], [200, 0]);

  // ── CENA B (120 → 250): "SÃO OS → FATORES / SOCIO-EMOCIONAIS"
  const cBOp = interpolate(frame, [120, 132, 235, 250], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const cBT = s(125, 260, 18);
  const cBScale = interpolate(cBT, [0, 1], [0.7, 1]);
  const cBBlur = interpolate(cBT, [0, 1], [40, 0]);

  // ── CENA C (250 → 400): "FOCO"
  const cCOp = interpolate(frame, [250, 262, 385, 400], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const cCT = s(252, 300, 14);
  const cCScale = interpolate(cCT, [0, 1], [4, 1]);

  // ── CENA D (400 → 560): "AUTOREGULAÇÃO"
  const cDOp = interpolate(frame, [400, 412, 545, 560], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const cDT = s(402, 300, 14);
  const cDScale = interpolate(cDT, [0, 1], [4, 1]);

  // ── CENA E (560 → ∞): Prova - OCDE (Quase 8 segs)
  const cEOp = interpolate(frame, [560, 575], [0, 1], { extrapolateRight: "clamp" });
  
  // Timing desdobrado para segurar o tempo
  const lineT = s(570, 150, 24);
  const ocdeNameT = s(610, 200, 16);
  const predT = s(660, 180, 18);
  const barT = s(750, 150, 20);
  
  // Leitura e Matemática cravam aos poucos e crescem MUITO
  const leituT = s(800, 120, 22);
  const matT = s(850, 120, 22);

  return (
    <div style={{
      ...masterOp.style,
      width: "100%", height: "100%",
      background: "#FFFFFF",
      overflow: "hidden", position: "relative",
    }}>

      {/* ── CENA A: O APRENDIZADO VAI MUITO ALÉM (frames 0-130) ── */}
      {frame < 130 && (
        <div style={{
          position: "absolute", inset: 0, opacity: cAOp,
          transform: `scale(${dollyScale(0, 0.001)})`,
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "flex-start",
          padding: "0 80px"
        }}>
          <h2 style={{
            transform: `translateY(${line1Y}px)`,
            fontSize: 60, fontFamily: FONTS.display, fontWeight: 700,
            color: COLORS.textGray, textTransform: "uppercase",
            margin: 0, letterSpacing: 6, lineHeight: 1
          }}>
            O aprendizado
          </h2>
          <h1 style={{
            transform: `translateY(${line2Y}px)`,
            fontSize: 180, fontFamily: FONTS.display, fontWeight: 900,
            color: COLORS.navy, textTransform: "uppercase",
            margin: 0, letterSpacing: -8, lineHeight: 0.85
          }}>
            VAI<br />MUITO<br />ALÉM
          </h1>
          <div style={{ width: 100, height: 8, background: COLORS.blue, borderRadius: 4, marginTop: 40 }} />
        </div>
      )}

      {/* ── CENA B: FATORES SOCIOEMOCIONAIS (frames 110-260) ── */}
      {frame >= 110 && frame < 260 && (
        <div style={{
          position: "absolute", inset: 0, opacity: cBOp,
          // filter:blur() de entrada REMOVIDO — custo na CPU, efeito dispensável em H.264
          transform: `scale(${cBScale * dollyScale(120, 0.001)})`,
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "flex-start",
          padding: "0 80px"
        }}>
          <p style={{ margin: 0, fontSize: 50, fontFamily: FONTS.body, fontWeight: 600, color: COLORS.textGray, letterSpacing: 8 }}>
            São os
          </p>
          <h1 style={{
            margin: 0, fontSize: 145, fontFamily: FONTS.display, fontWeight: 900,
            color: COLORS.navy, textTransform: "uppercase",
            letterSpacing: -5, lineHeight: 0.85
          }}>
            FATORES<br />SOCIO-<br />EMOCIONAIS
          </h1>
        </div>
      )}

      {/* ── CENA C: FOCO (frames 240-410) ── */}
      {frame >= 240 && frame < 410 && (
        <div style={{
          position: "absolute", inset: 0, opacity: cCOp,
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          background: COLORS.navy,
          transform: `scale(${dollyScale(250, 0.002)})`
        }}>
          <h1 style={{
            transform: `scale(${cCScale})`,
            fontSize: 240, fontFamily: FONTS.display, fontWeight: 900,
            color: "#FFFFFF", textTransform: "uppercase",
            margin: 0, letterSpacing: -10, lineHeight: 0.85
          }}>
            FOCO
          </h1>
          <p style={{ margin: "40px 0 0", fontSize: 36, color: "rgba(255,255,255,0.4)", fontFamily: FONTS.body, letterSpacing: 8 }}>HABILIDADE PREDITORA #1</p>
        </div>
      )}

      {/* ── CENA D: AUTORREGULAÇÃO (frames 390-570) ── */}
      {frame >= 390 && frame < 570 && (
        <div style={{
          position: "absolute", inset: 0, opacity: cDOp,
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "center",
          background: COLORS.navy,
          transform: `scale(${dollyScale(400, 0.002)})`
        }}>
          <h1 style={{
            transform: `scale(${cDScale})`,
            fontSize: 110, fontFamily: FONTS.display, fontWeight: 900,
            color: "#FFFFFF", textTransform: "uppercase",
            margin: 0, letterSpacing: -3, lineHeight: 0.85, textAlign: "center"
          }}>
            AUTO-<br />REGULAÇÃO
          </h1>
          <p style={{ margin: "40px 0 0", fontSize: 36, color: "rgba(255,255,255,0.4)", fontFamily: FONTS.body, letterSpacing: 8 }}>HABILIDADE PREDITORA #2</p>
        </div>
      )}

      {/* ── CENA E: PROVA OCDE (frames 550+) ── */}
      {frame >= 550 && (
        <div style={{
          position: "absolute", inset: 0, opacity: cEOp,
          display: "flex", flexDirection: "column",
          justifyContent: "center", boxSizing: "border-box", padding: "0 80px",
          transform: `scale(${dollyScale(560, 0.0004)})`
        }}>
          
          {/* Background Gigante Rastejante */}
          <h1 style={{
            position: "absolute", top: "50%", left: "50%",
            transform: `translate(-50%, -50%) translateX(${(560 - frame)}px)`,
            fontSize: 600, fontFamily: FONTS.display, fontWeight: 900,
            color: COLORS.textGray, opacity: 0.03, margin: 0, whiteSpace: "nowrap"
          }}>
            ESTUDOS DA OCDE
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 20, transform: `translateY(${interpolate(lineT, [0, 1], [-60, 0])})`, opacity: lineT }}>
            <div style={{ width: 6, height: 70, background: COLORS.navy, borderRadius: 3 }} />
            <div>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: COLORS.textGray, letterSpacing: 8 }}>COMPROVADO EM</p>
              <p style={{ margin: 0, fontSize: 56, fontWeight: 900, color: COLORS.navy, letterSpacing: -1, opacity: Math.min(ocdeNameT * 2, 1) }}>ESTUDOS DA OCDE</p>
            </div>
          </div>

          <div style={{ width: interpolate(barT, [0, 1], [0, 100]) + "%", height: 2, background: "#E5E7EB", margin: "60px 0", opacity: barT }} />

          {/* Preditores Reais desliza de lado */}
          <div style={{ opacity: predT, transform: `translateX(${interpolate(predT, [0, 1], [-100, 0])}px)` }}>
            <p style={{ margin: 0, fontSize: 50, fontFamily: FONTS.body, fontWeight: 500, color: COLORS.textGray, lineHeight: 1.2 }}>
              Performance superior diretamente<br/>ligada de forma matemática a:
            </p>
          </div>

          {/* Leitura e Matemática entram gigantes e pesadas com muito contraste */}
          <h2 style={{ margin: "50px 0 0", fontSize: 130, fontFamily: FONTS.display, fontWeight: 900, color: COLORS.navy, letterSpacing: -5, lineHeight: 0.85, opacity: leituT, transform: `translateY(${interpolate(leituT, [0, 1], [100, 0])}px)` }}>
            LEITURA
          </h2>
          <h2 style={{ margin: "20px 0 0", fontSize: 130, fontFamily: FONTS.display, fontWeight: 900, color: COLORS.blue, letterSpacing: -5, lineHeight: 0.85, opacity: matT, transform: `translateY(${interpolate(matT, [0, 1], [100, 0])}px)` }}>
            &amp; MATEMÁTICA
          </h2>

        </div>
      )}

    </div>
  );
}

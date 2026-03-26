import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, springTiming, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";

import { Slide01Capa } from "./slides/Slide01Capa";
import { Slide02Impacto } from "./slides/Slide02Impacto";
import { Slide03Lacuna } from "./slides/Slide03Lacuna";
import { Slide04Paradigma } from "./slides/Slide04Paradigma";
import { Slide05Pilares } from "./slides/Slide05Pilares";
import { Slide06Motor } from "./slides/Slide06Motor";
import { Slide07Painel } from "./slides/Slide07Painel";
import { Slide08IACS } from "./slides/Slide08IACS";
import { Slide09ROI } from "./slides/Slide09ROI";
import { Slide10Ciclo } from "./slides/Slide10Ciclo";
import { Slide11Sistemico } from "./slides/Slide11Sistemico";
import { Slide12Fechamento } from "./slides/Slide12Fechamento";
import { AbstractBackground } from "./lib/utils";

// Premium Cinematic Transition configurations
const springT = springTiming({ 
  config: { damping: 200, stiffness: 400, mass: 1 }, 
  durationInFrames: 60 
});
const fadeT = linearTiming({ durationInFrames: 30 });

// Presentations
const slideL = slide({ direction: "from-left" });
const slideR = slide({ direction: "from-right" });
const slideT = slide({ direction: "from-top" });
const slideB = slide({ direction: "from-bottom" });
const fadeEff = fade();
const wipeEff = wipe({ direction: "from-right" });
const flipEff = flip();
const clockEff = clockWipe({ width: 1080, height: 1920 });

export function ProjetoAlphaVideo() {
  return (
    <AbsoluteFill>
      <AbstractBackground />
      {/* Audio Narrador */}
      <Audio src={staticFile("ElevenLabs_2026-03-25T18_45_53_Fernando Borges _pvc_sp100_s50_sb75_se0_b_m2.mp3")} />
      
      <TransitionSeries>
        {/* 01. Capa */}
        <TransitionSeries.Sequence durationInFrames={475}>
          <Slide01Capa />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition presentation={slideR} timing={springT} />

        {/* 02. Impacto */}
        <TransitionSeries.Sequence durationInFrames={294}>
          <Slide02Impacto />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={clockEff} timing={springT} />

        {/* 03. Lacuna */}
        <TransitionSeries.Sequence durationInFrames={1087}>
          <Slide03Lacuna />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={flipEff} timing={springT} />

        {/* 04. PARADIGMAS */}
        <TransitionSeries.Sequence durationInFrames={412}>
          <Slide04Paradigma index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slideR} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={392}>
          <Slide04Paradigma index={1} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slideL} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={517}>
          <Slide04Paradigma index={2} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slideR} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={443}>
          <Slide04Paradigma index={3} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={wipeEff} timing={springT} />

        {/* 05. PILARES */}
        <TransitionSeries.Sequence durationInFrames={453}>
          <Slide05Pilares index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fadeEff} timing={fadeT} />
        <TransitionSeries.Sequence durationInFrames={462}>
          <Slide05Pilares index={1} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fadeEff} timing={fadeT} />
        <TransitionSeries.Sequence durationInFrames={397}>
          <Slide05Pilares index={2} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fadeEff} timing={fadeT} />
        <TransitionSeries.Sequence durationInFrames={444}>
          <Slide05Pilares index={3} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={clockEff} timing={springT} />

        {/* 06. MOTOR */}
        <TransitionSeries.Sequence durationInFrames={424}>
          <Slide06Motor index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slideR} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={415}>
          <Slide06Motor index={1} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slideL} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={384}>
          <Slide06Motor index={2} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={flipEff} timing={springT} />

        {/* 07. PAINEL */}
        <TransitionSeries.Sequence durationInFrames={324}>
          <Slide07Painel index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slideB} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={434}>
          <Slide07Painel index={1} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slideT} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={403}>
          <Slide07Painel index={2} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={wipeEff} timing={springT} />

        {/* 08. IACS */}
        <TransitionSeries.Sequence durationInFrames={444}>
          <Slide08IACS index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={flipEff} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={305}>
          <Slide08IACS index={1} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={clockEff} timing={springT} />

        {/* 09. ROI */}
        <TransitionSeries.Sequence durationInFrames={435}>
          <Slide09ROI index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fadeEff} timing={fadeT} />
        <TransitionSeries.Sequence durationInFrames={327}>
          <Slide09ROI index={1} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={flipEff} timing={springT} />

        {/* 10. CICLO */}
        <TransitionSeries.Sequence durationInFrames={438}>
          <Slide10Ciclo index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={clockEff} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={381}>
          <Slide10Ciclo index={1} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={clockEff} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={427}>
          <Slide10Ciclo index={2} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={clockEff} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={401}>
          <Slide10Ciclo index={3} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={wipeEff} timing={springT} />

        {/* 11. SISTEMICO */}
        <TransitionSeries.Sequence durationInFrames={375}>
          <Slide11Sistemico index={0} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slideT} timing={springT} />
        <TransitionSeries.Sequence durationInFrames={403}>
          <Slide11Sistemico index={1} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fadeEff} timing={fadeT} />

        {/* 12. FECHAMENTO */}
        <TransitionSeries.Sequence durationInFrames={800}>
          <Slide12Fechamento />
        </TransitionSeries.Sequence>
      </TransitionSeries>

    </AbsoluteFill>
  );
}

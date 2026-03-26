// src/Root.tsx
import React from "react";
import { Composition } from "remotion";
import { ProjetoAlphaVideo } from "./Composition";

// Acomodando a gigantificação de TODOS os slides (04-11) em sub-slides individuais
// Novo Total: 11000 frames (aprox 183s @ 60fps)

export function Root() {
  return (
    <Composition
      id="ProjetoAlpha"
      component={ProjetoAlphaVideo}
      durationInFrames={11000}

      fps={60}
      width={1080}
      height={1920}
    />
  );
}





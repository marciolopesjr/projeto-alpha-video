# Projeto Alpha — Vídeo com Remotion

Vídeo animado com 12 slides do Projeto Alpha. Gerado programaticamente com React + Remotion.

## Pré-requisitos

- Node.js 18+ instalado
- FFmpeg instalado (necessário para renderizar o MP4)

## Como rodar

### 1. Instalar dependências

```bash
cd projeto-alpha-video
npm install
```

### 2. Visualizar no Studio (recomendado primeiro)

```bash
npm start
```

Abre no navegador em `http://localhost:3000`. Você consegue navegar slide a slide, ajustar tempos e ver as animações em tempo real.

### 3. Renderizar o vídeo MP4

```bash
npm run build
```

O arquivo final fica em `out/video.mp4`.

---

## Estrutura do projeto

```
src/
  index.tsx          → Entry point do Remotion
  Root.tsx           → Registro da composição (fps, resolução, duração)
  Composition.tsx    → Sequência de todos os slides
  lib/
    utils.tsx        → Cores, fontes, hooks de animação reutilizáveis
  slides/
    Slide01Capa.tsx
    Slide02Impacto.tsx
    Slide03Lacuna.tsx
    Slide04Paradigma.tsx
    Slide05Pilares.tsx
    Slides06a12.tsx  → Slides 6 ao 12
```

---

## Customizações rápidas

### Mudar duração dos slides
Em `src/Composition.tsx`, altere `SLIDE_DURATION`:
- 150 = 5 segundos por slide
- 180 = 6 segundos (padrão)
- 210 = 7 segundos

### Mudar resolução
Em `src/Root.tsx`, ajuste `width` e `height`:
- 1920×1080 = Full HD (padrão)
- 1280×720 = HD
- 3840×2160 = 4K

### Mudar cores
Em `src/lib/utils.tsx`, edite o objeto `COLORS`.

### Adicionar narração (áudio)
No Remotion, use o componente `<Audio>` dentro de cada slide:
```tsx
import { Audio } from "remotion";
<Audio src={staticFile("narration-slide01.mp3")} />
```
Coloque os arquivos de áudio em `public/`.

---

## Dependências principais

| Pacote | Versão |
|--------|--------|
| remotion | 4.0.140 |
| @remotion/cli | 4.0.140 |
| react | 18.2.0 |
| typescript | 5.0.0 |

---

**Duração total do vídeo:** ~74 segundos (12 slides × ~6s médio)
**Resolução:** 1920×1080 (Full HD)
**FPS:** 30

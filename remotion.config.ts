import { Config } from "@remotion/cli/config";

// ------------------------------------------------------------------
// CONFIGURANDO PARA MÁXIMA VELOCIDADE (SPEEDRUN DE EXPORTAÇÃO)
// Porque ninguém tem 40 minutos para esperar um vídeo de 3 minutos...
// ------------------------------------------------------------------

// 1. Troque o formato de extração de PNG para JPEG.
// O Chrome chora pra encodar PNG (é lento demais). JPEG é absurdamente mais rápido.
// Como não temos fundo transparente no vídeo, isso não muda nada na vida real.
Config.setVideoImageFormat("jpeg");

// Qualidade 90 para JPEG. 100 só consome mais disco e não dá pra ver diferença a 60fps.
Config.setJpegQuality(90);

// 2. Maximize o uso dos seus núcleos.
// Deixa o Remotion sugar 100% do seu processador (literalmente).
Config.setConcurrency("100%");

// "angle" é bom para o Windows, mas vamos confiar no padrão dessa versão para não quebrar.
Config.setOverwriteOutput(true);

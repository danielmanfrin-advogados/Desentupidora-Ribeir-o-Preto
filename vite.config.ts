import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          servicoPiaRalo: path.resolve(__dirname, 'servicos/desentupimento-de-pia-e-ralo/index.html'),
          servicoVasoEsgoto: path.resolve(__dirname, 'servicos/desentupimento-de-vaso-e-esgoto/index.html'),
          servicoCaixaGordura: path.resolve(__dirname, 'servicos/limpeza-de-caixa-de-gordura/index.html'),
          bairroCentro: path.resolve(__dirname, 'bairros/centro/index.html'),
          bairroJardimBotanico: path.resolve(__dirname, 'bairros/jardim-botanico/index.html'),
          bairroNovaAlianca: path.resolve(__dirname, 'bairros/nova-alianca/index.html'),
          bairroVilaTiberio: path.resolve(__dirname, 'bairros/vila-tiberio/index.html'),
          bairroBonfimPaulista: path.resolve(__dirname, 'bairros/bonfim-paulista/index.html'),
          bairroCamposEliseos: path.resolve(__dirname, 'bairros/campos-eliseos/index.html'),
          sobre: path.resolve(__dirname, 'sobre/index.html'),
          perguntasFrequentes: path.resolve(__dirname, 'perguntas-frequentes/index.html'),
          politicaPrivacidade: path.resolve(__dirname, 'politica-de-privacidade/index.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

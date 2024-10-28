/* Autor: Prof. Dr. Norman Lahme-Hütig (FH Münster) */

import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';
import viteLitCssPlugin from './vite-lit-css-plugin.js';
import fs from 'fs';

export default defineConfig({
  build: { target: 'esnext' },
  plugins: [viteLitCssPlugin()],
  server: {
    port: 8080,
    host: true,
    //Autor: Charlotte Fehlhauer
    https: {
      key: fs.readFileSync('../Zertifikatskette/server.key.pem'),
      cert: fs.readFileSync('../Zertifikatskette/server.cert.pem'),
      ca: fs.readFileSync('../Zertifikatskette/intermediate-ca.cert.pem')
    }
  },

  css: {
    postcss: {
      plugins: [postcssPresetEnv({ stage: 2 })]
    }
  }
});

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'
import alias from '@rollup/plugin-alias';
import image from '@rollup/plugin-image';
import cssAutoprefixer from 'autoprefixer';
import cssImport from 'postcss-import';
import cssImportUrl from 'postcss-import-url';
import cssVariables from 'postcss-css-variables';
import cssRemoveRoot from 'postcss-remove-root';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

const production = !process.env.ROLLUP_WATCH

export default {
  // The file we created with our web component wrapper.
  input: 'src/web-components.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    // We output it to public. This way, our svelte kit
    // app will also host the web components.
    file: 'static/web-components.js',
  },
  // Normal rollup svelte configuration. Nothing fancy
  // happening here.
  plugins: [
    typescript(),
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        postcss: {
          plugins: [cssImport({ plugins: [cssImportUrl()] }), cssImportUrl(), cssVariables(), cssRemoveRoot(), cssAutoprefixer()]
        }
      }),
      // We just make sure that no global CSS is injeced
      // into the page that imports this script.
      emitCss: false,
      compilerOptions: {
        dev: !production,
      },
    }),
    resolve(),
    postcss({
      minify: Boolean(production),
      include: [path.resolve('src/fonts.css')],
      extract: path.resolve('static/web-components-fonts.css'),
      plugins: [cssImport(), cssImportUrl()]
    }),
    commonjs(),
    alias({
      entries: [
        { find: '$lib', replacement: 'src/lib' }
      ]
    }),
    image(),
    // Minify the production build (npm run build)
    production && terser(),
  ],
}
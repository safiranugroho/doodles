import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import terser from '@rollup/plugin-terser'
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

const production = process.env.NODE_ENV !== 'dev';

export default [{
  // The file that creates all web components.
  input: 'src/web-components.ts',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    // Output it to public. This way, the SvelteKit
    // app will also host the web components.
    file: 'package/web-components.min.js',
  },
  watch: !production,
  plugins: [
    typescript(),
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        postcss: {
          plugins: [cssImport({ plugins: [cssImportUrl()] }), cssImportUrl(), cssVariables(), cssRemoveRoot(), cssAutoprefixer()]
        }
      }),
      // Make sure that no global CSS is injeced
      // into the page that imports this script.
      emitCss: false,
    }),
    resolve(),
    postcss({
      minify: production,
      include: [path.resolve('src/fonts.css')],
      extract: path.resolve('package/web-components-fonts.css'),
      plugins: [cssImport(), cssImportUrl()]
    }),
    commonjs(),
    alias({
      entries: [
        { find: '$lib', replacement: 'src/lib' }
      ]
    }),
    image(),
    // Minify the build
    production && terser(),
  ],
},
{
  input: 'src/web-components-metadata.ts',
  output: {
    sourcemap: !production,
    format: 'es',
    name: 'app',
    file: 'package/web-components-metadata.min.js',
  },
  watch: !production,
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    production && terser(),
  ],
}]
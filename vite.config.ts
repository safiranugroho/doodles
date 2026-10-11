import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import type { UserConfig } from 'vite';

const config: UserConfig = {
  plugins: [
    sveltekit({
      // Consult https://svelte.dev/docs/kit/integrations#preprocessors
      // for more information about preprocessors
      preprocess: vitePreprocess(),
      adapter: adapter({
        runtime: 'nodejs24.x'
      })
    })
  ]
};

export default config;

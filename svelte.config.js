// import netlify from '@sveltejs/adapter-netlify';
import vercel from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import { defineConfig } from 'vite';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const viteConfig = defineConfig({
	plugins: [
		nodeResolve({
			dedupe: ['svelte', 'svelte/transition', 'svelte/internal'] // important!
		})
	]
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: vercel(),
		vite: viteConfig
	}
};

export default config;

const themeSwapper = require('tailwindcss-theme-swapper');
const themes = require('./theme.config.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: { extend: {} },
	plugins: [themeSwapper(themes)]
};

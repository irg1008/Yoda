import { writable } from 'svelte/store';
import { browser } from '$app/env';

const THEME_KEY = 'theme';
const DARK = 'dark';
const LIGHT = 'light';

//#region local storage
const getTheme = () => localStorage.getItem(THEME_KEY);
const persist = (theme: string | null) =>
	theme ? localStorage.setItem(THEME_KEY, theme) : localStorage.removeItem(THEME_KEY);
//#endregion

const theme = writable(browser ? getTheme() : null);

//#region  schema
const setPersistentTheme = (newTheme: string | null) => {
	persist(newTheme);
	theme.set(newTheme);
	const documentTheme = newTheme ?? getSchemeTheme();
	document.body.classList.toggle(DARK, documentTheme === DARK);
};

const getScheme = () => window.matchMedia('(prefers-color-scheme: dark)');
const getSchemeTheme = () => (getScheme().matches ? DARK : LIGHT);

const listenForSchemeChange = () =>
	getScheme().addEventListener('change', () => {
		if (!getTheme()) setSystemTheme();
	});
//#endregion

const loadTheme = () => {
	if (!browser) return;
	const cachedTheme = getTheme();
	setPersistentTheme(cachedTheme);
	listenForSchemeChange();
};

const setDarkTheme = () => setPersistentTheme(DARK);
const setLightTheme = () => setPersistentTheme(LIGHT);
const setSystemTheme = () => setPersistentTheme(null);

export default { loadTheme, setDarkTheme, setLightTheme, setSystemTheme, theme };

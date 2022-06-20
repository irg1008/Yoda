const {
	neutral: darkTheme,
	neutral: lightTheme,
	sky: darkPrimary,
	sky: lightPrimary
} = require('tailwindcss/colors');

const themes = {
	themes: [
		{
			name: 'base',
			selectors: [':root'],
			theme: {
				colors: {
					lighter: lightTheme[100],
					light: lightTheme[200],
					medium: lightTheme[400],
					dark: lightTheme[600],
					darker: lightTheme[800],
					prim: lightPrimary[600],
					sec: lightPrimary[700],
					tert: lightPrimary[400],
					accent: lightPrimary[800]
				},
				borderRadius: {
					custom: '8px'
				},
				borderWidth: {
					button: '2px'
				},
				borderColor: {
					button: darkTheme[600]
				}
			}
		},
		{
			name: 'dark',
			selectors: ['.dark'],
			theme: {
				colors: {
					lighter: darkTheme[900],
					light: darkTheme[700],
					medium: darkTheme[500],
					dark: darkTheme[300],
					darker: darkTheme[100],
					prim: darkPrimary[500],
					sec: darkPrimary[400],
					tert: darkPrimary[200],
					accent: darkPrimary[500]
				},
				borderRadius: {
					custom: '9999px'
				},
				borderWidth: {
					button: '2px'
				},
				borderColor: {
					button: darkTheme[400]
				}
			}
		}
	]
};

module.exports = themes;

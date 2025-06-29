module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx}"],

	theme: {
		extend: {
			fontFamily: {
				main: ["var(--font-main)"],
				caption: ["var(--font-caption)"],
				text: ["var(--font-text)"],
			},
			colors: {
				"btn-main": "#9F78FF",
				"btn-main-dark": "#7A56CC",
			},
		},
	},
	plugins: [],
};

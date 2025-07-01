import { type Config } from "tailwindcss";

export default {
	content: [
		"./src/presentation/**/*.tsx",
		"./src/react/**/*.{js,ts,jsx,tsx}",
		"./index.html"
	],
	theme: {
		extend: {},
	},
	plugins: [],
} as Config;

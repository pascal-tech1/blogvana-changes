// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				inter: [
					"Graphik-Regular",
					"Graphik-Black",
					"Graphik-Bold",
					"Graphik-",
					"Graphik-Extralight",
					"Graphik-light",
					"Graphik-lightItalic",
					"Graphik-Medium",
					"Graphik-MediumItalic",
					"Graphik-Regular",
					"Graphik-RegularItalic",
					"Graphik-Super",
					"Graphik-SuperItalic",
					"Graphik-Thin",
					"sans-serif",
				],
			},
			colors: {
				lightdark: "#202127",
				dark: "#1b1b1f",
				colorPrimary: "#a8b1ff",
				// ... and so on for other properties
			},
		},
	},
	plugins: [],
};

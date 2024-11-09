/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./screens/**/*.{js,jsx,ts,tsx}", "./Components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: '#5D87FF'
			},
			fontFamily: {
				pthin: ["Poppins-Thin", "sans-serif"],
				pextralight: ["Poppins-ExtraLight", "sans-serif"],
				plight: ["Poppins-Light", "sans-serif"],
				pregular: ["Poppins-Regular", "sans-serif"],
				pmedium: ["Poppins-Medium", "sans-serif"],
				psemibold: ["Poppins-SemiBold", "sans-serif"],
				pbold: ["Poppins-Bold", "sans-serif"],
				pextrabold: ["Poppins-ExtraBold", "sans-serif"],
				pblack: ["Poppins-Black", "sans-serif"],
			},
		},
	},
	plugins: [],
}


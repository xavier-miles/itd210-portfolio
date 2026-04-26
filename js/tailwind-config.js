// Sets Tailwind custom colors, fonts
tailwind.config = {
	theme: {
		extend: {
			colors: {
				primary: '#005580',
				secondary: '#F7F986',
				dark: '#013651',
				light: '#c0cad8',
				bg: '#c0cad8aa',
			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				cabin: ['Cabin', 'sans-serif'],
			},
			fontSize: {
				h1: 'clamp(1.625rem, 3.5vw, 4.5rem)',
				h2: 'clamp(1.5rem, 2vw, 3.5rem)',
				p: 'clamp(1rem, 1.2vw, 2.5rem)',
				caption: 'clamp(0.9rem, 1vw, 2rem)',
			},
			boxShadow: {
				'hover': '0px 0px 32px #013651',
			}
		}
	}
}

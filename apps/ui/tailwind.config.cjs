const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			screens: {
				sm: '640px',
				md: '769px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
				mdh: { raw: '(min-height: 800px)' },
				xlh: { raw: '(min-height: 1600px)' }
			}
		}
	},

	plugins: [forms, typography, daisyui]
};

module.exports = config;

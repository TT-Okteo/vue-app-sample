import type { Config } from 'tailwindcss';
import primeui from 'tailwindcss-primeui';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [primeui],
  darkMode: 'selector',
} satisfies Config;

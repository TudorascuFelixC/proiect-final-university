import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'frame1': 'url("/frame1.png")',
      },
      animation: {
        // bounce from left to right
        'left-right': 'left-right 0.5s linear infinite',
      },
      keyframes: {
        // bounce from left to right
        'left-right': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(10%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

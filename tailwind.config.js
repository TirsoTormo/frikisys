/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#0f0f0f',
          card: '#1a1a1a',
          border: '#2a2a2a',
          hover: '#252525',
        },
        text: {
          primary: '#e5e5e5',
          secondary: '#888888',
          muted: '#666666',
        },
        accent: {
          DEFAULT: '#6b7280',
          hover: '#9ca3af',
        },
        pixel: {
          dark: '#404040',
          light: '#525252',
        }
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'pixel': '2px',
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0px #2a2a2a',
        'pixel-md': '4px 4px 0px #2a2a2a',
      }
    },
  },
  plugins: [],
}
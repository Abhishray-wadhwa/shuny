/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h1: {
              fontSize: theme('fontSize.3xl')[0],
              fontWeight: '700',
              color: theme('colors.gray.900'),
              marginBottom: '0.5em',
            },
            h2: {
              fontSize: theme('fontSize.2xl')[0],
              fontWeight: '700',
              color: theme('colors.gray.800'),
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            h3: {
              fontSize: theme('fontSize.xl')[0],
              fontWeight: '600',
              color: theme('colors.gray.800'),
              marginTop: '1em',
              marginBottom: '0.5em',
            },
            strong: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            p: {
              marginTop: '1em',
              marginBottom: '1em',
              lineHeight: '1.75',
            },
            ul: {
              paddingLeft: '1.25em',
              marginTop: '0.5em',
              marginBottom: '0.5em',
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

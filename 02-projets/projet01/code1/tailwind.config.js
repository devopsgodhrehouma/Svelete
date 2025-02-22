/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#60A5FA', // Bleu lumineux
          500: '#3B82F6', // Bleu principal
          600: '#2563EB', // Bleu foncé
        },
        accent: {
          400: '#34D399', // Vert lumineux
          500: '#10B981', // Vert principal
          600: '#059669', // Vert foncé
        }
      }
    },
  },
  plugins: [],
}
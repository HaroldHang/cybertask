/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
const colors = require('tailwindcss/colors')

export default {
  mode: 'jit',
  darkMode : 'class',
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.neutral,
        slate: colors.slate,
        indigo: colors.indigo,
        red: colors.rose,
        green:colors.green,
        yellow: colors.amber,
        blue: colors.blue,
        purple: colors.purple,
        rose: colors.rose,
        liver: {
            DEFAULT: '#474954',
            dark: '#2F3137',
            rising: '#26272C',
            darker: '#1C1D21'
        },
        darkin: {
            //DEFAULT: '#121517',
            DEFAULT: '#111318',
            text: '#F8F8FF',
        },
        rosin: {
            dark: '#DE7C7C'
        }

    },
    fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'display': ['Oswald'],
        'body': ['"Noto Sans","Open Sans"'],
    },

    extend: {
        height: {
            //sm: '8px',
            //md: '16px',
            //lg: '24px',
            //xl: '48px',
        },
        fontSize: {
            '4dxl':'2.75rem',
        },
        screens : {
            //'sd' : '468px',
            //'mlm': '500px',
            //'mld': '720px',
            //'lb' : '1024px'
        }
    },
},
  plugins: [
    daisyui,

  ],
}


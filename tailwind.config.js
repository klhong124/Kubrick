// tailwind.config.js
module.exports = {
    mode: "jit",
    purge: [
        "./components/**/*.{vue,js}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'kubrick': '#223536',
            },
            transitionProperty: {
                'width': 'width'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
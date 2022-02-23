import server from './server'


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Kubrick - Front-End Developer Coding Challenge',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Create a simple Vue application' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  target: 'static',
  css: [],

  hooks: {
    render: {
      async before({
        nuxt: {
          server: { app },
        },
      }) {
        await server.start()
        await server.applyMiddleware({ app, path: '/graphql' })
        console.log(`🚀 ApolloServer ready at /graphql`)
      },
    },
  },



  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/apollo-client.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "nuxtjs-mdi-font",
    '@nuxtjs/axios',
    '@nuxtjs/apollo',

  ],
  apollo: {
    clientConfigs: {
      default: '~/graphql'
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://countries.trevorblades.com/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      '@vue/apollo-composable'
    ]
  },
}

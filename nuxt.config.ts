// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-primevue'
  ],
  primevue: {
    options:{
      ripple: true
    },
    components: {
      include: ['Button', 'Menubar']
    }
  },
  devtools: { enabled: true },
  css: ['primevue/resources/themes/lara-light-teal/theme.css', "primeicons/primeicons.css"]
})

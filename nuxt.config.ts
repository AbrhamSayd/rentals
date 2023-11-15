// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: ["~/plugins/primevue.ts"],
  modules: ["nuxt-primevue"],
  primevue: {
    options: {
      ripple: true,
    },
    components: {
      include: "*",
    },
  },
  devtools: { enabled: true },
  css: [
    "primevue/resources/themes/lara-dark-blue/theme.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
  ],
  pages: {
    dynamic: {
      extendRoute(route) {
        route.params.id = "[a-zA-Z0-9]+";
        return route;
      },
    },
  },
});

export default {
  target: "static",
  head: {
    title: "sport-app-client",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Application to create, share, guide and analyze your sports sessions. ",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: ["@nuxtjs/tailwindcss"],
  modules: ["@nuxtjs/axios", "@nuxtjs/pwa"],
};

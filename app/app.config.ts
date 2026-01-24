export default defineAppConfig({
  ui: {
    colors: {
      primary: "green",
      neutral: "slate",
    },
  },
  colorMode: {
    preference: "light", // Force light mode
    fallback: "light",
    dataValue: "light",
    storageKey: "nuxt-color-mode",
    componentName: "ColorScheme",
  },
});

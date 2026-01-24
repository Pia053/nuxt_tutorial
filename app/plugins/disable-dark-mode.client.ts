export default defineNuxtPlugin(() => {
  // Force disable dark mode detection
  if (typeof window !== "undefined") {
    // Remove any dark mode class immediately
    document.documentElement.classList.remove("dark");
    document.documentElement.removeAttribute("data-color-mode");

    // Force light mode
    document.documentElement.setAttribute("data-color-mode", "light");
    document.documentElement.style.colorScheme = "light";
  }
});

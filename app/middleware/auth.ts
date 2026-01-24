export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("auth-token");

  if (!token.value) {
    return navigateTo("/login");
  }
});

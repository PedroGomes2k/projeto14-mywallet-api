export function unauthorized() {
  return {
    name: "unauthorized",
    message: "Your token is invalid!",
  };
}

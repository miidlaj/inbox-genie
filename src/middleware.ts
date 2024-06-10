export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/protected",
    "/protected/:path*", //use this to protect all child routes of '/protected'
  ],
};
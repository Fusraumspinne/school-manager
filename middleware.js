export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/datein", "/fach/:path*"] }
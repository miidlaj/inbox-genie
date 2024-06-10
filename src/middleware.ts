import NextAuth from 'next-auth';
import { authOptions } from './app/api/auth/[...nextauth]/route';
 
export default NextAuth(authOptions).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
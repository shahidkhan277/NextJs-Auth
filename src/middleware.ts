import { NextRequest, NextResponse } from "next/server";



export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;
    const publicPaths = ['/login', '/signup', '/verifyemail', '/forgotPassowrd', '/resetPassword'];
    const isPublicPath = publicPaths.includes(path);

    const token = request.cookies.get('token')?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}


export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/verifyemail',
        '/profile/:path*',

    ]

}
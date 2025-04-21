import { NextRequest, NextResponse } from "next/server";
export {default} from "next-auth/middleware"
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest){

    const token = await getToken({req: request})
    const url = request.nextUrl

    if(token && ( url.pathname.startsWith('/signin') || url.pathname.startsWith('/signup') || url.pathname.startsWith('/verify'))){
        return NextResponse.redirect(new URL('/', request.url))
    }
    if(!token && ( url.pathname.startsWith('/') )){
        return NextResponse.redirect(new URL('/signin', request.url))
    }


    return NextResponse.next()
}

export const config = {
    matcher: [
        // '/signin',
        '/'
    ]
}
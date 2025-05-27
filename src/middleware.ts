import { isCuid } from '@paralleldrive/cuid2';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getOneUrlFromDb } from './server/actions/redirect';
import { appDomain, privateRoutes, publicRoutes } from './routes';
import { auth } from './auth';


export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname
  const session = await auth()
  
  const isPrivateRoute = privateRoutes.includes(pathName)
  const isPublicRoute = publicRoutes.includes(pathName)
  const isAuthRoute = pathName === '/auth'
  const isNotFound = pathName === '/not-found'
  const slug = pathName.split('/').pop()

  if (isNotFound) {
    return NextResponse.next()
  }
  
  if (isPrivateRoute && !session) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if(!isPublicRoute && !isPrivateRoute) {
    if (slug && isCuid(slug)) {
      const dbResult = await getOneUrlFromDb(slug)
      const {link, error, message, timeStamp} = dbResult      

      if (link?.url && link.url === `${appDomain}${slug}`) {
        return NextResponse.redirect(new URL('/not-found', request.url))
      }

      if (error && message) {
        const notFoundURL = new URL('/not-found', request.url)
        const response = NextResponse.redirect(notFoundURL)

        return response
      }
      else if (link) return NextResponse.redirect(link?.url)

    }
    
    return NextResponse.redirect(new URL('/not-found', request.url))
  }
}
 
export const config = {
  matcher: [
    '/((?!api|_next|static|favicon.ico).*)',
  ],
}
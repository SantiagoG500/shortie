import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextResponse } from 'next/server'
import { middleware } from '@/middleware'
import { privateRoutes, publicRoutes } from '@/routes'
import { generateCUID2 } from '@/utils/cuid2'
import { getOneUrlFromDb, urlFormDbResult } from '@/server/actions/redirect'

vi.mock('./routes', () => ({
  privateRoutes,
  publicRoutes
})) 

vi.mock('next/server', () => {
  const NextResponse = {
    next: vi.fn(() => ({
      headers: new Map(),
    })),
    redirect: vi.fn((url) => {
      // console.log('Redirect called with:', {
      //   url,
      //   pathname: url.pathname,
      //   fullUrl: url.toString()
      // });

      return {
        url,
        headers: new Map(),
      }
    }),
  }
  return { NextResponse }
})

vi.mock('../src/server/actions/redirect', () => ({
  getOneUrlFromDb: vi.fn()
}))

describe('Middleware Redirects', () => {
  let mockRequest: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockRequest = {
      nextUrl: new URL('http://localhost:3000'),
      url: 'http://localhost:3000',
      cookies: {
        get: vi.fn(),
      },
    }
  })

  describe('Basic Redirects', () => {
    it('should redirect to not-found when route not founded', () => {
      mockRequest.nextUrl = new URL('http://localhost:3000/fake-route')
      
      middleware(mockRequest)
      
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        expect.objectContaining({
          href: 'http://localhost:3000/not-found'
        })
      )
    })

    // This test needs to show if the route is founded or not
    it('should redirect to internal URL when founded', () => {
      mockRequest.nextUrl = new URL('http://localhost:3000/login')
      
      middleware(mockRequest)
      
      expect(NextResponse.redirect).toHaveBeenCalled()
    })
  })

  // all of this tests should work without looking actually in the database
  describe('Redirect with slug', () => {
    it('should redirect to URL when a slug is found', async () => {
      const mockDbResponse: urlFormDbResult = {
        error: false,
        message: 'Link found Succesfully',
        link: {
          title: 'My title',
          description: 'Description',
          url: 'https://example.com',
          slug:'wy0ss5d', 
          clicks: 0, 
          id:'1234',
          createdAt: Date.now().toString(),
          recentClick: '',
          userId: '45678'
        },
        timeStamp: Date.now()
      }

      vi.mocked(getOneUrlFromDb)
        .mockResolvedValue(mockDbResponse)

      mockRequest.nextUrl = new URL('http://localhost:3000/wy0ss5d')
      await middleware(mockRequest)

      expect(NextResponse.redirect).toHaveBeenCalledWith('https://example.com')
    })

    it('should redirect to not-found if a slug is not found', async () => {
      const mockDbResponse: urlFormDbResult = {
        error: true,
        message: 'Link not found',
        timeStamp: Date.now(),
      }      

      vi.mocked(getOneUrlFromDb)
        .mockResolvedValue(mockDbResponse)

      mockRequest.nextUrl = new URL('http://localhost:3000/120538f')
      await middleware(mockRequest)
      
      expect(NextResponse.redirect).toHaveBeenCalledWith(
        new URL('http://localhost:3000/not-found')
      )
    })
  })
  
})
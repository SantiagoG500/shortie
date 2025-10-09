import { vi, it, describe, beforeEach, expect } from 'vitest'
import { isCuid } from '@paralleldrive/cuid2'

import { middleware } from '@/middleware'
import { getOneUrlFromDb, urlFormDbResult } from '@/server/actions/redirect'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { date } from 'drizzle-orm/pg-core'

// Mock next/server BEFORE any imports that use it
vi.mock('next/server', () => ({
  NextResponse: {
    redirect: vi.fn((url: string | URL) => ({ 
      status: 307, 
      redirected: true,
      url: url.toString() 
    })),
    next: vi.fn(() => ({ 
      status: 200, 
      next: true 
    }))
  },
  NextRequest: vi.fn()
}))

// Mock NextAuth with flexible return type
vi.mock('@/auth', () => ({
  auth: vi.fn().mockResolvedValue(null)
}))

// Mock server actions
vi.mock('@/server/actions/redirect', () => ({
  getOneUrlFromDb: vi.fn()
}))

// Mock database
vi.mock('@/db/client', () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    links: {}
  }
}))

// Now import after mocks are set up

function createRequest(path: string) {
  return {
    url: `https://example.com${path}`,
    nextUrl: {
      pathname: path,
      searchParams: new URLSearchParams()
    },
    headers: new Map(),
    cookies: new Map()
  } as any
}

describe('Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic redirect behavior', () => {
    it('Should return NextResponse.next() for the route /not-found', async () => {
      const request = createRequest('/not-found')
      const result = await middleware(request)
      
      expect(NextResponse.next).toHaveBeenCalled()
      expect(NextResponse.redirect).not.toHaveBeenCalled()
      expect(result).toHaveProperty('next', true)
    })

    it('Should handle protected routes', async () => {
      (auth as any).mockResolvedValueOnce(null)
      
      const request = createRequest('/dashboard')
      await middleware(request)
      
      expect(auth).toHaveBeenCalled()
    })

    it('Should allow access when user is authenticated', async () => {
      (auth as any).mockResolvedValueOnce({ 
        user: { id: '1', email: 'test@example.com' } 
      })
      
      const request = createRequest('/dashboard')
      await middleware(request)
      
      expect(auth).toHaveBeenCalled()
   })   
  })

  describe('Shortener redirect logic', () => {
    it('Should redirect to URL when a slug is found', async () => {
      const mockDbResponse: urlFormDbResult = {
        error: false,
        message: 'Link found Succesfully',
        link: {
          title: 'My link',
          description: 'Description',
          url: 'https://google.com',
          slug: 'xy0ss6d',
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

      const request = createRequest('/xy0ss6d')
      await middleware(request)
      
      expect(NextResponse.redirect).toHaveBeenCalledWith('https://google.com')
    })
  })
  
})
import { db } from '@/db/client';
import { SelectLinks } from '@/db/db-schemas';
import { CreateLinkSchema, EditLinkSchema } from '@/schemas/schema';
import { createLink, deleteLink, getLink, getLinks, updateLink } from '@/server/actions/link';
import { getUserSession } from '@/utils/actions';
import { User } from 'next-auth';
import { describe, it, expect, vi } from "vitest";


vi.mock('@/utils/actions', () => ({
  getUserSession: vi.fn()
}))

vi.mock('@/db/client', () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    links: {}
  }
}))

vi.mock('@/utils/cuid2', () => ({
  generateCUID2: vi.fn()  
}))

vi.mock('@/schemas/schema', () => ({
  CreateLinkSchema: {
    safeParse: vi.fn()
  },
  EditLinkSchema: {
    safeParse: vi.fn()
  }
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}))


describe('Link actions', () => {
  it('Should create a link', async () => {
    const {result, mockLinkId} = await mockData()

    expect(result).toEqual({
      success: true,
      error: '',
      linkId: mockLinkId
    })
  })

  it('Should get a single link', async () => {
    const { mockLinkData, mockLinkId} = await mockData()

    const mockLinkProps = {
      linkId: mockLinkId
    }

    const mockWhere = vi.fn().mockResolvedValue([mockLinkData])
    const mockFrom = vi.fn().mockReturnValue({
      where: mockWhere
    })

    vi.mocked(db.select).mockReturnValue({
      from: mockFrom
    } as any)


    const result = await getLink(mockLinkProps)
    
    expect(result).toEqual({
      success: true,
      error: '',
      data: mockLinkData
    })
  })

  it('Should get many links', async () => {
    const { mockLinkData } = await mockData()
    const secondMockLink: CreateLinkSchema = {
      title: 'My second link',
      description: 'description',
      slug:'7890',
      url: 'https://www.youtube.com/'
    }

    const mockQuery = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockResolvedValue([mockLinkData, secondMockLink]),
    }

    vi.mocked(db.select).mockReturnValue(mockQuery as any)

    const result = await getLinks({})

    expect(result).toEqual({
      success: true,
      error: '',
      data: [
        mockLinkData,
        secondMockLink
      ]
    })
  })
  
  it('Should delete a link', async () => {
    const { mockLinkId } = await mockData()

    const mockLink: SelectLinks = {
      title: 'New link',
      id: 'link-23456789',
      description: 'description',
      clicks: 0,
      createdAt: '',
      recentClick: '',
      slug: '348u09',
      url: 'https://www.youtube.com/',
      userId: 'user-1234'

    }

    const mockQuery = {
      where: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{ id: mockLinkId }])
    }

    vi.mocked(db.delete).mockReturnValue(mockQuery as any)

    const result = await deleteLink(mockLink)

    expect(result).toEqual({
      success: true,
      error: '',
    })
  })

  it('Should update a link', async () => {
    const { mockLinkData, mockLinkId } = await mockData()
  
    const newLinkData = {
      title: 'Updated Title',
      description: 'Updated description',
      url: 'https://www.updated.com/'
    }
    
    const mockUpdateProps = {
      linkData: {
        id: mockLinkId,
        title: mockLinkData.title,
        slug: mockLinkData.slug,
        description: mockLinkData.description,
        url: mockLinkData.url,
        createdAt: '2024-01-01T00:00:00.000Z',
        clicks: 0,
        recentClick: null,
        userId: 'user-123456'
      },
      newLinkData: newLinkData
    }
    
    vi.mocked(EditLinkSchema.safeParse).mockReturnValue({
      success: true,
      data: newLinkData
    })
    

    const mockQuery = {
      set: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue(undefined)
    }
    
    vi.mocked(db.update).mockReturnValue(mockQuery as any)
    
    const result = await updateLink(mockUpdateProps)
    
    expect(result).toEqual({
      success: true,
      error: ''
    })
  })
})

async function mockData() {
   const mockUser: User = {
    name: 'Willem Dafoe',
    email: 'green.goblin@oscorp.com',
    id: 'user-123456',
  }
  const mockLinkData: CreateLinkSchema = {
    title: 'My link',
    description: 'description',
    slug: '1234567',
    url: 'https://www.google.com/',
  }
  
  const mockLinkId = 'link-1234'
  vi.mocked(getUserSession).mockResolvedValue({
    success: true,
    session: {
      user: mockUser,
      expires: ''
    },
    error: ''
  })

  vi.mocked(CreateLinkSchema.safeParse).mockReturnValue({
    success: true,
    data: mockLinkData
  })

  const mockReturning = vi.fn().mockResolvedValue([ { id: mockLinkId } ])
  const mockValues = vi.fn().mockReturnValue({
    returning: mockReturning
  })

  vi.mocked(db.insert).mockReturnValue({
    values: mockValues
  } as any)

  const result = await createLink(mockLinkData)
  
  return {
    mockLinkData,
    mockLinkId,
    result,
  }
}


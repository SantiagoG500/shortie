import { db } from '@/db/client'
import { SelectTags } from '@/db/db-schemas'
import { CreateTagSchema } from '@/schemas/schema'
import { createTag, deleteTag, getTags, updateTag } from '@/server/actions/tag'
import { getUserSession } from '@/utils/actions'
import { error } from 'console'
import { User } from 'next-auth'
import { expect, describe, it, vi } from 'vitest'

vi.mock('@/utils/actions', () => ({
  getUserSession: vi.fn()
}))

vi.mock('@/db/client', () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    tags: {}
  }
}))

vi.mock('@/utils/cuid2', () => ({
  generateCUID2: vi.fn()  
}))

vi.mock('@/schemas/schema', () => ({
  CreateTagSchema: {
    safeParse: vi.fn()
  },
  EditTagSchema: {
    safeParse: vi.fn()
  }
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}))


describe('Tag actions', () => {
  it('should create a tag', async () => {
    const {result, mockTagId} = await mockData()

    expect(result).toEqual({
      success: true,
      error: '',
    })
  })

  it('Should get many tags', async () => {
    const { tags, mockTagId } = await mockData()

    const mockQuery = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue(tags),
    }
    
    vi.mocked(db.select).mockReturnValue( mockQuery as any )

    const result = await getTags()

    expect(result).toEqual({
      success: true,
      error: '',
      data: tags
    })
  })

  it('Should delete a tag', async () => {
    const { tags, mockTagId } = await mockData()
    const mockTag: SelectTags = {
      title: 'New tag',
      id: 'tag-12345',
      userId: 'user-12345'
    }

    const mockQuery = {
      where: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue([{ id: mockTagId }])
    }

    vi.mocked(db.delete).mockReturnValue(mockQuery as any)

    const result = await deleteTag({ tag: mockTag })
  
    expect(result).toEqual({
      success: true,
      error: ''
    })
  })

  it('Should delete a tag', async () => {
    const { mockTagId } = await mockData()

    const tag: SelectTags = {
      title: 'My tag',
      id: 'tag-123456',
      userId: 'user-123456'
    }
    const updatedTag = {
      title: 'My edited tag'
    }

    const mockUpdateProps = {
      tagData: tag,
      newTagData: updatedTag
    }

    vi.mocked(CreateTagSchema.safeParse).mockReturnValue({
      success: true,
      data: updatedTag
    })

    const mockQuery = {
      set: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue(undefined)
    }

    vi.mocked(db.update).mockReturnValue(mockQuery as any)

    const result = await updateTag({
      tagData: tag,
      newTagData: updatedTag
    })

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
  const mockTagData: CreateTagSchema = {
    title: 'My tag',
  }
  const secondMockTag: CreateTagSchema = {
    title: 'My second tag'
  }

  const tags = [ mockTagData, secondMockTag ]

  const mockTagId = 'tag-1234'
  vi.mocked(getUserSession).mockResolvedValue({
    success: true,
    session: {
      user: mockUser,
      expires: ''
    },
    error: ''
  })

  vi.mocked(CreateTagSchema.safeParse).mockReturnValue({
    success: true,
    data: mockTagData
  })


  const mockReturning = vi.fn().mockResolvedValue([ { id: mockTagId } ])
  const mockValues = vi.fn().mockReturnValue({
    returning: mockReturning
  })

  vi.mocked(db.insert).mockReturnValue({
    values: mockValues
  } as any)

  const result = await createTag(mockTagData)


  return {
    tags,
    mockTagId,  
    result
  }
}




// it('should get a single tag', async () => {})
// it('should get manu tags', async () => {})
// it('should delete a tag', async () => {})
// it('should update a tag', async () => {})
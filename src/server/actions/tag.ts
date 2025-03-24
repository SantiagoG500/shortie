'use server'

import { auth } from '@/auth'
import { db } from '@/db/client'
import { SelectTags, tags } from '@/db/db-schemas'
import { CreateTagSchema } from '@/schemas/schema'
import { generateCUID2 } from '@/utils/cuid2'
import { revalidatePath } from 'next/cache'

enum TagErrors {
  SESSION_NOT_FOUND = 'User session not found',
  NOT_VALID_DATA = 'Data is no valid to be sent to the database',
  SUBMIT_ERROR = 'Error submiting tag data in Database',
}
export type TagBaseReturn = { success: boolean, error: string}

export async function createTag(tagData: CreateTagSchema): Promise<TagBaseReturn> {
  try {
    const session = await auth()
    const { success, data } = CreateTagSchema.safeParse(tagData)
    
    if (!session?.user?.id) {
      console.log('Session not found');

      return {
        success: false,
        error: TagErrors.SESSION_NOT_FOUND
      }
    }
    if (!success) {
      return {
        success,
        error: TagErrors.NOT_VALID_DATA
      }
    }
    
    const fullTagData: SelectTags = {
      title: data.title,
      id: generateCUID2(),
      userId: session.user.id
    }

    console.log({fullTagData});
    
    revalidatePath('/dashboard')
    await db.insert(tags).values(fullTagData)

    return { success: true, error: '' }
  } catch (error) {
    console.error('ERROR WHEN CREATING TAG: ', error)
    return {
      success: false,
      error: TagErrors.SUBMIT_ERROR
    }
  }
}
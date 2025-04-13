'use server'

import { auth } from '@/auth'
import { db } from '@/db/client'
import { InsertLinksTags, linksTags, SelectTags, tags } from '@/db/db-schemas'
import { CreateTagSchema } from '@/schemas/schema'
import { generateCUID2 } from '@/utils/cuid2'
import { and, eq, inArray } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

enum TagErrors {
  SESSION_NOT_FOUND = 'User session not found',
  NOT_VALID_DATA = 'Data is no valid to be sent to the database',
  SUBMIT_ERROR = 'Error submiting tag data in Database',
  ADD_TAGS_ERROR = 'Something went wrong adding tags to the created link',
  QUERY_ERROR = 'Error retrieving tags',
  UPDATE_ERROR = 'Error updating tags'
}
export type TagBaseReturn = { success: boolean, error: TagErrors | ''}

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

export type getTagsReturn = TagBaseReturn & {data?: SelectTags[]}
export async function getTags(): Promise<getTagsReturn> {
  try {
     const session = await auth() 
     if (!session?.user?.id) {
       console.log('Session not found');  
       return {
         success: false,
         error: TagErrors.SESSION_NOT_FOUND
       }
     }

    const result = await db.select()
      .from(tags).where(eq(tags.userId, session.user.id))

    return {
      success: true,
      error: '',
      data: result
    }
  } catch (error) {
    console.error('ERROR GETTING TAGS');
    
    return {
      success: false,
      error: TagErrors.QUERY_ERROR
    }
  }
}

export async function addTags({tags, linkId}: {tags: string[], linkId: string}): Promise<TagBaseReturn> {
  try {
    const session = await auth() 
    if (!session?.user?.id) {
      console.log('Session not found');  
      return {
        success: false,
        error: TagErrors.SESSION_NOT_FOUND
      }
    }
  
    const linksAndTags: InsertLinksTags[] = tags.map(tagId => ({tagId, linkId}))
  
    await db.transaction(async (tx) => {
      await tx.insert(linksTags).values(linksAndTags)
    })

    return {
      success: true,
      error: '',
    }
  } catch (error) {
    console.log('ERROR ADDING TAG', error);
  
    return {
      success: false,
      error: TagErrors.ADD_TAGS_ERROR
    }
  } 
}

export type UpdateTagProps = {
  prevTags: string[],
  newTags: string[],
  linkId: string
}

export async function updateLinksTags ({ prevTags, newTags, linkId }: UpdateTagProps): Promise<TagBaseReturn> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      console.log('Session not found');
      return {
        success: false,
        error: TagErrors.SESSION_NOT_FOUND
      }
    }

    // It defines which tags are going to be removed and which don't
    const editionTags = {
      toAdd: newTags.filter( (tag) => !prevTags.includes(tag) ),
      toDelete: prevTags.filter( (tag) => !newTags.includes(tag) ),
      toKeep : prevTags.filter( (tag) => newTags.includes(tag) )
    }

    await db.transaction(async (tx) => {
      await tx.delete(linksTags)
        .where(and(
          eq(linksTags.linkId, linkId),
          inArray(linksTags.tagId, editionTags.toDelete)
        ))

      if (editionTags.toAdd.length > 0) {
        await tx.insert(linksTags)
          .values(editionTags.toAdd
            .map( tag => ({tagId: tag,linkId}) )
          )
      }
    })
        
    revalidatePath('/dashboard')
    return {success: true, error: ''}

  } catch (error) {
    console.error("ERROR EDITING TAG", error);

    return {
      success: false,
      error: TagErrors.UPDATE_ERROR
    }
  }
}

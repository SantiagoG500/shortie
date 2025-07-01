'use server'

import { db } from '@/db/client'
import { InsertLinksTags, linksTags, SelectTags, tags } from '@/db/db-schemas'
import { CreateTagSchema, EditLinkSchema } from '@/schemas/schema'
import { generateCUID2 } from '@/utils/cuid2'
import { and, eq, inArray } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { hasUser } from '@/utils/actions'
import { SessionErrors, TagErrors } from './types'

type TagAndSessionErrorValues = TagErrors | SessionErrors;
type TagBaseReturn = {
  success: boolean
  error: TagAndSessionErrorValues | ''
};

/**
 * **Database request (Create a new tag)**
 * 
 * - Requires the **user to be authenticated** 
 * 
 * @returns a promise that resolves to a {@link TagBaseReturn} object.
 * @param tagData - Data used to create the new tag, validated using {@link CreateTagSchema}.
 * 
 * @see {@link CreateTagSchema}
 * @see {@link TagBaseReturn}
 */
export async function createTag(tagData: CreateTagSchema): Promise<TagBaseReturn> {
  try {
    const { session, success: sessionSuccess, error } = await hasUser()
    const userId = session?.user?.id
    const { success, data } = CreateTagSchema.safeParse(tagData)
    
    if (!session || !sessionSuccess || !userId) {
      return {
        success: false,
        error
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
      userId
    }
    
    revalidatePath('/dashboard')
    await db.insert(tags).values(fullTagData)

    return {
      success: true,
      error: ''
    }
  } catch (error) {
    console.error('ERROR WHEN CREATING TAG: ', error)

    return {
      success: false,
      error: TagErrors.SUBMIT_ERROR
    }
  }
}

export type UpdateTagProps = {tagData: SelectTags, newTagData: CreateTagSchema}
/**
 * **Database request (Update a tag from a user)**
 * - Requires the **user to be authenticated** 
 * 
 * @returns A promise that resolves to a {@link TagBaseReturn} indicating success or failure.
 * @param tagData - The current tag data to be updated. See {@link SelectTags}.
 * @param newTagData - The new data for the tag, validated against {@link CreateTagSchema}.
 *
 * @see {@link UpdateTagProps}
 * @see {@link TagBaseReturn}
 */
export async function updateTag({tagData, newTagData}: UpdateTagProps): Promise<TagBaseReturn> {
  try {
    const { session, success: sessionSuccess, error } = await hasUser()
    const { success } = CreateTagSchema.safeParse(newTagData)
    
    if (!sessionSuccess || !session) { 
      return {
        success: false,
        error
      }
    }

    if (!success) {
      return {
        success: false,
        error: TagErrors.NOT_VALID_DATA
      }
    }

    await db.update(tags)
      .set(newTagData)
      .where( eq(tags.id, tagData.id) )
      
    revalidatePath('/dashboard')

    return {
      success: true,
      error: ''
    }
  } catch (error) {    
    return {
      success: false,
      error: TagErrors.UPDATE_ERROR
    }
  }
}

export type DeleteTagProps = {tag: SelectTags}
/**
 * **Database request (Delete a tag from a user)**
 * 
 * - Requires the **user to be authenticated** 
 * 
 * @returns A promise that resolves to a {@link TagBaseReturn} indicating the result.
 * @param tag - The tag to delete. See {@link SelectTags}.
 *
 * @see {@link TagBaseReturn}
 */
export async function deleteTag({ tag }: DeleteTagProps): Promise<TagBaseReturn>  {
  try {
    const { session, success, error } = await hasUser()
    const userId = session?.user?.id

    if (!success || !userId) {
      return {
        success: false,
        error
      } 
    }

    await db.delete(tags)
      .where( eq(tags.id, tag.id) )
    
    revalidatePath('/dashboard')

    return {
      success: true,
      error: ''
    }
  } catch (error) {
    console.error('ERROR DELETING TAG', error);
    
    return {
      success: false,
      error: TagErrors.DELETION_ERROR,
    }
  }
}

/**
 * **Database request (Adds tags to a link of an authenticated user.)**
 * 
 * - Requires the **user to be authenticated** 
 * 
 * @returns A promise that resolves to a {@link TagBaseReturn} indicating success or failure.
  * @param tags - An array of tag IDs to be added to the link.
 * @param linkId - The ID of the existing link to which tags will be added.
 *
 * @see {@link TagBaseReturn}
 */
export async function addTags({ tags, linkId }: { tags: string[], linkId: string }): Promise<TagBaseReturn> {
  try {
    const { session, success, error } = await hasUser()
    const userId = session?.user?.id

    if (!success || !userId) {
      return {
        success,
        error
      } 
    }

    const linksAndTags: InsertLinksTags[] = tags.map(tagId => ({tagId, linkId, userId: userId}))

    await db.transaction(async (tx) => {
      await tx.insert(linksTags).values(linksAndTags)
    })

    return {
      success: true,
      error: ''
    }

  } catch (error) {
    console.log('ERROR ADDING TAG', error);
  
    return {
      success: false,
      error: TagErrors.ADD_TAGS_ERROR
    }
  } 
}

export type getTagsReturn = TagBaseReturn & { data?: SelectTags[] }
/**
 * **Database request (Gets all tags from a user)**
 * 
 * - Requires the **user to be authenticated** 
 * 
 * @returns a promise that resolve to an object: {@link getTagsReturn}
 * 
 * @see {@link selectedTags}
 * @see {@link getTagsReturn}
 */
export async function getTags(): Promise<getTagsReturn> {
  try {
    const { session, success, error } = await hasUser()
    const userId = session?.user?.id
    if (!success || !session || !userId) {
      return {
        success,
        error
      }
    }

    const result = await db.select()
      .from(tags).where(eq(tags.userId, userId))

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

export type UpdateLInksTagsProps = {
  prevTags: string[],
  newTags: string[],
  linkId: string
}
/**
 * **Database request (Edits tags owned by a user)**
 * 
 * - Requires the **user to be authenticated** 
 * 
 * @param prevTags - An array of tag IDs that were previously associated with the link.
 * @param newTags - An array of new tag IDs to associate with the link.
 * @param linkId - The ID of the link being updated.
 * @returns A promise that resolves to a {@link TagBaseReturn} indicating success or failure.
 *
 * @see {@link UpdateLinksTagsProps}
 * @see {@link TagBaseReturn}
 */
export async function updateLinksTags ({ prevTags, newTags, linkId }: UpdateLInksTagsProps): Promise<TagBaseReturn> {
  try {
    const { success, session, error } = await hasUser()
    const userId = session?.user?.id
    
    if (!success || !session || !userId) {
      console.log('NO SESSION FOUND');
      
      return {
        success,
        error
      }
    }
        
    if (!prevTags) {
      const { error, success } = await addTags({tags: newTags, linkId})
      
      revalidatePath('/dashboard')
      return { success, error }
    }

    // It defines which tags are going to be removed and which don't
    const toAdd = newTags.filter(tag => !prevTags.includes(tag))
    const toDelete = prevTags.filter(tag => !newTags.includes(tag))
  
    await db.transaction( async (tx) => {
      if (toDelete.length > 0) {    
        await tx.delete(linksTags)  
          .where(and(
            eq(linksTags.linkId, linkId),
            inArray(linksTags.tagId, toDelete)
          ))
      }

      if (toAdd.length > 0) {
        const tagsToAdd = toAdd.map(tagId => ({
          tagId,
          linkId,
          userId
        }))

        await tx.insert(linksTags).values(tagsToAdd)
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

/**
 * **Database request (Deletes all tags from a user)**
 * 
 * - Requires the **user to be authenticated** 
 * 
 * @returns A promise that resolves to a {@link TagBaseReturn} indicating success or failure.
 *
 * @see {@link TagBaseReturn}
 */
export async function deleteTags(): Promise<TagBaseReturn> {
  try {
    console.log('DELETE TAGS');
    
    const { success, session, error } = await hasUser()
    const userId = session?.user?.id

    if (!success || !session || !userId) {
      return {
        success: false,
        error
      }
    }
    
    await db.delete(tags)
      .where( eq(tags.userId, userId) )

    revalidatePath('/dashboard')

    return {
      success: true,
      error: ''
    }
    
  } catch (error) {
    return {
      success: false,
      error: TagErrors.DELETION_ERROR
    }
  }
}

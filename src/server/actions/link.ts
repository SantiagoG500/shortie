  'use server'
import { auth } from '@/auth';
import { db } from '@/db/client';

import { links, linksTags, SelectLinks, SelectTags, tags } from '@/db/db-schemas';
import { CreateLinkSchema, EditLinkSchema } from '@/schemas/schema'
import { generateCUID2 } from '@/utils/cuid2';
import { revalidatePath } from 'next/cache';
import { and, eq, inArray, like, sql } from 'drizzle-orm';
import { getTags } from './tag';

enum LinkErrors {
  SESSION_NOT_FOUND = 'User session not found',
  NOT_VALID_DATA = 'Data is not valid to be sent to the database',
  SUBMIT_ERROR = 'Error submiting link data in Database',
  DELETION_ERROR = 'Link deletion failed',
  QUERY_ERROR = 'Error fetching link data',
  UPDATE_ERROR = 'Error updating link data'
}

export type LinkBaseReturn = { success: boolean; error?: LinkErrors | ''; }
type createLinkResult = LinkBaseReturn & { linkId?: string}

/**
 * **Database request (create a link)**
 * 
 * - Requires the **user to be authenticated**
 * 
 * @param linkData an object that satisfies the needs of {@link CreateLinkSchema}
 * @returns a promise that resolve to an object: {@link createLinkResult}
 * 
 * @see {@link SelectLinks}
 * @see {@link CreateLinkSchema}
 * @see {@link LinkBaseReturn}
 * 
 */
export async function createLink(linkData: CreateLinkSchema): Promise<createLinkResult> {  
  try {
    const session = await auth()
    const { success, data } = CreateLinkSchema.safeParse(linkData)
    
    if (!session?.user?.id) {
      return {
        success: false,
        error: LinkErrors.SESSION_NOT_FOUND
      }
    }

    // When validation is unsuccessful
    if (!success) {
      return {
        success,
        error: LinkErrors.NOT_VALID_DATA
      }
    }
    
    const fullLinkData: SelectLinks = {
      ...data,
      id: generateCUID2(),
      userId: session.user.id,
      clicks: 0,
      createdAt: new Date().toISOString(),
      recentClick: '', 
    }
    
    
    const returningData = await db.insert(links).values(fullLinkData).returning()
    const { id } = returningData[0]

    revalidatePath('/dashboard')

    return {success: true, error: '', linkId: id}
  } catch (error) {
    return {
      success: false,
      error: LinkErrors.SUBMIT_ERROR
    }
  }
  
}


type UpdateLinkProps = {linkData: SelectLinks, newLinkData: EditLinkSchema}
/**
 * **Database request (update an existing link)**
 * 
 * - Requires the **user to be authenticated**
 * 
 * 
 * @param linkData - Link data provided by the Database: {@link SelectLinks}
 * @param newLinkData - An object that satisfies the needs of {@link EditLinkSchema}
 * @returns an object indicating if the operation was succesful or not {@link LinkBaseReturn}
 *  
 * @see {@link SelectLinks}
 * @see {@link EditLinkSchema}
 * @see {@link UpdateLinkProps}
 */
export async function updateLink({linkData, newLinkData}: UpdateLinkProps): Promise<LinkBaseReturn> {
  try {
    const session = await auth()
    const { success } = EditLinkSchema.safeParse(linkData)
    
    if (!session?.user?.id) {

      return {
        success: false,
        error: LinkErrors.SESSION_NOT_FOUND
      }
    }

    // When validation is unsuccessful
    if (!success) {
      return {
        success: false,
        error: LinkErrors.NOT_VALID_DATA
      }
    }

    await db.update(links)
      .set(newLinkData)
      .where(eq(links.id, linkData.id))
    revalidatePath('/dashboard')
    
    return {
      success: true,
      error: ''
    }
  } catch (error) {
    return {
      success: false,
      error: LinkErrors.UPDATE_ERROR
    }
  }
}

/**
 * **Database request (delete a link)**
 * 
 * - Requires the **user to be authenticated** 
 * 
 * 
 * @param link - Link data provided by the database {@link SelectLinks}
 * @returns an object indicating if the operation was succesful or not {@link LinkBaseReturn}
 * 
 * @see {@link SelectLinks}
 * @see {@link LinkBaseReturn}
 */
export async function deleteLink(link: SelectLinks): Promise<LinkBaseReturn> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: LinkErrors.SESSION_NOT_FOUND
      }
    }

    await db.transaction(async (tx) => {
      await tx.delete(linksTags)
        .where( eq(linksTags.linkId, link.id) )
        
      await tx.delete(links)
        .where( eq(links.id, link.id) )
    })
      
    revalidatePath('/dashboard')
    
    return {success: true, error: ''}
  } catch (error) {
    return {
      success: false,
      error: LinkErrors.DELETION_ERROR
    }
  }
}

type GetLinkReturn = LinkBaseReturn & {data?: SelectLinks | null}
/**
 * **Database request (get a singular link)**
 * 
 * - Requires the **user to be autenticated**
 * 
 * @returns a promise that resolve to an object: {@link GetLinkReturn}
 * @param linkId - Id of the link that is going to be requested
 * 
 * @see {@link GetLinkReturn}
 * @see {@link LinkBaseReturn}
 */
export async function getLink({linkId}: {linkId: string}): Promise<GetLinkReturn> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: LinkErrors.SESSION_NOT_FOUND
      }
    }

    const linkQuery = await db.select().from(links)
      .where(eq(links.id, linkId))
      
    const data = linkQuery[0]

    return {
      success: true,
      error: '',
      data
    }
  } catch (error) {
    return {
      success: true,
      error: LinkErrors.QUERY_ERROR
    }
  }

}

type GetLinksReturn = LinkBaseReturn & { data?: SelectLinks[] | null }
/**
 * **Database request (get an Array of links)**
 * 
 * - Requires the **user to be authenticated** 
 * 
 * @returns a promise that resolve to an object: {@link GetLinksReturn}
 * @param {number} [limit] - Maximum number of links to return (defaults to 10)
 * @param {number} [offset] - Number of links to skip (defaults to 0)
 * 
 * @see {@link SelectLinks}
 * @see {@link LinkBaseReturn}
 * @see {@link GetLinksReturn}
*/
export async function getLinks({limit, offset}: {limit?: number, offset?: number}): Promise<GetLinksReturn> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: LinkErrors.SESSION_NOT_FOUND
      }
    }

    let result  = await db.select()
      .from(links).where(eq(links.userId, session.user.id))
      .limit(limit ?? 10)
      .offset(offset ?? 0)
    
    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.log('Error querying links', error);
    return {
      success: false,
      error: LinkErrors.QUERY_ERROR
    }
  }
  
}

type GetLinksAndTagsProps = { searchTitle?: string, selectedTags?: string[]}
type GetLinksAndTagsReturn = LinkBaseReturn & {links?: LinksAndTags[], tags?: SelectTags[]}
export type LinksAndTags  = SelectLinks & {
  tags: string[]
}
/**
 * **Database request (get links and tags toghether)**
 * - Requires the **user to be authenticated**
 * 
 * @returns a promise that resolve to an object: {@link GetLinksAndTagsReturn}
 * @param searchTitle - search made by the user: **Searches results by title**
 * @param selectedTags - Search made by the user: **Searches results by the tags made by user**
 * 
 * @see {@link LinkBaseReturn}
 * @see {@link GetLinksAndTagsReturn}
 * @see {@link GetLinksAndTagsProps}
 */
export async function getLinksAndTags({searchTitle, selectedTags}: GetLinksAndTagsProps) : Promise<GetLinksAndTagsReturn> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      console.log('Session not found');
      
      return {
        success: false,
        error: LinkErrors.SESSION_NOT_FOUND
      }
    } 
    
    const query = await db.select({
        id: links.id,
        title: links.title,
        url: links.url,
        description: links.description,
        slug: links.slug,
        createdAt: links.createdAt,
        clicks: links.clicks,
        recentClick: links.recentClick,
        userId: links.userId,

        tags: sql<string>`
          CASE 
            WHEN EXISTS (
              SELECT 1 FROM links_tags lt WHERE lt.linkId = links.id
            ) THEN json_group_array( ${tags.id})
            ELSE NULL
          END
        `
    })  
      .from(links)
      .leftJoin(linksTags, eq(links.id, linksTags.linkId))
      .leftJoin(tags, eq(linksTags.tagId, tags.id))
      .where(
        and(
          eq(links.userId, session.user.id),
          ...(searchTitle ? [like(links.title, `%${searchTitle}%`)] : []),
          ...(selectedTags?.length ? [inArray(tags.id, selectedTags)] : [])
        )
      )
      .groupBy(links.id)
      .limit(20).offset(0)


    const linksFromUser = query.map((obj) => {
      return { ...obj, tags: JSON.parse(obj.tags) }
    }) as LinksAndTags[]
    const tagsFromUser = await getTags()
    
    return {
      success: true,
      links: linksFromUser,
      tags: tagsFromUser.data
    }
    
  } catch (error) {
    return {
      success: false,
      error: LinkErrors.QUERY_ERROR
    }
  }
}

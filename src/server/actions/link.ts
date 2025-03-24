  'use server'
import { auth } from '@/auth';
import { db } from '@/db/client';

import { links, SelectLinks } from '@/db/db-schemas';
import { CreateLinkSchema, DeleteLinkSchema, EditLinkSchema } from '@/schemas/schema'
import { generateCUID2 } from '@/utils/cuid2';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

enum LinkErrors {
  SESSION_NOT_FOUND = 'User session not found',
  NOT_VALID_DATA = 'Data is not valid to be sent to the database',
  SUBMIT_ERROR = 'Error submiting link data in Database',
  DELETION_ERROR = 'Link deletion failed',
  QUERY_ERROR = 'Error fetching link data',
  UPDATE_ERROR = 'Error updating link data'
}
export type LinkBaseReturn = { success: boolean; error?: LinkErrors | ''; }

/**
 * **Database request (create a link)**
 * 
 * - Requires the **user to be authenticated**
 * 
 * @param linkData an object that satisfies the needs of {@link CreateLinkSchema}
 * @returns an object indicating if the operation was succesful or not {@link LinkBaseReturn}
 * 
 * @see {@link SelectLinks}
 * @see {@link CreateLinkSchema}
 * @see {@link LinkBaseReturn}
 * 
 */
export async function createLink(linkData: CreateLinkSchema): Promise<LinkBaseReturn> {  
  try {
    const session = await auth()
    const { success, data } = CreateLinkSchema.safeParse(linkData)
    
    if (!session?.user?.id) {
      console.log('Session not found');

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
    
    console.log({fullLinkData});
    
    await db.insert(links).values(fullLinkData)
    revalidatePath('/dashboard')

    return {success: true, error: ''}
  } catch (error) {
    console.log('Error submition a link');
    return {
      success: false,
      error: LinkErrors.SUBMIT_ERROR
    }
  }
  
}


type UpdateLinkProps = {linkData: SelectLinks, newLinkData: EditLinkSchema}
/**
 * **Databse request (update an existing link)**
 * 
 * - Requires the **user to be authenticated**
 * 
 * 
 * @param linkData - Link data provided by the Database
 * @param newLinkData - An object that satisfies the needs of {@link EditLinkSchema}
 * @returns an object indicating if the operation was succesful or not {@link LinkBaseReturn}
 *  
 * @see {@link SelectLinks}
 * @see {@link EditLinkSchema}
 * @see {@link UpdateLinkProps}
 */
export async function updateLink({linkData, newLinkData}: UpdateLinkProps): Promise<LinkBaseReturn> {
  console.log('update link action', {linkData, newLinkData});
  try {
    const session = await auth()
    const { success } = EditLinkSchema.safeParse(linkData)
    
    if (!session?.user?.id) {
      console.log('Session not found');

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
      console.log('Session not found');

      return {
        success: false,
        error: LinkErrors.SESSION_NOT_FOUND
      }
    }

    await db.delete(links)
      .where( eq(links.id, link.id) )
      
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
 * **Databse request (get a singular link)**
 * 
 * - Requires the **user to be autenticated**
 * 
 * @param linkId - Id of the link that is going to be requested
 * 
 * @returns an object Object containing:
 *  - success: boolean indicating operation success
 *  - error: error message if any
 *  - data: link data or null if not found
 * 
 * @see {@link GetLinkReturn}
 * @see {@link LinkBaseReturn}
 */
export async function getLink({linkId}: {linkId: string}): Promise<GetLinkReturn> {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      console.log('Session not found');

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

export type GetLinksReturn = LinkBaseReturn & { data?: SelectLinks[] | null }
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
      console.log('Session not found');

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
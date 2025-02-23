'use server'

import { db } from '@/db/client'
import { links } from '@/db/db-schemas'
import { LinkSchema } from '@/schemas/schema'
import { isCuid } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'

export type ResponseMessage = 
  'Link found Succesfully' |
  'Link not found'         |
  'Database Error'         |
  'Invalid Slug Format'    |
  'An unexpected error has occured'

export interface urlFormDbResult {
  error: boolean,
  message: ResponseMessage,
  link?: LinkSchema
  timeStamp: number
}

function ReturnResult(error: boolean, message:ResponseMessage, link?: LinkSchema): urlFormDbResult {
  return {
    error,
    message,
    timeStamp: Date.now(),
    link
  }
}

export async function getOneUrlFromDb(slug: string): Promise<urlFormDbResult> {
  const isSlugCuid = isCuid(slug)
  if (!isSlugCuid) return ReturnResult(true, 'Invalid Slug Format')

  try {
    const res = await db.select()
      .from(links)
      .where( eq(links.slug, slug) )
      
    const link = res.pop() as LinkSchema | undefined  
    if (!link) return ReturnResult(true, 'Link not found')

    return ReturnResult(false, 'Link found Succesfully', link)
  } catch (error) {
    return ReturnResult(true, 'Database Error')
  }
}


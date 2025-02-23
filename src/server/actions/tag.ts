'use server'

import { db } from '@/db/client'
import { tags } from '@/db/db-schemas'
import { CreateTagSchema, tagSchema } from '@/schemas/schema'
import { generateCUID2 } from '@/utils/cuid2'

export async function createTag(formData: FormData) {
  try {
    console.log('sending data...');

    const tagData: CreateTagSchema = {
      title: formData.get('title') as string
    }

    const fullDataForRequest: tagSchema = {
      title: tagData.title,
      id: generateCUID2(),
      userId:'gqmsghrx6csf49uckqdfw1sr'
    }
    
    await db.insert(tags).values(fullDataForRequest)
  } catch (error) {
    console.error('ERROR WHEN CREATING TAG: ', error)
  }
}
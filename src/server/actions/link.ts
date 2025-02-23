'use server'
import { db } from '@/db/client';
import { links } from '@/db/db-schemas';
import { CreateLinkSchema, LinkSchema } from '@/schemas/schema'
import { generateCUID2 } from '@/utils/cuid2';

export async function createLink(formData: FormData) {
  try {
    console.log('Sending data...');
    
    const linkData: CreateLinkSchema = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      url: formData.get('url') as string,
      slug: formData.get('slug') as string,
    }

    const fullDataForRequest: LinkSchema = {
      title: linkData.title,
      description: linkData.description,
      url: linkData.url,
      slug: linkData.slug,
      clicks: 0,
      recentClick: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      id: generateCUID2(),
      userId: 'gqmsghrx6csf49uckqdfw1sr'
    }
  
    console.log({fullDataForRequest});
    await db.insert(links).values(fullDataForRequest)
  } catch (error) {
    console.error('ERROR WHEN CREATING A LINK: ', error)
  }
}

export async function updateLink(link: CreateLinkSchema) {
}
export async function deleteLink(link: CreateLinkSchema) {
}
export async function getLink() {
}

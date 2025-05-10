'use server'

import { db } from '@/db/client';
import { InsertUser, users } from '@/db/db-schemas';
import { CreateAuthSchema } from '@/schemas/schema';
import { eq } from 'drizzle-orm';

export async function createUser(authData: CreateAuthSchema) {
  try {
    await db.insert(users).values(authData).returning()
    const user = await db.insert(users).values(authData).returning()

    return user
  } catch (error) {
    console.error('Error When trying to create a user: ', error);
  }
}

export async function getUser(authData: CreateAuthSchema): Promise<InsertUser | null>  {
    try {
      console.log('Getting data...'); 
      const user =  await db.select().from(users)
        .where(eq(users.email, authData.email))
        
      return user[0]
    } catch (error) {
      console.log('Error when searching for a user', error)
      return null
    }
}
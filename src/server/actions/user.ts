'use server'

import { db } from '@/db/client';
import { InsertUser, users } from '@/db/db-schemas';
import { CreateAuthSchema } from '@/schemas/schema';
import { hasUser } from '@/utils/actions';
import { eq } from 'drizzle-orm';
import { SessionErrors, UserErrors } from './types';

type UserAndSessionErrorValues = UserErrors | SessionErrors
type userBaseReturn = {
  success: boolean
  error: UserAndSessionErrorValues | ''
}

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

/**
 * **Database request (deletes an user)**
 * 
 * - Requires the **user to be authenticated**
 * 
 * @returns a promise that resolve to an object: {@link userBaseReturn}
 * @see {@link userBaseReturn}
 */
export async function deleteUser(): Promise<userBaseReturn> {
  try {
    const { session, error, success: sessionSuccess } = await hasUser()
    const userId = session?.user?.id

    if (!session || !sessionSuccess || !userId) {
      return {
        success: false,
        error: SessionErrors.SESSION_NOT_FOUND
      }
    }
    
    await db.delete(users)
      .where( eq(users.id, userId) )

    return {
      success: true,
      error: ''
    }

  } catch (error) {
    return {
      success: false,
      error: UserErrors.NOT_FOUND
    }
  }
}
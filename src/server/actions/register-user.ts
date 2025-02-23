'use server'

import { createUser, getUser } from './user'
import { validateUser } from '@/schemas/validate-schemas'

type RegisterResponse = {
  error?: string;
  user?: {
    id: string;
    email: string;
  };
}

export async function registerData(formData: FormData): Promise<RegisterResponse> {
  if (typeof window !== 'undefined') {
    throw new Error('This function can only be called from the server')
  }
  
  const { errors, success, data } = validateUser(formData)

  if (!success) return {error: 'Invalid Data'}
  
  try {
    const { email, password } = data
    
    const user = await createUser({email, password})
    if (user) { return {error: 'User already exists'} }
    
    return { user }
  } catch (error) {
    console.error('Resigration error: ', error);
    return {error: 'Failed to create user'}
  }
  

}
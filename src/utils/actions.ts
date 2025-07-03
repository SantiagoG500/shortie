'use server'

import { auth } from '@/auth'
import { Session } from 'next-auth'
import { SessionErrors } from "@/server/actions/types";

type getUserSessionReturn = {
  success: boolean
  error: SessionErrors | ''
  session: Session | null
};

export async function getUserSession(): Promise<getUserSessionReturn> {
  const session = await auth()

  if (!session?.user) {
    return {
      success: false,
      error: SessionErrors.SESSION_NOT_FOUND,
      session
    }
  }

  return {
    success: true,
    session,
    error: ''
  }
}
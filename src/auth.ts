import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './db/client';


import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import { getUser } from './server/actions/user';
import { CreateAuthSchema } from './schemas/schema';
import { InsertUser } from '@/db/db-schemas';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGGLE_SECRET as string
    }),
    Credentials({
      async authorize (credentials) {
        console.log('Starting authorize flow...');
        
        const parsedCredentials = CreateAuthSchema.safeParse(credentials)
        if (!parsedCredentials.success) {
          console.error('Invalid credentials: ');
          return null          
        }

        try {
          console.log('Fetching user...');
          
          const {email, password} = parsedCredentials.data
          const user = await getUser({email, password}) as InsertUser
          
          if (!user) {
            console.log('No user found with email:', email);
            return null;
          }
    
          if (!user.password) {
            console.log('User found but has no password');
            return null;
          }
          
          return user
        } catch (error) {
          console.error('Auth Credentials error', error);
          return null
        }
      }
    })
  ],

})
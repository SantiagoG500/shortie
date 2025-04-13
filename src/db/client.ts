import { drizzle } from 'drizzle-orm/libsql';
import { accounts, authenticators, links, linksTags, sessions, tags, users, verificationTokens } from './db-schemas';

export const db = drizzle({connection: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN!, 
  },
  schema: {
    users,
    accounts,
    sessions,
    verificationTokens,
    authenticators,
    links,
    tags,
    linksTags,
  }
})





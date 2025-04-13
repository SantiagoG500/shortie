import { generateCUID2 } from '@/utils/cuid2';
import { relations } from 'drizzle-orm';
import { sqliteTable as table} from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core"
import { AdapterAccountType } from 'next-auth/adapters';

// #################################################################################
export const users = table("user", {
  id: t.text("id")
    .primaryKey()
    .$defaultFn(() => generateCUID2()),
  name: t.text("name"),
  email: t.text("email").unique(),
  password: t.text('password'),
  emailVerified: t.integer("emailVerified", { mode: "timestamp_ms" }),
  image: t.text("image"),
})
 
export const accounts = table(
  "account",
  {
    userId: t.text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: t.text("type").$type<AdapterAccountType>().notNull(),
    provider: t.text("provider").notNull(),
    providerAccountId: t.text("providerAccountId").notNull(),
    refresh_token: t.text("refresh_token"),
    access_token: t.text("access_token"),
    expires_at: t.integer("expires_at"),
    token_type: t.text("token_type"),
    scope: t.text("scope"),
    id_token: t.text("id_token"),
    session_state: t.text("session_state"),
  },
  (account) => {
    return [
      t.primaryKey({columns: [account.provider, account.providerAccountId]})
    ]
  }
)
 
export const sessions = table("session", {
  sessionToken: t.text("sessionToken").primaryKey(),
  userId: t.text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: t.integer("expires", { mode: "timestamp_ms" }).notNull(),
})
 
export const verificationTokens = table(
  "verificationToken",
  {
    identifier: t.text("identifier").notNull(),
    token: t.text("token").notNull(),
    expires: t.integer("expires", { mode: "timestamp_ms" }).notNull(),
  },

  (verificationToken) => {
    return [
      t.primaryKey({columns: [verificationToken.identifier, verificationToken.token]})
    ]
  }
)
 
export const authenticators = table(
  "authenticator",
  {
    credentialID: t.text("credentialID").notNull().unique(),
    userId: t.text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: t.text("providerAccountId").notNull(),
    credentialPublicKey: t.text("credentialPublicKey").notNull(),
    counter: t.integer("counter").notNull(),
    credentialDeviceType: t.text("credentialDeviceType").notNull(),
    credentialBackedUp: t.integer("credentialBackedUp", {
      mode: "boolean",
    }).notNull(),
    transports: t.text("transports"),
  },

  (authenticator) => {
    return [
      t.primaryKey({columns: [authenticator.userId, authenticator.credentialID]})
    ]
  }
)
// #################################################################################

export const links = table('links', {
  title: t.text('title', {length: 20}).notNull(),
  id: t.text('id', {length: 24}).primaryKey().notNull(),
  slug: t.text('slug', {length: 24}).notNull(),
  description: t.text('description', {length: 100}),
  url: t.text('url').notNull(),
  createdAt: t.text('created_at').notNull(),
  clicks: t.integer('clicks', {mode: 'number'}),
  recentClick: t.text('recent_click'),
  userId: t.text('user_id').references(() => users.id).notNull()
})

export const tags = table('tags', {
  title: t.text('title', {length: 20}).unique(),
  id: t.text('id', {length: 24}).primaryKey().notNull(),
  userId: t.text('user_id').references(() => users.id).notNull()
})

export const tagsRelations = relations(tags, ({one, many}) => {
  return {
    links: many(links),
    user: one(users, {
      fields: [tags.userId],
      references: [users.id]
    })
  }
})

export const linksTags = table('links_tags',{
  linkId: t.text().notNull().references(() =>  links.id),
  tagId: t.text().notNull().references(() =>  tags.id),
}, (table) => {
  return [
    t.primaryKey({columns: [table.linkId, table.tagId]})
  ]
})

export type InsertUser = typeof users.$inferInsert

export type InsertLinks = typeof links.$inferInsert
export type SelectLinks = typeof links.$inferSelect

export type SelectTags = typeof tags.$inferSelect
export type InsertTags = typeof tags.$inferInsert

export type SelectLinksTags = typeof linksTags.$inferSelect
export type InsertLinksTags = typeof linksTags.$inferInsert
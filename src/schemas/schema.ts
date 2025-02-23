import { z } from "zod";


export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  emailVerified: z.number(),
  image: z.string(),
})

export const LinkSchema = z.object({
  title: z.string(),
  id: z.string(),
  slug: z.string(),
  description: z.string(),
  url: z.string(),

  createdAt: z.string(),
  clicks: z.number(),
  recentClick: z.string(),
  userId: z.string(),
})

export const AuthSchema = z.object({
  email: z.string(),
  password: z.string()
})


export const CreateLinkSchema = z.object({
  title: z.string().min(1, {message: 'Link title cannot be empty'}),
  slug: z.string()
    .max(23, {message: 'Slug cannot be larger than 23 characters long'})
    .min(7, {message: 'Slug hast to be 7 characters long at least'}),

  description: z.string()
    .max(100, {message: 'Description cannot larger than 100 characters long'}),

  url: z.string()
    .url({message: 'URL has to have in it http:// or https://'})
    .regex(
      /^(?!.*(?:http|https):\/\/(?:shortie)\.vercel\.app).*$/,
      {message: "You cant't use the shortie domain to redirect"}
    )
    .regex(
      /^\S+$/,
      {message: "Blank spaces are not allowed"}
    ),
  })
  .refine(
    data => data.slug !== data.url,
    {
      message: 'Original Link and slug cannot be the same', 
      path:['url']
    }
  )

export const tagSchema = z.object({
  title: z.string(),
  id: z.string(),
  userId: z.string()
})

export const CreateTagSchema = z.object({
  title: z.string()
  .min(1, {message: 'Title cannot be empty'})
  .max(20, {message: 'Title cannot be longer than 20 characters long'}),
})

export const CreateAuthSchema = z.object({
  email: z.string()
    .min(1, {message:  'Email is required'})
    .email('invalid Email'),
  password: z.string()
    .min(1, {message: 'Password cannot not be empty'})
    .min(8, {message: 'Password cannot be shorter than 8 characters'})
    .max(30, {message: 'Password cannot be larger than 30 characters'})
})


  
export type UserSchema = z.TypeOf<typeof UserSchema>  
export type LinkSchema = z.TypeOf<typeof LinkSchema>  
export type CreateLinkSchema = z.TypeOf<typeof CreateLinkSchema>

export type tagSchema = z.TypeOf<typeof tagSchema>
export type CreateTagSchema = z.TypeOf<typeof CreateTagSchema>
export type AuthSchema = z.TypeOf<typeof AuthSchema>
export type CreateAuthSchema = z.TypeOf<typeof AuthSchema>
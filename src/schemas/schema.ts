import { z } from "zod";

export const CreateLinkSchema = z.object({
  title: z.string()
    .min(1, {message: 'Link title cannot be empty'})
    .max(20, {message: 'Link title cannot larger than 20 characters'}),
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
  selectedTags: z.set(z.string())
    .refine((set) => set?.size <= 3, {message:  'Maximun 3 tags allowed'})
    .optional()
})
.refine(
  (link) => link.slug !== link.url, 
  {
    message: 'Original Link and slug cannot be the same', 
    path:['url']
  }
)
export const EditLinkSchema = z.object({
  title: z.string()
    .max(20, { message: 'Link title cannot be larger than 20 characters' })
    .optional()
    .transform((val) => val === "" ? undefined : val),

    slug: z.string()
      .max(23, { message: 'Slug cannot be larger than 23 characters long' })
      .min(7, { message: 'Slug has to be at least 7 characters long' })
      .optional()
      .or(z.literal('')),

  description: z.string()
    .max(100, { message: 'Description cannot be larger than 100 characters long' })
    .optional()
    .transform((val) => val === "" ? undefined : val),

  url: z.union([
    z.string()
      .url({ message: 'URL must include http:// or https://' })
      .regex(/^(?!.*(?:http|https):\/\/(?:shortie)\.vercel\.app).*$/, { message: "You can't use the shortie domain to redirect" })
      .regex(/^\S+$/, { message: 'Blank spaces are not allowed' }),
    z.literal("") // Permite cadenas vacías
  ])
    .optional()
    .transform((val) => val === "" ? undefined : val),
  selectedTags: z.set(z.string())
    .refine((set) => set?.size <= 3, {message:  'Maximun 3 tags allowed'})
    .optional()
}).refine(
  (link) => !link.slug || !link.url || link.slug !== link.url,
  { message: 'Original Link and slug cannot be the same', path: ['url'] }
);

export const DeleteLinkSchema = z.object({
  title: z.string().min(1, {message: 'Title cannot be empty'}),
  confirmTitle: z.string(),
})
.refine(
  link => link.title === link.confirmTitle,
  {
    message: 'Title name does not match',
    path: ['title']
  }
)

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


export type CreateLinkSchema = z.TypeOf<typeof CreateLinkSchema>
export type DeleteLinkSchema = z.TypeOf<typeof DeleteLinkSchema>
export type EditLinkSchema = z.TypeOf<typeof EditLinkSchema>

export type CreateTagSchema = z.TypeOf<typeof CreateTagSchema>
export type CreateAuthSchema = z.TypeOf<typeof CreateAuthSchema>

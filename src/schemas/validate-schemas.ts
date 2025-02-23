import { AuthSchema, CreateLinkSchema, CreateTagSchema } from './schema';

export interface ValidateLinkErrors {
  title: string[];
  description: string[];
  url: string[];
  slug: string[];
}
export interface ValidateTagErrors {
  title: string[]
}
export interface validateUserErrors {
  email: string[],
  password: string[], 
}

export function validateLink (formData: FormData) {
  const linkData: CreateLinkSchema = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    slug: formData.get('slug') as string,
    url: formData.get('url') as string,
  }

  const parsingResult = CreateLinkSchema.safeParse(linkData)
  const formattedErrors = parsingResult.error?.format()
  const errors: ValidateLinkErrors = {
    title: formattedErrors?.title?._errors || [],
    description: formattedErrors?.description?._errors || [],
    url: formattedErrors?.url?._errors || [],
    slug: formattedErrors?.slug?._errors || [],
  }
  
  return {
    success: parsingResult.success,
    errors,
    data: linkData
  }
}


export function validateTag (formData: FormData) {
  const tagData: CreateTagSchema = {
    title: formData.get('title') as string
  }

  const parsingResult = CreateTagSchema.safeParse(tagData)

  const formattedErrors = parsingResult.error?.format()
  const errors: ValidateTagErrors = {
    title: formattedErrors?.title?._errors || []
  }

  return {
    success: parsingResult.success,
    errors,
    data: tagData
  }
}

export function validateUser(formData: FormData) {
  const authData: AuthSchema = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const parsingResult = AuthSchema.safeParse(authData)
  
  const formattedErrors = parsingResult.error?.format()
  const errors: validateUserErrors = {
    email:  formattedErrors?.email?._errors || [],
    password: formattedErrors?.password?._errors || []
  }

  return {
    success: parsingResult.success,
    errors,
    data: authData,
  }
}

import { createId, init, isCuid } from '@paralleldrive/cuid2'
export const createCustomCUID2 = ({length}: {length: number}) => {
  const customCUID2 =  init({length})
  return customCUID2()
}

export const generateCUID2 = (length?: number): string => {
  return length
    ? createCustomCUID2({length: 7})
    : createId()
}

export const isValidCUID = (val: string): boolean  => {
  const regex = /^[a-z0-9]+$/
  
  if (val && regex.test(val)) return true
  if (val.length >= 7 || val.length <= 24) return true


  return false
}
import { generateCUID2, isValidCUID } from '@/utils/cuid2';
import { expect, describe, it } from "vitest";

describe('generateCUID2', () => {
  it('Should generate a valid CUID2',() => {
    const cuid = generateCUID2()

    expect(cuid).not.toBeFalsy()
    expect(typeof cuid).toBe('string')

    expect(cuid.length).toBe(24)
  })
  
  it('Should generate a CUID2 with the specified length',() => {
    const cuid = generateCUID2(7)

    expect(cuid).not.toBeFalsy()
    expect(typeof cuid).toBe('string')

    expect(cuid.length).toBe(7)
  })
})

describe('isValidCUID', () => {

  it('It should be true when given an actual CUID2', () => {
    const str = 'ixq1dwk407p53cqqbr2p1ivc'
    const got = isValidCUID(str)

    expect(got).toBe(true)
  })
  it('It should be false when given an invalid CUID2', () => {
    const str = 'dashboard'
    const got = isValidCUID(str)

    expect(got).toBe(false)
  })
})

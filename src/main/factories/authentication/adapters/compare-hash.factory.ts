import { CompareHash } from '@/data/authentication/protocols'
import { BCryptAdapter } from '@/infra/authentication/criptography'

export const makeCompareHash = (salt: number): CompareHash => {
  return new BCryptAdapter(salt)
}

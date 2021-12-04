import { CreateHash } from '@/data/authentication/protocols'
import { BCryptAdapter } from '@/infra/authentication/criptography'

export const makeCreateHash = (salt: number): CreateHash => {
  return new BCryptAdapter(salt)
}

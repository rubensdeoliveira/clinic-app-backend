import { EncryptWithSecret } from '@/data/authentication/protocols'
import { JWTAdapter } from '@/infra/authentication/criptography'

export const makeEncryptWithSecret = (privateKey: string): EncryptWithSecret => {
  return new JWTAdapter(privateKey)
}

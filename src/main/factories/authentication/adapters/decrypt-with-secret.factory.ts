import { DecryptWithSecret } from '@/data/authentication/protocols'
import { JWTAdapter } from '@/infra/authentication/criptography'

export const makeDecryptWithSecret = (privateKey: string): DecryptWithSecret => {
  return new JWTAdapter(privateKey)
}

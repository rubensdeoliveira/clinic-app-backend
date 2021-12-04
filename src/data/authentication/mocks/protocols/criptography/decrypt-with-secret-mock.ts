import { DecryptWithSecret, EncryptModel } from '@/data/authentication/protocols'
import { mockEncryptModel } from '@/data/authentication/mocks'

export class DecryptWithSecretSpy implements DecryptWithSecret {
  token: string
  decryptedModel: EncryptModel = mockEncryptModel()

  async decrypt (token: string): Promise<EncryptModel> {
    this.token = token
    return this.decryptedModel
  }
}

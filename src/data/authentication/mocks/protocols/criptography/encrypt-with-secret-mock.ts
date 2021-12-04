import { EncryptWithSecret, EncryptModel } from '@/data/authentication/protocols'
import faker from 'faker'

export class EncryptWithSecretSpy implements EncryptWithSecret {
  params: EncryptModel
  experisIn: string
  token: string = faker.datatype.uuid()

  async encrypt (params: EncryptModel, experisIn: string): Promise<string> {
    this.experisIn = experisIn
    this.params = params
    return this.token
  }
}

import { CreateHash } from '@/data/authentication/protocols'
import faker from 'faker'

export class CreateHashSpy implements CreateHash {
  payload: string
  token: string = faker.datatype.uuid()

  async hash (payload: string): Promise<string> {
    this.payload = payload
    return this.token
  }
}

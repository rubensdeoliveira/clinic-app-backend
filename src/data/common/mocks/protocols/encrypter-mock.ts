import { Encrypter } from '@/data/common/protocols'
import { datatype } from 'faker'

export class EncrypterSpy implements Encrypter {
  value: string
  hashedValue: string = datatype.uuid()

  async encrypt (value: string): Promise<string> {
    this.value = value
    return this.hashedValue
  }
}

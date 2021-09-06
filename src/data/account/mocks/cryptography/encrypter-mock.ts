import { Encrypter } from '@/data/common/protocols'
import { datatype } from 'faker'

export class EncrypterSpy implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return new Promise(resolve => resolve(datatype.uuid()))
  }
}

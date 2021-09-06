import { Encrypter } from '@/data/common/protocols'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}

  async encrypt (value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt)
    return hashedValue
  }
}

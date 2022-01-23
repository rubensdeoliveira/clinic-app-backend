import {
  HashComparatorContract,
  HashGeneratorContract,
} from '@/domain/authentication/contracts'

import { hash, compare } from 'bcrypt'

export class BCryptHashGateway
  implements HashGeneratorContract, HashComparatorContract
{
  async generateHash({
    payload,
  }: HashGeneratorContract.Input): Promise<HashGeneratorContract.Output> {
    return hash(payload, 8)
  }

  async compareHash({
    payload,
    hashedValue,
  }: HashComparatorContract.Input): Promise<HashComparatorContract.Output> {
    return compare(payload, hashedValue)
  }
}

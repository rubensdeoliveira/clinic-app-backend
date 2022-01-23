import {
  GetAccountByEmailContract,
  HashGeneratorContract,
  RegisterAccountContract,
} from '@/domain/authentication/contracts'
import { AccountEmailInUseError } from '@/domain/authentication/errors'
import { AccountType } from '@/domain/authentication/constants'

type Setup = (
  accountsRepository: RegisterAccountContract & GetAccountByEmailContract,
  hashGateway: HashGeneratorContract,
) => RegisterAccountUseCase
type Input = { name: string; email: string; password: string }
type Output = RegisterAccountContract.Output
export type RegisterAccountUseCase = (input: Input) => Promise<Output>

export const setupRegisterAccountUseCase: Setup =
  (accountsRepository, hashGateway) => async input => {
    const account = await accountsRepository.getByEmail({ email: input.email })
    if (account) {
      throw new AccountEmailInUseError()
    }
    const hashedPassword = await hashGateway.generateHash({
      payload: input.password,
    })
    const accountCreated = await accountsRepository.register({
      ...input,
      password: hashedPassword,
      type: AccountType.manager,
    })
    return accountCreated
  }

import { RecoverPasswordUseCase, RecoverPasswordDTO } from '@/domain/authentication'
import { GetUserAccountByRecoverPasswordCodeRepository, UpdateUserAccountRepository } from '@/data/authentication/repositories'
import { CreateHash } from '@/data/auth/protocols'
import { AccountIsNotFoundError } from '@/data/authentication/errors'

export class DbRecoverPasswordUseCase implements RecoverPasswordUseCase {
  constructor (
    private readonly getUserAccountByRecoverPasswordCodeRepository: GetUserAccountByRecoverPasswordCodeRepository,
    private readonly createHash: CreateHash,
    private readonly updateUserAccountRepository: UpdateUserAccountRepository
  ) {}

  async recoverPassword ({ recoverPasswordCode, password }: RecoverPasswordDTO): Promise<void> {
    const accountByRecoverPasswordCode = await this.getUserAccountByRecoverPasswordCodeRepository.getByRecoverPasswordCode(recoverPasswordCode)
    if (!accountByRecoverPasswordCode) {
      throw new AccountIsNotFoundError()
    }
    const passwordHash = await this.createHash.hash(password)
    await this.updateUserAccountRepository.update({
      id: accountByRecoverPasswordCode.id,
      name: accountByRecoverPasswordCode.name,
      email: accountByRecoverPasswordCode.email,
      password: passwordHash,
      secret_2factor: undefined,
      recover_password_code: undefined,
      type: accountByRecoverPasswordCode.type,
      status: accountByRecoverPasswordCode.status
    })
  }
}

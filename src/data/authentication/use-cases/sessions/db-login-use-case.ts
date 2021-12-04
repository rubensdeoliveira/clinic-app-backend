import { LoginUseCase, LoginDTO, AccessTokenModel, CreateSessionUseCase, CreateAccessTokenUseCase, UserStatusModel } from '@/domain/authentication'
import { GetUserByEmailRepository } from '@/data/authentication/repositories'
import { CompareHash } from '@/data/authentication/protocols'
import { InvalidCredentialsError } from '@/data/authentication/errors'

export class DbLoginUseCase implements LoginUseCase {
  constructor (
    private readonly getUserAccountByEmailRepository: GetUserByEmailRepository,
    private readonly compareHash: CompareHash,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly createAccessTokenUseCase: CreateAccessTokenUseCase
  ) {}

  async login ({ email, password }: LoginDTO): Promise<AccessTokenModel> {
    const user = await this.getUserAccountByEmailRepository.getByEmail(email)
    if (user?.status !== UserStatusModel.Active) {
      throw new InvalidCredentialsError()
    }
    const passwordIsCorrect = await this.compareHash.compare({
      payload: password,
      hash: user.password
    })
    if (!passwordIsCorrect) {
      throw new InvalidCredentialsError()
    }
    const session = await this.createSessionUseCase.create({
      userId: user.id
    })
    return await this.createAccessTokenUseCase.create({
      sessionId: session.id,
      userId: user.id,
      name: user.name,
      email: user.email,
      userType: user.type
    })
  }
}

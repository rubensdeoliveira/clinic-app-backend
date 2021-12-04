import { CreateUserUseCase, CreateUserDTO, UserModel, UserTypeModel, UserStatusModel } from '@/domain/authentication'
import { GetUserByEmailRepository } from '@/data/authentication/repositories'
import { CreateEntityRepository } from '@/data/common/repositories'
import { CreateHash } from '@/data/authentication/protocols'
import { EmailInUseError } from '@/data/authentication/errors'

export class DbCreateUserUseCase implements CreateUserUseCase {
  constructor (
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
    private readonly createHash: CreateHash,
    private readonly createUserRepository: CreateEntityRepository<UserModel>,
    private readonly userTypeDefault: UserTypeModel
  ) {}

  async create ({ name, email, password, userType }: CreateUserDTO): Promise<UserModel> {
    const userUserByEmail = await this.getUserByEmailRepository.getByEmail(email)
    if (userUserByEmail) {
      throw new EmailInUseError()
    }
    const passwordHash = await this.createHash.hash(password)
    return await this.createUserRepository.create({
      name,
      email,
      password: passwordHash,
      type: userType || this.userTypeDefault,
      status: UserStatusModel.Active
    })
  }
}

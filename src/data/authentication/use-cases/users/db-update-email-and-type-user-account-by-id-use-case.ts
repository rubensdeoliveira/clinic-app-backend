import { UpdateEmailAndTypeUserByIdUseCase, UpdateEmailAndTypeUserByIdDTO, UserModel, UserStatusModel } from '@/domain/authentication'
import { GetUserByEmailRepository, UpdateUserRepository, DeleteSessionByUserIdRepository } from '@/data/authentication/repositories'
import { GetEntityByIdRepository } from '@/data/common/repositories'
import { UserIsNotFoundError, EmailInUseError } from '@/data/authentication/errors'

export class DbUpdateEmailAndTypeUserByIdUseCase implements UpdateEmailAndTypeUserByIdUseCase {
  constructor (
    private readonly getUserByEmailRepository: GetUserByEmailRepository,
    private readonly getUserByIdRepository: GetEntityByIdRepository<UserModel>,
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly deleteSessionByIdRepository: DeleteSessionByUserIdRepository
  ) {}

  async updateEmailById ({ email, id, user_type: userType, user_status: userStatus }: UpdateEmailAndTypeUserByIdDTO): Promise<UserModel> {
    const userByEmail = await this.getUserByEmailRepository.getByEmail(email)
    if ((userByEmail) && (userByEmail.id !== id)) {
      throw new EmailInUseError()
    }
    const userById = await this.getUserByIdRepository.getById(id)
    if (!userById) {
      throw new UserIsNotFoundError()
    }

    if (userStatus !== UserStatusModel.Active) {
      await this.deleteSessionByIdRepository.deleteByUserId(userById.id)
    }
    return await this.updateUserRepository.update({
      id,
      email,
      name: userById.name,
      password: userById.password,
      type: userType,
      status: userStatus
    })
  }
}

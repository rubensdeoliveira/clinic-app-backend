import { CreateEntityRepository } from '@/data/common/repositories'
import { AccessTokenModel, UserModel, UserStatusModel, UserTypeModel, mockUserStatusModel, mockCreateUserDTO, SessionModel } from '@/domain/authentication'
import { AuthRepositoryFactory } from '@/infra/authentication/repositories'
import { RepositoryType } from '@/infra/common/repositories'
import { makeCreateAccessTokenUseCase } from '@/main/factories/authentication/use-cases'

export const mockCreateAccessToken = async (userType: UserTypeModel, privateKey: string, status: UserStatusModel = mockUserStatusModel()): Promise<AccessTokenModel> => {
  const createUserRepository = AuthRepositoryFactory.GetUsersRepository<CreateEntityRepository<UserModel>>(RepositoryType.Memory)
  const createUserDTO = mockCreateUserDTO()
  const user = await createUserRepository.create({
    ...createUserDTO,
    type: userType,
    status
  })
  const createSessionRepository = AuthRepositoryFactory.GetSessionsRepository<CreateEntityRepository<SessionModel>>(RepositoryType.Memory)
  const session = await createSessionRepository.create({
    user_id: user.id
  })
  const useCase = makeCreateAccessTokenUseCase({
    accessTokenValidityInMinutes: 10,
    refreshTokenValidityInMinutes: 20,
    privateKey
  })
  return await useCase.create({
    userId: user.id,
    userType: user.type,
    name: user.name,
    email: user.email,
    sessionId: session.id
  })
}

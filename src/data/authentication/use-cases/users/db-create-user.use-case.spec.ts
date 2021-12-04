import { DbCreateUserUseCase } from './db-create-user.use-case'
import { UserType, mockCreateUserDTO, mockModel, mockUserType, UserModel, StatusModel } from '@/domain/authentication'
import { GetUserByEmailRepositorySpy, CreateHashSpy } from '@/data/authentication/mocks'
import { CreateEntityRepositorySpy } from '@/data/common/mocks'
import { EmailInUseError, IdentificationInUseError } from '@/data/authentication/errors'

type sutTypes = {
  sut: DbCreateUserUseCase
  getUserByEmailRepository: GetUserByEmailRepositorySpy
  createHash: CreateHashSpy
  createUserRepository: CreateEntityRepositorySpy<UserModel>
  userType: UserType
}

const makeSut = (): sutTypes => {
  const getUserByEmailRepository = new GetUserByEmailRepositorySpy()
  getUserByEmailRepository.account = undefined
  const getUserByIdentificationRepository = new GetUserByIdentificationRepositorySpy()
  getUserByIdentificationRepository.account = undefined
  const createHash = new CreateHashSpy()
  const createUserRepository = new CreateEntityRepositorySpy<UserModel>()
  const userType = mockUserType()
  const sut = new DbCreateUserUseCase(getUserByEmailRepository, getUserByIdentificationRepository, createHash, createUserRepository, userType)
  return {
    sut,
    getUserByEmailRepository,
    createHash,
    createUserRepository,
    userType
  }
}

describe('DbCreateUserUseCase', () => {
  test('Should call GetUserByEmailRepository with correct value', async () => {
    const { sut, getUserByEmailRepository } = makeSut()
    const request = mockCreateUserDTO()
    await sut.create(request)
    expect(getUserByEmailRepository.email).toBe(request.email)
  })

  test('Should return EmailIsInUseError if GetUserByEmailRepository return an user account', async () => {
    const { sut, getUserByEmailRepository } = makeSut()
    getUserByEmailRepository.account = mockModel()
    const request = mockCreateUserDTO()
    const promise = sut.create(request)
    await expect(promise).rejects.toThrowError(EmailInUseError)
  })

  test('Should call GetUserByIdentificationRepository with correct value', async () => {
    const { sut, getUserByIdentificationRepository } = makeSut()
    const request = mockCreateUserDTO()
    await sut.create(request)
    expect(getUserByIdentificationRepository.identification).toBe(request.identification)
  })

  test('Should return IdentificationIsInUseError if GetUserByIdentificationRepository return an user account', async () => {
    const { sut, getUserByIdentificationRepository } = makeSut()
    getUserByIdentificationRepository.account = mockModel()
    const request = mockCreateUserDTO()
    const promise = sut.create(request)
    await expect(promise).rejects.toThrowError(IdentificationInUseError)
  })

  test('Should call CreateHash with correct value', async () => {
    const { sut, createHash } = makeSut()
    const request = mockCreateUserDTO()
    await sut.create(request)
    expect(createHash.payload).toBe(request.password)
  })

  test('Should call CreateUserRepository with correct value if account type is not provided', async () => {
    const { sut, createHash, createUserRepository, userType } = makeSut()
    const request = mockCreateUserDTO()
    delete request.userType
    await sut.create(request)
    expect(createUserRepository.params).toEqual({
      name: request.name,
      identification: request.identification,
      email: request.email,
      password: createHash.token,
      type: userType,
      status: StatusModel.Active
    })
  })

  test('Should call CreateUserRepository with correct value if account type is not provided', async () => {
    const { sut, createHash, createUserRepository } = makeSut()
    const request = mockCreateUserDTO()
    await sut.create(request)
    expect(createUserRepository.params).toEqual({
      name: request.name,
      identification: request.identification,
      email: request.email,
      password: createHash.token,
      type: request.userType,
      status: StatusModel.Active
    })
  })

  test('Should return same CreateUserRepository return if succeeds', async () => {
    const { sut, createUserRepository } = makeSut()
    const account = await sut.create(mockCreateUserDTO())
    expect(account).toEqual(createUserRepository.entity)
  })
})

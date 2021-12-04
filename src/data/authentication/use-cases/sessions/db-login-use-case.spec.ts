import { DbLoginUseCase } from './db-login-use-case'
import { CreateSessionUseCaseSpy, CreateAccessTokenUseCaseSpy, mockLoginDTO, AccountStatusModel } from '@/domain/authentication'
import { GetUserByEmailRepositorySpy, GetUserAccountByIdentificationRepositorySpy, CompareHashSpy } from '@/data/authentication/mocks'
import { InvalidCredentialsError } from '@/data/authentication/errors'

type sutTypes = {
  sut: DbLoginUseCase
  getUserAccountByEmailRepository: GetUserByEmailRepositorySpy
  getUserAccountByIdentificationRepository: GetUserAccountByIdentificationRepositorySpy
  compareHash: CompareHashSpy
  createSessionUseCase: CreateSessionUseCaseSpy
  createAccessTokenUseCase: CreateAccessTokenUseCaseSpy
}

const makeSut = (): sutTypes => {
  const getUserAccountByEmailRepository = new GetUserByEmailRepositorySpy()
  getUserAccountByEmailRepository.account.status = AccountStatusModel.Active
  const getUserAccountByIdentificationRepository = new GetUserAccountByIdentificationRepositorySpy()
  getUserAccountByIdentificationRepository.account.status = AccountStatusModel.Active
  const compareHash = new CompareHashSpy()
  const createSessionUseCase = new CreateSessionUseCaseSpy()
  const createAccessTokenUseCase = new CreateAccessTokenUseCaseSpy()
  const sut = new DbLoginUseCase(getUserAccountByEmailRepository, getUserAccountByIdentificationRepository, compareHash, createSessionUseCase, createAccessTokenUseCase)
  return {
    sut,
    getUserAccountByEmailRepository,
    getUserAccountByIdentificationRepository,
    compareHash,
    createSessionUseCase,
    createAccessTokenUseCase
  }
}

describe('DbLoginUseCase', () => {
  test('Should call GetUserByEmailRepository with correct value', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    const request = mockLoginDTO()
    await sut.login(request)
    expect(getUserAccountByEmailRepository.email).toBe(request.identification)
  })

  test('Should not call GetUserAccountByIdentificationRepository if GetUserByEmailRepository return value', async () => {
    const { sut, getUserAccountByIdentificationRepository } = makeSut()
    const getByIdentificationSpy = jest.spyOn(getUserAccountByIdentificationRepository, 'getByIdentification')
    await sut.login(mockLoginDTO())
    expect(getByIdentificationSpy).toHaveBeenCalledTimes(0)
  })

  test('Should call GetUserAccountByIdentificationRepository with correct value if GetUserByEmailRepository return undefined', async () => {
    const { sut, getUserAccountByIdentificationRepository, getUserAccountByEmailRepository } = makeSut()
    delete getUserAccountByEmailRepository.account
    const request = mockLoginDTO()
    await sut.login(request)
    expect(getUserAccountByIdentificationRepository.identification).toBe(request.identification)
  })

  test('Should return InvalidCredentialsError if GetUserByEmailRepository and GetUserAccountByIdentificationRepository return undefined', async () => {
    const { sut, getUserAccountByEmailRepository, getUserAccountByIdentificationRepository } = makeSut()
    getUserAccountByEmailRepository.account = undefined
    getUserAccountByIdentificationRepository.account = undefined
    const promise = sut.login(mockLoginDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should return InvalidCredentialsError if GetUserByEmailRepository return blocked account', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    getUserAccountByEmailRepository.account.status = AccountStatusModel.Blocked
    const promise = sut.login(mockLoginDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should return InvalidCredentialsError if GetUserByEmailRepository return inactive account', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    getUserAccountByEmailRepository.account.status = AccountStatusModel.Inactive
    const promise = sut.login(mockLoginDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should call CompareHash with correct value', async () => {
    const { sut, getUserAccountByEmailRepository, compareHash } = makeSut()
    const request = mockLoginDTO()
    await sut.login(request)
    expect(compareHash.params).toEqual({
      payload: request.password,
      hash: getUserAccountByEmailRepository.account.password
    })
  })

  test('Should return InvalidCredentialsError if CompareHash return false', async () => {
    const { sut, compareHash } = makeSut()
    compareHash.result = false
    const promise = sut.login(mockLoginDTO())
    await expect(promise).rejects.toThrowError(InvalidCredentialsError)
  })

  test('Should call CreateSessionUseCase with correct value', async () => {
    const { sut, getUserAccountByEmailRepository, createSessionUseCase } = makeSut()
    await sut.login(mockLoginDTO())
    expect(createSessionUseCase.params).toEqual({
      accountId: getUserAccountByEmailRepository.account.id
    })
  })

  test('Should call CreateAccessTokenUseCase with correct value', async () => {
    const { sut, getUserAccountByEmailRepository, createSessionUseCase, createAccessTokenUseCase } = makeSut()
    await sut.login(mockLoginDTO())
    expect(createAccessTokenUseCase.params).toEqual({
      sessionId: createSessionUseCase.session.id,
      accountId: getUserAccountByEmailRepository.account.id,
      name: getUserAccountByEmailRepository.account.name,
      email: getUserAccountByEmailRepository.account.email,
      userType: getUserAccountByEmailRepository.account.type
    })
  })

  test('Should return same CreateAccessTokenUseCase return if succeeds', async () => {
    const { sut, createAccessTokenUseCase } = makeSut()
    const accessToken = await sut.login(mockLoginDTO())
    expect(accessToken).toEqual(createAccessTokenUseCase.accessToken)
  })
})

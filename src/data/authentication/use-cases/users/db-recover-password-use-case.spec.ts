import { DbRecoverPasswordUseCase } from './db-recover-password-use-case'
import { mockRecoverPasswordDTO } from '@/domain/authentication'
import { GetUserAccountByRecoverPasswordCodeRepositorySpy, CreateHashSpy, UpdateUserAccountRepositorySpy } from '@/data/authentication/mocks'
import { AccountIsNotFoundError } from '@/data/authentication/errors'

type sutTypes = {
  sut: DbRecoverPasswordUseCase
  getUserAccountByRecoverPasswordCodeRepository: GetUserAccountByRecoverPasswordCodeRepositorySpy
  createHash: CreateHashSpy
  updateUserAccountRepository: UpdateUserAccountRepositorySpy
}

const makeSut = (): sutTypes => {
  const getUserAccountByRecoverPasswordCodeRepository = new GetUserAccountByRecoverPasswordCodeRepositorySpy()
  const createHash = new CreateHashSpy()
  const updateUserAccountRepository = new UpdateUserAccountRepositorySpy()
  const sut = new DbRecoverPasswordUseCase(getUserAccountByRecoverPasswordCodeRepository, createHash, updateUserAccountRepository)
  return {
    sut,
    getUserAccountByRecoverPasswordCodeRepository,
    createHash,
    updateUserAccountRepository
  }
}

describe('DbRecoverPasswordUseCase', () => {
  test('Should call GetUserAccountByRecoverPasswordCodeRepository with correct value', async () => {
    const { sut, getUserAccountByRecoverPasswordCodeRepository } = makeSut()
    const request = mockRecoverPasswordDTO()
    await sut.recoverPassword(request)
    expect(getUserAccountByRecoverPasswordCodeRepository.recoverPasswordCode).toBe(request.recoverPasswordCode)
  })

  test('Should return AccountNotFoundError if GetUserAccountByRecoverPasswordCodeRepository return undefined', async () => {
    const { sut, getUserAccountByRecoverPasswordCodeRepository } = makeSut()
    getUserAccountByRecoverPasswordCodeRepository.account = undefined
    const promise = sut.recoverPassword(mockRecoverPasswordDTO())
    await expect(promise).rejects.toThrowError(AccountIsNotFoundError)
  })

  test('Should call CreateHash with correct value', async () => {
    const { sut, createHash } = makeSut()
    const request = mockRecoverPasswordDTO()
    await sut.recoverPassword(request)
    expect(createHash.payload).toBe(request.password)
  })

  test('Should call UpdateUserAccountRepository with correct values', async () => {
    const { sut, getUserAccountByRecoverPasswordCodeRepository, createHash, updateUserAccountRepository } = makeSut()
    await sut.recoverPassword(mockRecoverPasswordDTO())
    expect(updateUserAccountRepository.params).toEqual({
      id: getUserAccountByRecoverPasswordCodeRepository.account.id,
      name: getUserAccountByRecoverPasswordCodeRepository.account.name,
      email: getUserAccountByRecoverPasswordCodeRepository.account.email,
      password: createHash.token,
      secret_2factor: undefined,
      recover_password_code: undefined,
      type: getUserAccountByRecoverPasswordCodeRepository.account.type,
      status: getUserAccountByRecoverPasswordCodeRepository.account.status
    })
  })
})

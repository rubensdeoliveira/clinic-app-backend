import { DbUpdateEmailAndTypeUserAccountByIdUseCase } from './db-update-email-and-type-user-account-by-id-use-case'
import { UserModel, AccountStatusModel, mockUserModel, mockUpdateEmailAndTypeUserAccountByIdDTO } from '@/domain/authentication'
import { GetEntityByIdRepositorySpy } from '@/data/common/mocks'
import {
  GetUserByEmailRepositorySpy,
  UpdateUserAccountRepositorySpy,
  DeleteSessionByAccountIdRepositorySpy
} from '@/data/authentication/mocks'
import { AccountIsNotFoundError, EmailInUseError } from '@/data/authentication/errors'
import faker from 'faker'

type sutTypes = {
  sut: DbUpdateEmailAndTypeUserAccountByIdUseCase
  getUserAccountByEmailRepository: GetUserByEmailRepositorySpy
  getUserAccountByIdRepository: GetEntityByIdRepositorySpy<UserModel>
  updateUserAccountRepository: UpdateUserAccountRepositorySpy
  deleteSessionByAccountIdRepository: DeleteSessionByAccountIdRepositorySpy
}

const makeSut = (): sutTypes => {
  const getUserAccountByEmailRepository = new GetUserByEmailRepositorySpy()
  getUserAccountByEmailRepository.account = undefined
  const getUserAccountByIdRepository = new GetEntityByIdRepositorySpy<UserModel>()
  const updateUserAccountRepository = new UpdateUserAccountRepositorySpy()
  const deleteSessionByAccountIdRepository = new DeleteSessionByAccountIdRepositorySpy()
  const sut = new DbUpdateEmailAndTypeUserAccountByIdUseCase(
    getUserAccountByEmailRepository,
    getUserAccountByIdRepository,
    updateUserAccountRepository,
    deleteSessionByAccountIdRepository
  )
  return {
    sut,
    getUserAccountByEmailRepository,
    getUserAccountByIdRepository,
    updateUserAccountRepository,
    deleteSessionByAccountIdRepository
  }
}

describe('DbUpdateEmailAndTypeUserAccountByIdUseCase', () => {
  test('Should call GetUserByEmailRepository with correct value', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    const request = mockUpdateEmailAndTypeUserAccountByIdDTO()
    await sut.updateEmailById(request)
    expect(getUserAccountByEmailRepository.email).toBe(request.email)
  })

  test('Should return EmailIsInUseError if GetUserByEmailRepository return other account', async () => {
    const { sut, getUserAccountByEmailRepository } = makeSut()
    getUserAccountByEmailRepository.account = mockUserModel()
    const promise = sut.updateEmailById(mockUpdateEmailAndTypeUserAccountByIdDTO())
    await expect(promise).rejects.toThrowError(EmailInUseError)
  })

  test('Should call GetUserAccountByIdRepository with correct value', async () => {
    const { sut, getUserAccountByIdRepository } = makeSut()
    const request = mockUpdateEmailAndTypeUserAccountByIdDTO()
    await sut.updateEmailById(request)
    expect(getUserAccountByIdRepository.entityId).toBe(request.id)
  })

  test('Should return AccountIsNotFoundError if GetUserAccountByIdRepository return undefined', async () => {
    const { sut, getUserAccountByIdRepository } = makeSut()
    delete getUserAccountByIdRepository.entity
    const promise = sut.updateEmailById(mockUpdateEmailAndTypeUserAccountByIdDTO())
    await expect(promise).rejects.toThrowError(AccountIsNotFoundError)
  })

  test('Should not call DeleteSessionByAccountIdRepository if account status is active', async () => {
    const { sut, deleteSessionByAccountIdRepository } = makeSut()
    const deleteSpy = jest.spyOn(deleteSessionByAccountIdRepository, 'deleteByAccountId')
    const request = mockUpdateEmailAndTypeUserAccountByIdDTO()
    request.account_status = AccountStatusModel.Active
    await sut.updateEmailById(request)
    expect(deleteSpy).toHaveBeenCalledTimes(0)
  })

  describe('Account status is different than active', () => {
    test('Should call DeleteSessionByAccountIdRepository with correct value', async () => {
      const { sut, deleteSessionByAccountIdRepository, getUserAccountByIdRepository } = makeSut()
      const deleteSpy = jest.spyOn(deleteSessionByAccountIdRepository, 'deleteByAccountId')
      const request = mockUpdateEmailAndTypeUserAccountByIdDTO()
      request.account_status = faker.random.arrayElement([AccountStatusModel.Blocked, AccountStatusModel.Inactive])
      await sut.updateEmailById(request)
      expect(deleteSpy).toHaveBeenCalledWith(getUserAccountByIdRepository.entity.id)
    })
  })

  test('Should call UpdateUserAccountRepository with correct value', async () => {
    const { sut, updateUserAccountRepository, getUserAccountByIdRepository } = makeSut()
    const request = mockUpdateEmailAndTypeUserAccountByIdDTO()
    await sut.updateEmailById(request)
    expect(updateUserAccountRepository.params).toEqual({
      id: request.id,
      email: request.email,
      name: getUserAccountByIdRepository.entity.name,
      password: getUserAccountByIdRepository.entity.password,
      secret_2factor: getUserAccountByIdRepository.entity.secret_2factor,
      recover_password_code: getUserAccountByIdRepository.entity.recover_password_code,
      type: request.user_type,
      status: request.account_status
    })
  })

  test('Should return same UpdateUserAccountRepository returns', async () => {
    const { sut, updateUserAccountRepository } = makeSut()
    const request = mockUpdateEmailAndTypeUserAccountByIdDTO()
    const account = await sut.updateEmailById(request)
    expect(account).toEqual(updateUserAccountRepository.account)
  })
})

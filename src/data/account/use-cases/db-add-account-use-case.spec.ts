import { DbAddAccountUseCase } from './db-add-account-use-case'
import { mockAddAccountDTO } from '@/domain/account/mocks'
import { Encrypter } from '@/data/common/protocols'
import { EncrypterSpy } from '@/data/common/mocks'
import { AddAccountRepositorySpy } from '@/data/account/mocks'
import { datatype } from 'faker'

type SutTypes = {
  sut: DbAddAccountUseCase
  encrypterSpy: Encrypter
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): SutTypes => {
  const encrypterSpy = new EncrypterSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccountUseCase(encrypterSpy, addAccountRepositorySpy)
  return {
    sut,
    encrypterSpy,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount', () => {
  test('Should call Encrypter with correct password',async () => {
    const { sut, encrypterSpy } = makeSut()
    const encrypter = jest.spyOn(encrypterSpy, 'encrypt')
    const accountData = mockAddAccountDTO()
    await sut.add(accountData)
    expect(encrypter).toHaveBeenCalledWith(accountData.password)
  })

  test('Should throw if Encrypter throws',async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = mockAddAccountDTO()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values',async () => {
    const { sut, addAccountRepositorySpy, encrypterSpy } = makeSut()
    const hashedPassword = datatype.uuid()
    jest.spyOn(encrypterSpy, 'encrypt').mockResolvedValueOnce(hashedPassword)
    const addSpy = jest.spyOn(addAccountRepositorySpy, 'add')
    const accountData = mockAddAccountDTO()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith(Object.assign({}, accountData, { password: hashedPassword }))
  })

  test('Should throw if AddAccountRepository throws',async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountData = mockAddAccountDTO()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account if on success',async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    const accountData = mockAddAccountDTO()
    const account = await sut.add(accountData)
    expect(account).toEqual(addAccountRepositorySpy.account)
  })
})

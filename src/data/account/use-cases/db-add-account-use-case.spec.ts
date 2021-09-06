import { mockAddAccountDTO } from '../../../domain/account/mocks'
import { DbAddAccountUseCase } from './db-add-account-use-case'
import { Encrypter } from '@/data/common/protocols'
import { datatype } from 'faker'

type SutTypes = {
  sut: DbAddAccountUseCase
  encrypterSpy: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterSpy implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve(datatype.uuid()))
    }
  }
  return new EncrypterSpy()
}

const makeSut = (): SutTypes => {
  const encrypterSpy = makeEncrypter()
  const sut = new DbAddAccountUseCase(encrypterSpy)
  return {
    sut,
    encrypterSpy
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
})

import { UsersRepositoryMemory } from './users.repository.memory'
import { mockUserModel } from '@/domain/authentication'
import { mockUpdateUserRepositoryDTO } from '@/data/authentication/mocks'
import faker from 'faker'

type sutTypes = {
  sut: UsersRepositoryMemory
}

const makeSut = (): sutTypes => ({
  sut: UsersRepositoryMemory.getRepository()
})

describe('UsersRepositoryMemory', () => {
  beforeEach(() => {
    UsersRepositoryMemory.getRepository().entities = []
  })

  describe('GetByEmail Method', () => {
    test('Should return undefined if account not found by email', async () => {
      const { sut } = makeSut()
      const account = await sut.getByEmail(faker.internet.email())
      expect(account).toBeFalsy()
    })

    test('Should return a account if account is found by email', async () => {
      const { sut } = makeSut()
      const mockedUsers = mockUserModel()
      sut.entities.push(mockedUsers)
      const account = await sut.getByEmail(mockedUsers.email)
      expect(account).toEqual(mockedUsers)
    })
  })

  describe('Create Method', () => {
    test('Should return new account with correct values', async () => {
      const { sut } = makeSut()
      const params = mockUserModel()
      const createdUsers = await sut.create(params)
      expect(createdUsers.id).toBeTruthy()
      expect(createdUsers.created_at).toBeTruthy()
      expect(createdUsers.updated_at).toBeTruthy()
      expect(createdUsers.name).toBe(params.name)
      expect(createdUsers.email).toBe(params.email)
      expect(createdUsers.password).toBe(params.password)
      expect(createdUsers.type).toBe(params.type)
    })
  })

  describe('Update Method', () => {
    test('Should return a update account with correct values', async () => {
      const { sut } = makeSut()
      const account = mockUserModel()
      sut.entities.push(account)
      const request = mockUpdateUserRepositoryDTO(account.id)
      const updatedUsers = await sut.update(request)
      expect(updatedUsers.name).toBe(request.name)
      expect(updatedUsers.email).toBe(request.email)
      expect(updatedUsers.password).toBe(request.password)
      expect(updatedUsers.type).toBe(request.type)
    })

    test('Should return undefined if account is not found', async () => {
      const { sut } = makeSut()
      const updatedUsers = await sut.update(mockUpdateUserRepositoryDTO())
      expect(updatedUsers).toBeFalsy()
    })
  })
})

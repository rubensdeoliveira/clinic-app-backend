import { DbListUserTypeUseCase } from './db-list-account-types-use-case'
import { UserType } from '@/domain/authentication'

type sutTypes = {
  sut: DbListUserTypeUseCase
}

const makeSut = (): sutTypes => ({
  sut: new DbListUserTypeUseCase()
})

describe('DbListUserTypeUseCase', () => {
  test('Should return empty list if authenticated account is athlete', async () => {
    const { sut } = makeSut()
    const list = await sut.list(UserType.athlete)
    expect(list).toHaveLength(0)
  })

  test('Should return empty list if authenticated account is coach', async () => {
    const { sut } = makeSut()
    const list = await sut.list(UserType.coach)
    expect(list).toHaveLength(0)
  })

  test('Should return empty list if authenticated account is responsible', async () => {
    const { sut } = makeSut()
    const list = await sut.list(UserType.responsible)
    expect(list).toHaveLength(0)
  })

  test('Should return list without platformManager if authenticated account is institutionalAdministrator', async () => {
    const { sut } = makeSut()
    const list = await sut.list(UserType.institutionalAdministrator)
    expect(list).not.toContain(UserType.platformManager)
  })

  test('Should return only platformManager and institutionalAdministrator in list if authenticated account is platformManager', async () => {
    const { sut } = makeSut()
    const list = await sut.list(UserType.platformManager)
    expect(list).toEqual([
      UserType.institutionalAdministrator,
      UserType.platformManager
    ])
  })
})

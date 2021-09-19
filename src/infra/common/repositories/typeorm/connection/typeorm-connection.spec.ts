import { TypeORMConnection } from './typeorm-connection'
import { TypeORMConnectionSpy } from '@/infra/common/mocks'
import typeorm, { createConnection } from 'typeorm'

const typeORMConnectionSpy = new TypeORMConnectionSpy()
jest.mock('typeorm', () => ({
  createConnection: () => { return typeORMConnectionSpy }
}))

describe('TypeORMConnection', () => {
  beforeEach(() => {
    TypeORMConnection.connection = undefined
  })

  test('Should not call createConnection if connection is defined', async () => {
    const createConnectionSpy = jest.spyOn(typeorm, 'createConnection')
    TypeORMConnection.connection = await createConnection()
    await TypeORMConnection.getConnection()
    expect(createConnectionSpy).toHaveBeenCalledTimes(1)
  })

  test('Should call createConnection if connection is undefined', async () => {
    const createConnectionSpy = jest.spyOn(typeorm, 'createConnection')
    await TypeORMConnection.getConnection()
    expect(createConnectionSpy).toHaveBeenCalledTimes(2)
  })

  test('Should call runMigrations if connection is undefined', async () => {
    const runMigrationsSpy = jest.spyOn(typeORMConnectionSpy, 'runMigrations')
    await TypeORMConnection.getConnection()
    expect(runMigrationsSpy).toHaveBeenCalledTimes(1)
  })
})

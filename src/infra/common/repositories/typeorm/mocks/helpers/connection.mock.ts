import { TypeormConnection } from '@/infra/common/repositories/typeorm/helpers'

import { IMemoryDb, newDb } from 'pg-mem'

export const makeFakeDb = async (entities: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities,
  })
  await connection.synchronize()
  await TypeormConnection.getInstance().connect()
  return db
}

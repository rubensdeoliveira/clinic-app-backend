import { createConnection, Connection } from 'typeorm'

export const typeOrmSetup = async (): Promise<Connection> => {
  const connection = await createConnection()
  await connection.runMigrations()
  return connection
}

import { createConnection, Connection } from 'typeorm'

export class TypeORMConnection {
  static connection: Connection

  static async getConnection (): Promise<Connection> {
    if (!TypeORMConnection.connection) {
      TypeORMConnection.connection = await createConnection()
      TypeORMConnection.connection.runMigrations()
    }
    return TypeORMConnection.connection
  }
}

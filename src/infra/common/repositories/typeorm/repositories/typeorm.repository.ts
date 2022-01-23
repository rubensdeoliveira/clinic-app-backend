import { TypeormConnection } from '@/infra/common/repositories/typeorm'

import { ObjectType, Repository } from 'typeorm'

export abstract class TypeormRepository {
  constructor(
    private readonly connection: TypeormConnection = TypeormConnection.getInstance(),
  ) {}

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}

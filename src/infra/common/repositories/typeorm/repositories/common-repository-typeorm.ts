import { CreateEntityRepository } from '@/data/common/repositories'
import { CreateEntityDTO } from '@/domain/common/dtos'
import { DeepPartial, Repository } from 'typeorm'
import { TypeORMConnection } from '@/infra/common/repositories/typeorm/connection'
import { DefaultEntity } from '@/infra/common/repositories'
import { InvalidForeignKeyError, MissingParamError, RepositoryError, RepositoryErrorType, ViolateUniqueKeyError } from '@/data/common/errors'

export class CommonRepositoryTypeORM<EntityType extends DefaultEntity>
implements CreateEntityRepository<EntityType> {
  public repositoryTypeORM: Repository<EntityType>

  createRepositoryTypeORM (): Repository<EntityType> {
    return undefined
  }

  async getRepositoryTypeORM (): Promise<Repository<EntityType>> {
    if (!this.repositoryTypeORM) {
      await TypeORMConnection.getConnection()
      this.repositoryTypeORM = this.createRepositoryTypeORM()
    }
    return this.repositoryTypeORM
  }

  throwCorrectError (error: RepositoryError): void {
    switch (error.code) {
      case RepositoryErrorType.NotNull:
        throw new MissingParamError(error.column)
      case RepositoryErrorType.ForeignKey:
        throw new InvalidForeignKeyError(error.constraint)
      case RepositoryErrorType.UniqueKey:
        throw new ViolateUniqueKeyError(error.constraint)
    }
  }

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    const repository = await this.getRepositoryTypeORM()
    try {
      const createdEntity = repository.create(params as DeepPartial<EntityType>)
      await repository.save<any>(createdEntity)
      return createdEntity
    } catch (error) {
      this.throwCorrectError(error)
    }
  }
}

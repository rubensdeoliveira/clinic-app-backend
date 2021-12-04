import {
  GetEntityByIdRepository,
  DeleteEntityByIdRepository,
  CreateEntityRepository,
  UpdateEntityRepository,
  CountEntitiesRepository,
  ListEntitiesRepository,
  ListEntitiesRepositoryDTO,
  ListEntitiesByListIdRepository,
  CreateEntityInBulkRepository,
  DeleteEntitiesByListIdRepository,
  ListEntitiesByListFieldValueRepository
} from '@/data/common/repositories'
import { CreateEntityDTO } from '@/domain/common'
import { DeepPartial, FindManyOptions, In, JoinOptions, Repository } from 'typeorm'
import { TypeORMConnection } from '@/infra/common/repositories/typeorm/connection'
import { DefaultEntity } from '@/infra/common/repositories'

export class CommonRepositoryTypeORM<EntityType extends DefaultEntity>
implements GetEntityByIdRepository<EntityType>,
  DeleteEntityByIdRepository<EntityType>,
  CreateEntityRepository<EntityType>,
  UpdateEntityRepository<EntityType>,
  CountEntitiesRepository<EntityType>,
  ListEntitiesRepository<EntityType>,
  ListEntitiesByListIdRepository<EntityType>,
  CreateEntityInBulkRepository<EntityType>,
  DeleteEntitiesByListIdRepository<EntityType>,
  ListEntitiesByListFieldValueRepository<EntityType> {
  public repositoryTypeORM: Repository<EntityType>
  public columnsToFilter: string[] = []
  public join?: JoinOptions

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

  getSearchConditional (textToSearch: string): string {
    if (!textToSearch) {
      return undefined
    }
    return this.columnsToFilter.reduce((where, column): string => {
      const fieldConditional = `(${column}::text ilike '%${textToSearch}%')`
      if (where) {
        return `${where} OR ${fieldConditional}`
      }
      return fieldConditional
    }, '')
  }

  getWhere (textToSearch: string): string {
    const searchConditional = this.getSearchConditional(textToSearch)
    if ((searchConditional)) {
      return `(${searchConditional})`
    }
    return searchConditional
  }

  async getById (entityId: string): Promise<EntityType> {
    const repository = await this.getRepositoryTypeORM()
    return await repository.findOne(entityId, {
      join: this.join
    })
  }

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    const repository = await this.getRepositoryTypeORM()
    await repository.delete(entityId)
    return undefined
  }

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    const repository = await this.getRepositoryTypeORM()
    const createdEntity = repository.create(params as DeepPartial<EntityType>)
    await repository.save<any>(createdEntity)
    return createdEntity
  }

  async update (params: Partial<EntityType>): Promise<EntityType> {
    const repository = await this.getRepositoryTypeORM()
    const entity = await repository.findOne(params.id)
    if (!entity) {
      return undefined
    }
    Object.keys(entity).forEach(key => {
      entity[key] = params[key]
    })
    await repository.save<any>(entity)
    return entity
  }

  async count (textToSearch?: string): Promise<number | EntityType> {
    const repository = await this.getRepositoryTypeORM()
    const options: FindManyOptions = {}
    const where = this.getWhere(textToSearch)
    if (where) {
      options.where = where
    }
    if (this.join) {
      options.join = this.join
    }
    return await repository.count(options)
  }

  async list ({ textToSearch, skip, recordsPerPage, orderDirection, orderColumn, filters }: ListEntitiesRepositoryDTO): Promise<EntityType[]> {
    const repository = await this.getRepositoryTypeORM()
    const options: FindManyOptions = {
      skip,
      take: recordsPerPage
    }
    const where = this.getWhere(textToSearch)
    if (where) {
      options.where = where
    }
    if (this.join) {
      options.join = this.join
    }
    return await repository.find(options)
  }

  async listByListId (listIds: string[]): Promise<EntityType[]> {
    const repository = await this.getRepositoryTypeORM()
    return await repository.find({
      join: this.join,
      where: {
        id: In(listIds)
      }
    })
  }

  async createInBulk (listParams: Array<CreateEntityDTO<EntityType>>): Promise<EntityType[]> {
    const repository = await this.getRepositoryTypeORM()
    const createdEntityList: EntityType[] = []
    listParams.forEach(params => {
      const createEntity = repository.create(params as DeepPartial<EntityType>)
      createdEntityList.push(createEntity)
    })
    await repository.save<any>(createdEntityList)
    return createdEntityList
  }

  async deleteByListId (listIds: string[]): Promise<EntityType | undefined> {
    const repository = await this.getRepositoryTypeORM()
    await repository.delete(listIds)
    return undefined
  }

  async listByListFieldValue (listValues: string[], field: string): Promise<EntityType[]> {
    const repository = await this.getRepositoryTypeORM()
    return await repository.find({
      join: this.join,
      where: {
        [field]: In(listValues)
      }
    })
  }
}

import {
  CreateEntityRepository,
  GetEntityByIdRepository,
  DeleteEntityByIdRepository,
  UpdateEntityRepository,
  CountEntitiesRepository,
  ListEntitiesRepository,
  ListEntitiesRepositoryDTO,
  ListEntitiesByListIdRepository,
  CreateEntityInBulkRepository,
  DeleteEntitiesByListIdRepository,
  ListEntitiesByListFieldValueRepository
} from '@/data/common/repositories'
import { EntityModel, CreateEntityDTO, UpdateEntityDTO } from '@/domain/common'
import { v4 } from 'uuid'

export class CommonRepositoryMemory<EntityType extends EntityModel>
implements GetEntityByIdRepository<EntityModel>,
  DeleteEntityByIdRepository<EntityModel>,
  CreateEntityRepository<EntityType>,
  UpdateEntityRepository<EntityType>,
  CountEntitiesRepository<EntityType>,
  ListEntitiesRepository<EntityType>,
  ListEntitiesByListIdRepository<EntityType>,
  CreateEntityInBulkRepository<EntityType>,
  DeleteEntitiesByListIdRepository<EntityType>,
  ListEntitiesByListFieldValueRepository<EntityType> {
  entities: EntityType[]

  constructor () {
    this.entities = []
  }

  filterEntity (entity: EntityType, textToSearch: string): boolean {
    for (const key of Object.keys(entity)) {
      if (String(entity[key]).includes(textToSearch)) {
        return true
      }
    }
  }

  async getById (entityId: string): Promise<EntityType> {
    return this.entities.find(entity => entity.id === entityId)
  }

  async deleteById (entityId: string): Promise<EntityType | undefined> {
    this.entities = this.entities.filter(entity => entity.id !== entityId)
    return undefined
  }

  async create (params: CreateEntityDTO<EntityType>): Promise<EntityType> {
    const entity = {
      ...params,
      id: v4(),
      created_at: new Date(),
      updated_at: new Date()
    }
    this.entities.push(entity as EntityType)
    return entity as EntityType
  }

  async update (params: UpdateEntityDTO<EntityType>): Promise<EntityType> {
    const index = this.entities.findIndex(entity => entity.id === params.id)
    if (index >= 0) {
      this.entities[index] = {
        ...this.entities[index],
        ...params,
        updated_at: new Date()
      }
      return this.entities[index]
    }
    return null
  }

  async count (textToSearch?: string): Promise<number | EntityType> {
    if (textToSearch) {
      return this.entities.filter(entity => this.filterEntity(entity, textToSearch)).length
    }
    return this.entities.length
  }

  async list ({ textToSearch }: ListEntitiesRepositoryDTO): Promise<EntityType[]> {
    if (textToSearch) {
      return this.entities.filter(entity => this.filterEntity(entity, textToSearch))
    }
    return this.entities
  }

  async listByListId (listIds: string[]): Promise<EntityType[]> {
    return this.entities.filter(entity => listIds.includes(entity.id))
  }

  async createInBulk (listParams: Array<CreateEntityDTO<EntityType>>): Promise<EntityType[]> {
    const createdEntities: EntityType[] = []
    listParams.forEach(async params => {
      const created = await this.create(params)
      createdEntities.push(created)
    })
    return createdEntities
  }

  async deleteByListId (listIds: string[]): Promise<EntityType | undefined> {
    this.entities = this.entities.filter(entity => !listIds.includes(entity.id))
    return undefined
  }

  async listByListFieldValue (listValues: string[], field: string): Promise<EntityType[]> {
    return this.entities.filter(entity => listValues.includes(entity[field]))
  }
}

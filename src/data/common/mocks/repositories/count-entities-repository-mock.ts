import { CustomFilterModel } from '@/domain/common'
import { CountEntitiesRepository } from '@/data/common/repositories'
import faker from 'faker'

export class CountEntitiesRepositorySpy<RecordType = object> implements CountEntitiesRepository<RecordType> {
  filters: CustomFilterModel[]
  textToSearch: string
  recordCount: number = faker.datatype.number({ min: 1 })

  async count (textToSearch?: string, filters?: CustomFilterModel[]): Promise<number | RecordType> {
    this.textToSearch = textToSearch
    this.filters = filters
    return this.recordCount
  }
}

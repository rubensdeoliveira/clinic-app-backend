import { CustomFilterModel } from '@/domain/common'

export interface CountEntitiesRepository<RecordType> {
  count: (textToSearch?: string, filters?: CustomFilterModel[]) => Promise<number | RecordType>
}

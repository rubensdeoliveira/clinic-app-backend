import { ListEntityModel } from '@/domain/common'

export type ListEntitiesDTO = {
  textToSearch?: string
  recordsPerPage?: number
  page?: number
}

export interface ListEntitiesUseCase<RecortType = any> {
  list: (filter: ListEntitiesDTO) => Promise<ListEntityModel<RecortType>>
}

import { EntityModel } from '@/domain/common/entities'
import { datatype, date } from 'faker'

export const mockEntityModel = (): EntityModel => ({
  id: datatype.uuid(),
  created_at: date.past(),
  updated_at: date.past()
})

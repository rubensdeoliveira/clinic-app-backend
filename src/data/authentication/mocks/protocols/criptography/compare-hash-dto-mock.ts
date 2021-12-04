import { CompareHashDTO } from '@/data/authentication/protocols'
import faker from 'faker'

export const mockCompareHashDTO = (): CompareHashDTO => ({
  hash: faker.datatype.uuid(),
  payload: faker.datatype.uuid()
})

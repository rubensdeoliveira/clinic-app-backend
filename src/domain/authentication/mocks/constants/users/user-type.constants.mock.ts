import { UserTypeModel } from '@/domain/authentication'
import { random } from 'faker'

export const mockUserTypeModel = (): UserTypeModel => random.arrayElement<UserTypeModel>(Object.values(UserTypeModel))

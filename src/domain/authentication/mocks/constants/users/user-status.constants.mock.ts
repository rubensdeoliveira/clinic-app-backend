import { UserStatusModel } from '@/domain/authentication'
import { random } from 'faker'

export const mockUserStatusModel = (): UserStatusModel => random.arrayElement<UserStatusModel>(Object.values(UserStatusModel))

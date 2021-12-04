import { UserTypeModel } from '@/domain/authentication'

export interface ListUserTypesUseCase {
  list: (authenticatedUserType: UserTypeModel) => Promise<UserTypeModel[]>
}

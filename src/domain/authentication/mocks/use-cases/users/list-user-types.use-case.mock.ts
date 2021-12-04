import { UserTypeModel, mockUserTypeModel, ListUserTypesUseCase } from '@/domain/authentication'

export class ListUserTypesUseCaseSpy implements ListUserTypesUseCase {
  authenticatedUserType: UserTypeModel
  types: UserTypeModel[] = [
    mockUserTypeModel(),
    mockUserTypeModel(),
    mockUserTypeModel()
  ]

  async list (authenticatedUserType: UserTypeModel): Promise<UserTypeModel[]> {
    this.authenticatedUserType = authenticatedUserType
    return this.types
  }
}

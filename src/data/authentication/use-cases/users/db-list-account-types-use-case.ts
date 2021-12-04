import { UserType, ListUserTypeUseCase } from '@/domain/authentication'

export class DbListUserTypeUseCase implements ListUserTypeUseCase {
  async list (authenticatedUserType: UserType): Promise<UserType[]> {
    switch (authenticatedUserType) {
      case UserType.institutionalAdministrator:
        return [
          UserType.athlete,
          UserType.coach,
          UserType.institutionalAdministrator,
          UserType.responsible
        ]
      case UserType.platformManager:
        return [
          UserType.institutionalAdministrator,
          UserType.platformManager
        ]
      default:
        return []
    }
  }
}

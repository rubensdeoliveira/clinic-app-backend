import { UserModel } from '@/domain/authentication'

export interface GetUserByEmailRepository {
  getByEmail: (email: string) => Promise<UserModel>
}

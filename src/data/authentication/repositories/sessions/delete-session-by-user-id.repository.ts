export interface DeleteSessionByUserIdRepository {
  deleteByUserId: (userId: string) => Promise<void>
}

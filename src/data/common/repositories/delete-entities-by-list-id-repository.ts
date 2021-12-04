export interface DeleteEntitiesByListIdRepository<EntityType> {
  deleteByListId: (listEntityId: string[]) => Promise<EntityType | undefined>
}

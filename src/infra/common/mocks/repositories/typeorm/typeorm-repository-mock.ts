export class TypeOrmRepositorySpy<Entity = object> {
  create (entity: Entity): Entity {
    return entity
  }

  save (entity: Entity): Entity {
    return entity
  }
}

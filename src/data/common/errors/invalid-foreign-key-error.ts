export class InvalidForeignKeyError extends Error {
  constructor (constraint: string) {
    super(`Constraint ${constraint} provided is invalid`)
    this.name = 'InvalidForeignKeyError'
  }
}

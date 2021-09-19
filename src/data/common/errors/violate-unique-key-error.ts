export class ViolateUniqueKeyError extends Error {
  constructor (constraint: string) {
    super(`Unique key ${constraint} is violated`)
    this.name = 'ViolateUniqueKeyError'
  }
}

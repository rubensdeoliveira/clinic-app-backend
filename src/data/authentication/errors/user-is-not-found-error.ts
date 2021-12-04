export class UserIsNotFoundError extends Error {
  constructor () {
    super('User is not found')
    this.name = 'UserIsNotFoundError'
  }
}

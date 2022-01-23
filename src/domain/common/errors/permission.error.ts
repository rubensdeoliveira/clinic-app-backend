export class PermissionError extends Error {
  constructor() {
    super('You do not have necessary permission')
    this.name = 'PermissionError'
  }
}

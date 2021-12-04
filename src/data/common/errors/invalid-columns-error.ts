export class InvalidColumnsError extends Error {
  constructor () {
    super('Invalid columns is provided')
    this.name = 'InvalidColumnsError'
  }
}

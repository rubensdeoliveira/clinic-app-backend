export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Column ${paramName} is required and did not provided or null`)
    this.name = 'MissingParamError'
  }
}

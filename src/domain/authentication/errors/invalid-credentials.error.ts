export class InvalidCredentialsError extends Error {
  constructor() {
    super('Email or password incorrect')
    this.name = 'InvalidCredentialsError'
  }
}

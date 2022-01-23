export class RefreshTokenError extends Error {
  constructor() {
    super('Refresh token does not exists!')
    this.name = 'RefreshTokenError'
  }
}

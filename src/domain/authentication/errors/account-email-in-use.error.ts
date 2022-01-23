export class AccountEmailInUseError extends Error {
  constructor() {
    super('Account email is already in use')
    this.name = 'AccountEmailInUseError'
  }
}

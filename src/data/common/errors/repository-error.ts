export class RepositoryError extends Error {
  constructor (
    public readonly code: string,
    public readonly constraint?: string,
    public readonly column?: string
  ) {
    super()
    this.name = 'RepositoryError'
  }
}

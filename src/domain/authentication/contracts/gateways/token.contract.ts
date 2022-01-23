export interface TokenGeneratorContract {
  generateToken: (
    input: TokenGeneratorContract.Input,
  ) => TokenGeneratorContract.Output
}

export namespace TokenGeneratorContract {
  export type Input = {
    key: string
    subject: string
    expirationInMs: number
  }
  export type Output = string
}

export interface TokenValidatorContract {
  validateToken: (
    input: TokenValidatorContract.Input,
  ) => TokenValidatorContract.Output
}

export namespace TokenValidatorContract {
  export type Input = { token: string }
  export type Output = { key: string; sub: string }
}

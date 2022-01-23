export interface HashGeneratorContract {
  generateHash: (
    input: HashGeneratorContract.Input,
  ) => Promise<HashGeneratorContract.Output>
}

export namespace HashGeneratorContract {
  export type Input = { payload: string }
  export type Output = string
}

export interface HashComparatorContract {
  compareHash: (
    input: HashComparatorContract.Input,
  ) => Promise<HashComparatorContract.Output>
}

export namespace HashComparatorContract {
  export type Input = {
    payload: string
    hashedValue: string
  }
  export type Output = boolean
}

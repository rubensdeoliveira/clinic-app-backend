export interface AddDaysToDateContract {
  addDays: (input: AddDaysToDateContract.Input) => AddDaysToDateContract.Output
}

export namespace AddDaysToDateContract {
  export type Input = { days: number }
  export type Output = Date
}

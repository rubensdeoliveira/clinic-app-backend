export class PatientCpfInUseError extends Error {
  constructor() {
    super('Patient cpf is already in use')
    this.name = 'PatientCpfInUseError'
  }
}

export class PatientEmailInUseError extends Error {
  constructor() {
    super('Patient email is already in use')
    this.name = 'PatientEmailInUseError'
  }
}

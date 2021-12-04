import { RequestValidator } from '@/validation/validations'

export const makeAuthenticatedRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('token').required()
  return validator
}

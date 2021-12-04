import { RequestValidator } from '@/validation/validations'

export const makeAccessTokenBodyRequestValidator = (): RequestValidator => {
  const validator = new RequestValidator()
  validator.field('sessionId').required()
  validator.field('accountId').required()
  return validator
}

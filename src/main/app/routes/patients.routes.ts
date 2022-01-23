import { AccountType } from '@/domain/authentication/constants'
import { PatientGender } from '@/domain/backoffice/constants'
import { adaptExpressRoute, adaptExpressMiddleware } from '@/main/app/adapters'
import { makeAuthenticationMiddleware } from '@/main/factories/application/authentication/middlewares'
import {
  makeCreatePatientController,
  makeListPatientsController,
  makeUpdatePatientController,
  makeDeletePatientController,
  makeGetPatientController,
} from '@/main/factories/application/backoffice/controllers'

import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

export default (router: Router): void => {
  router.get(
    '/patients',
    adaptExpressMiddleware(
      makeAuthenticationMiddleware([
        AccountType.manager,
        AccountType.secretary,
        AccountType.professional,
      ]),
    ),
    celebrate({
      [Segments.QUERY]: {
        page: Joi.number(),
      },
    }),
    adaptExpressRoute(makeListPatientsController()),
  )

  router.get(
    '/patients/:id',
    adaptExpressMiddleware(
      makeAuthenticationMiddleware([
        AccountType.manager,
        AccountType.secretary,
        AccountType.professional,
      ]),
    ),
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    adaptExpressRoute(makeGetPatientController()),
  )

  router.post(
    '/patients',
    adaptExpressMiddleware(
      makeAuthenticationMiddleware([
        AccountType.manager,
        AccountType.secretary,
        AccountType.professional,
      ]),
    ),
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        phone: Joi.string().required(),
        gender: Joi.string()
          .valid(PatientGender.female, PatientGender.male, PatientGender.other)
          .required(),
        email: Joi.string().email(),
        birthdate: Joi.date(),
        cpf: Joi.string(),
        occupation: Joi.string(),
        emergency_contact: Joi.string(),
        emergency_phone: Joi.string(),
        more_info: Joi.string(),
        neighborhood: Joi.string(),
        city: Joi.string(),
        address: Joi.string(),
        state: Joi.string(),
      },
    }),
    adaptExpressRoute(makeCreatePatientController()),
  )

  router.put(
    '/patients/:id',
    adaptExpressMiddleware(
      makeAuthenticationMiddleware([
        AccountType.manager,
        AccountType.secretary,
        AccountType.professional,
      ]),
    ),
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        phone: Joi.string().required(),
        gender: Joi.string()
          .valid(PatientGender.female, PatientGender.male, PatientGender.other)
          .required(),
        email: Joi.string().email(),
        birthdate: Joi.date(),
        cpf: Joi.string(),
        occupation: Joi.string(),
        emergency_contact: Joi.string(),
        emergency_phone: Joi.string(),
        more_info: Joi.string(),
        neighborhood: Joi.string(),
        city: Joi.string(),
        address: Joi.string(),
        state: Joi.string(),
      },
    }),
    adaptExpressRoute(makeUpdatePatientController()),
  )

  router.delete(
    '/patients/:id',
    adaptExpressMiddleware(
      makeAuthenticationMiddleware([
        AccountType.manager,
        AccountType.secretary,
        AccountType.professional,
      ]),
    ),
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    adaptExpressRoute(makeDeletePatientController()),
  )
}

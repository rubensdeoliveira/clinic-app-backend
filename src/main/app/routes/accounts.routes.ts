import { adaptExpressRoute } from '@/main/app/adapters'
import { makeRegisterAccountController } from '@/main/factories/application/authentication/controllers'

import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/accounts/register',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      },
    }),
    adaptExpressRoute(makeRegisterAccountController()),
  )
}

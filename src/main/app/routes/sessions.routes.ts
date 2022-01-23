import { adaptExpressRoute as adapt } from '@/main/app/adapters'
import {
  makeCreateSessionController,
  makeRefreshSessionController,
} from '@/main/factories/application/authentication/controllers'

import { celebrate, Segments, Joi } from 'celebrate'
import { Router } from 'express'

export default (router: Router): void => {
  router.post(
    '/sessions/create',
    celebrate({
      [Segments.BODY]: {
        password: Joi.string().required(),
        email: Joi.string().email().required(),
      },
    }),
    adapt(makeCreateSessionController()),
  )

  router.post(
    '/sessions/refresh',
    celebrate({
      [Segments.BODY]: {
        refresh_token: Joi.string().required(),
      },
    }),
    adapt(makeRefreshSessionController()),
  )
}

import { routeAdapter, middlewareAdapter } from '@/main/common/adapters'
import { makeAuthenticatedRequestMiddleware, AuthenticatedRequestMiddlewareProps } from '@/main/factories/authentication/middlewares'
import { makeRefreshAccessTokenController, RefreshAccessTokenControllerProps } from '@/main/factories/authentication/controllers'
import { Router } from 'express'

export type RefreshAccessTokenRouteProps = AuthenticatedRequestMiddlewareProps & RefreshAccessTokenControllerProps

export const makeRefreshAccessTokenRoute = (props: RefreshAccessTokenRouteProps): Router => {
  return Router()
    .post('/refresh',
      middlewareAdapter(makeAuthenticatedRequestMiddleware(props)),
      routeAdapter(makeRefreshAccessTokenController(props)))
}

import { makeLoginRoute, LoginRouteProps } from './login-route'
import { makeRefreshAccessTokenRoute, RefreshAccessTokenRouteProps } from './refresh-access-token-route'
import { Router } from 'express'

export type SessionRouteProps = LoginRouteProps & RefreshAccessTokenRouteProps

export const makeSessionRoute = (props: SessionRouteProps): Router => {
  return Router()
    .use('/sessions', makeLoginRoute(props))
    .use('/sessions', makeRefreshAccessTokenRoute(props))
}

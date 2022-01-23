import { Express } from 'express'
import { errors } from 'celebrate'

export const setupCelebrate = (app: Express): void => {
  app.use(errors())
}

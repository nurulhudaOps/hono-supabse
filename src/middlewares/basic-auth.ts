import { MiddlewareHandler } from 'hono'
import { errorResponse } from '../utils/wrapper.js'

export const basicAuth =
  (): MiddlewareHandler =>
    async (c, next) => {
      const auth = c.req.header('Authorization')

      if (!auth || !auth.startsWith('Basic ')) {
        return c.json(errorResponse('Unauthorized', 401), 401)
      }

      const decoded = atob(auth.replace('Basic ', ''))
      const [username, password] = decoded.split(':')

      if (
        username !== c.env.BASIC_AUTH_USER ||
        password !== c.env.BASIC_AUTH_PASS
      ) {
        return c.json(errorResponse('Invalid credentials', 401), 401)
      }

      c.set('basicUser', { username })
      await next()
    }

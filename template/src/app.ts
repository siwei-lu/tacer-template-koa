import Koa from 'koa'
import koaBody from 'koa-body'
import koaLogger from 'koa-logger'
import cors from '@koa/cors'
import router from './router'

const app = new Koa()

if (process.env.NODE_ENV === 'development') {
  app.use(cors())
  app.use(koaLogger())
}

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

export default app

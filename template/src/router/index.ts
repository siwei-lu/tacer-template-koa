import Router from 'koa-router'
import tacer from './tacer'

const router = new Router().use(tacer.routes(), tacer.allowedMethods())

export default router

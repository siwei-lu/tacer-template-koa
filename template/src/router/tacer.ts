import Router from 'koa-router'

const tacer = new Router().get('/', ctx => {
  ctx.body = 'Hello, tacer'
})

export default tacer

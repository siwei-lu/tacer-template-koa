import Router from 'koa-router'

const tacer = new Router().get('/', ctx => {
  ctx.body = 'Hello, taceo'
})

export default tacer

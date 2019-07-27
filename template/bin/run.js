#!/usr/bin/env node
const app = require('..')
const port = process.env.PORT || 3000

app.listen(port)
console.log('Server is running at http://localhost:%s', port)

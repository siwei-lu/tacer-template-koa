const outdir = process.argv[2]
const app = require(outdir)
const port = process.env.PORT || 3000

app.listen(port)
console.log('Server is running at http://localhost:%s', port)

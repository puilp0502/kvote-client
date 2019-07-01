const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

const { createServer } = require('http')

const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

app.prepare().then(() => {
  createServer(handler).listen(normalizePort(process.env.PORT || 3000))
})

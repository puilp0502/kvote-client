const routes = require('next-routes')


module.exports = routes()
.add('vote', '/vote/:code')

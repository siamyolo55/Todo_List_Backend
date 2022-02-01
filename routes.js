// dependencies
const {loginHandler} = require('./handlers/routeHandlers/loginHandler')
const {signUpHandler} = require('./handlers/routeHandlers/signUpHandler')
const {homeHandler} = require('./handlers/routeHandlers/homeHandler')

const routes = {
    '' : loginHandler,
    'signup' : signUpHandler,
    'home' : homeHandler
}

module.exports = routes

// dependencies
const http = require('http')
const path = require('path')
const dotenv = require('dotenv')
const {handleReqRes} = require('./handlers/handleReqRes')

// module scaffolding
app = {}

// configuration
app.config = {
    port : process.env.PORT || 4000
}

dotenv.config({
    path: path.resolve(__dirname, '.env')
})

// create Server
app.createServer = () => {
    
    const server = http.createServer(app.handleReqRes)
    server.listen(app.config.port, () => {
        console.log(`listening on port ${app.config.port}`)
        console.log(process.env.NODE_ENV)
    })
}
// handle Request Response  
app.handleReqRes = handleReqRes

app.createServer()

// dependencies
const http = require('http')
//const cors = require('cors')
const {handleReqRes} = require('./handlers/handleReqRes')

// module scaffolding
app = {}

// configuration
app.config = {
    port : 4000
}

// create Server
app.createServer = () => {

    /* const options = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT,DELETE',
    } */
    const server = http.createServer(app.handleReqRes)
    server.listen(app.config.port, () => {
        console.log(`listening on port ${app.config.port}`)
    })
}
// handle Request Response  
app.handleReqRes = handleReqRes

app.createServer()
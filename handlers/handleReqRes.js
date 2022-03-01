// dependencies
const url = require('url')
const { StringDecoder } = require('string_decoder');
const routes = require('../routes')
const {notFoundHandler} = require('./routeHandlers/notFoundHandler')
const {parseJSON} = require('../utilities/utilities')

// module scaffolding
const handler = {}

handler.handleReqRes = (req,res) => {
    // request handler

    // get url & parse it
    const parsedUrl = url.parse(req.url,true)
    const pathname = parsedUrl.pathname
    const trimmedPath = pathname.replace(/^\/+|\/+$/g,'')
    const method = req.method.toLowerCase()
    const queryStringObject = parsedUrl.query
    const headersObject = req.headers

    const requestProperties = {
        parsedUrl,
        pathname,
        trimmedPath,
        method,
        queryStringObject,
        headersObject
    }


    // data gathering
    let data = ''
    const decoder = new StringDecoder('utf-8')
    req.on('data',(buffer) => {
        data += decoder.write(buffer)
    })
    req.on('end',(buffer) => {
        if(buffer !== undefined){
            data += decoder.write(buffer)
        }

        requestProperties.body = parseJSON(data)

        const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler

        chosenHandler(requestProperties, (statusCode , payload) => {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 500
            payload = typeof(payload) === 'object' ? payload : {}

            const payLoadString = JSON.stringify(payload)
            res.writeHead(statusCode)
            res.end(payLoadString)
        })
    })
    

}

module.exports = handler
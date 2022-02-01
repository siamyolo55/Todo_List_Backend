// dependencies
const url = require('url')
//const fs = require('fs')
const { StringDecoder } = require('string_decoder');
//const ejs = require('ejs')
//const pug = require('pug')
const routes = require('../routes')
const {notFoundHandler} = require('./routeHandlers/notFoundHandler')
const {parseJSON} = require('../utilities/utilities')
//const cors = require('cors')
//
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
    // access to all
    /* res.writeHead(201,{
        'Content-Type' : 'application/json'
    }) */

    /* res.writeHead('Access-Control-Allow-Methods', 'DELETE, POST, GET, PUT, OPTIONS')
    res.writeHead('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    res.writeHead("Access-Control-Allow-Origin", "*");
    res.writeHead("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); */

    res.writeHead(201,{
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
    });


    // data gathering
    let data = ''
    const decoder = new StringDecoder('utf-8')
    req.on('data',(buffer) => {
        data += decoder.write(buffer)
        //data += JSON.stringify(buffer)
        //data += buffer
    })
    req.on('end',(buffer) => {
        if(buffer !== undefined){
            data += decoder.write(buffer)
        }
        //data += JSON.stringify(buffer)
        //data += buffer

        //let stringData = JSON.stringify(data)

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
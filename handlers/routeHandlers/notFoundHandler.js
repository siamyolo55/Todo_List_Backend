// dependencies

// module scaffolding

const handler = {}

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404,{
        message : "Not found"
    })
}

module.exports = handler
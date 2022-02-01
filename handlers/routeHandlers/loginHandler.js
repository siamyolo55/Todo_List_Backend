
// dependencies
const mongoose = require('mongoose')
const User = require('../../db/User')

// module scaffolding
const handler = {}

// mongodb connection

mongoose.connect("mongodb://127.0.0.1:27017/UserData")


async function getUserData(email,password){
    try{
        const user = await User.find({email:email,password:password})
        handler.data = user[0]
        return (user.length > 0)
    }
    catch(e){
        console.log(e)
    }

}

handler.loginHandler = (requestProperties,callback) => {
    const acceptedMethods = 'post'
    if(acceptedMethods === requestProperties.method){
        handler._login[requestProperties.method](requestProperties,callback)    
    }
    else{
        callback(405,{
            message : 'Wrong Request Method'
        })
    }
}


handler._login = {}

handler._login.post = async (requestProperties,callback) => {
    const email = requestProperties.body.email
    const password = requestProperties.body.password
    // received email and password , next up database addition

    let check = await getUserData(email,password)
    //console.log(userData, "from here")
    //console.log(check)
    let statusCode = (check == true) ? 201 : 204
    let message = (check == true) ? 'login successful' : 'email or password wrong'
    //console.log(statusCode,handler.data)

    callback(statusCode,{
        userData : handler.data,
        message: message
    })
}

module.exports = handler

// dependencies
const mongoose = require('mongoose')
const User = require('../../db/User')

// module scaffolding
const handler = {}

// mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/UserData")

// uuid generator
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
}

// add to db func

async function addToDb(requestProperties){
    try{
        let name = requestProperties.body.name
        let email = requestProperties.body.email
        let password = requestProperties.body.password
        const user = await User.create({
            id : uuid(),
            name : name,
            email : email,
            password : password
        })
        //console.log(user)
        await user.save()
    }
    catch(e){
        console.log("didn't work")
    }
}




handler.signUpHandler = (requestProperties,callback) => {
    const acceptedMethods = 'post'
    if(acceptedMethods === requestProperties.method){
        handler._signUp[requestProperties.method](requestProperties,callback)    
    }
    else{
        callback(405,{
            message : 'Wrong Request Method'
        })
    }
}

handler._signUp = {}

handler._signUp.post = (requestProperties,callback) => {

    // add to database
    addToDb(requestProperties)

    callback(201,{
        message: 'signup successful'
    })
}

module.exports = handler
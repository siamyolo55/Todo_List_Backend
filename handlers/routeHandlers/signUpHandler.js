
// dependencies
const mongoose = require('mongoose')
const User = require('../../db/User')

// module scaffolding
const handler = {}

const url = "mongodb+srv://siam-titan:abrarsiamtitan@cluster0.98epk.mongodb.net/UserData?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// mongoose connection
mongoose.connect(url,connectionParams)

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

handler._signUp.get = (requestProperties,callback) => {
    callback(200,{
        message: 'server running'
    })
}

handler._signUp.post = (requestProperties,callback) => {

    // add to database
    addToDb(requestProperties)

    callback(201,{
        message: 'signup successful'
    })
}

module.exports = handler
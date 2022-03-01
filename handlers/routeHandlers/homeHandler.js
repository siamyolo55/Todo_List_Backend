
// dependencies
const mongoose = require('mongoose')
const User = require('../../db/User')

// module scaffolding
const handler = {}


// mongodb connection
const url = "mongodb+srv://siam-titan:abrarsiamtitan@cluster0.98epk.mongodb.net/UserData?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url,connectionParams)

// uuid generator
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
}



async function getUserData(email,password){
    try{
        const user = await User.find({email:email,password:password})
        return user[0].todos
    }
    catch(e){
        console.log('error getting toods')
    }
}

async function addData(requestProperties){
    let user = await User.find({email:requestProperties.body.email})
    user[0].todos.push({
        event : requestProperties.body.event,
        description : requestProperties.body.description,
        time : requestProperties.body.time,
        date : requestProperties.body.date,
        priority : requestProperties.body.priority,
        uniq : uuid(),
        check : requestProperties.body.check
    })
    await user[0].save()
    return user[0].todos
}

async function updateUserData(data){
    try{
        const user = await User.find({email:data.email})
        if(data.uniq != undefined && (data.event == null || data.event == undefined)){
            for(let i=0 ;i<user[0].todos.length; i++){
                if(user[0].todos[i].uniq === data.uniq){
                    user[0].todos[i].check = data.check
                    await user[0].save()
                    return todos = user[0].todos
                }
            }
        }
        else{
            for(let i=0 ;i<user[0].todos.length; i++){
                if(user[0].todos[i].uniq === data.uniq){
                    user[0].todos[i].event = data.event
                    user[0].todos[i].description = data.description
                    user[0].todos[i].time = data.time
                    user[0].todos[i].date = data.date
                    user[0].todos[i].uniq = data.uniq
                    user[0].todos[i].priority = data.priority
                    user[0].todos[i].check = data.check
                    await user[0].save()
                    return todos = user[0].todos
                }
            }
        }
    }
    catch(e){
        console.log('error updating')
    }
}

async function deleteUserData(data){
    try{
        let user = await User.find({email:data.email})
        for(let i=0 ;i<user[0].todos.length; i++){

            if(user[0].todos[i].uniq === data.uniq){
                user[0].todos.splice(i,1)
                await user[0].save()
                return todos = user[0].todos
            }
        }
    }
    catch(e){
        console.log('error deleting')
    }
}

handler.homeHandler = (requestProperties,callback) => {
    const acceptedMethods = ['get','post','put','delete']
    if(acceptedMethods.indexOf(requestProperties.method) > -1 ){
        handler._home[requestProperties.method](requestProperties,callback)    
    }
    else{
        callback(405,{
            message : 'Wrong Request Method'
        })
    }
}

handler._home = {}

handler._home.get = (requestProperties,callback) => {
    callback(200,{
        message: 'server running'
    })
}

handler._home.post = async (requestProperties,callback) => {
    const email = requestProperties.body.email
    const password = requestProperties.body.password
    let todos = password === null || password === undefined ? await addData(requestProperties) : await getUserData(email,password)

    callback(201,{
        todos : todos
    })
}

handler._home.put = async (requestProperties,callback) => {
    const data = requestProperties.body

    let todos =  await updateUserData(data)
    console.log(todos)
    callback(200,{
        todos : todos
    })
}

handler._home.delete = async (requestProperties,callback) => {
    const data = requestProperties.queryStringObject
    console.log(data)
    let todos = await deleteUserData(data)

    callback(200,{
        todos : todos
    })
}

module.exports = handler
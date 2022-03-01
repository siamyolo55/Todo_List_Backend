const mongoose = require('mongoose')
const Users = require('./User')


const url = "mongodb+srv://siam-titan:abrarsiamtitan@cluster0.98epk.mongodb.net/UserData?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams)

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
}

run()

async function run(){
    try{
        const user = await Users.create({
            id : uuid(),
            name : "Abrar Siam",
            email : "abrarsiam801@gmail.com",
            password : "abrar@123",
            todos : [
                {
                    event : "Breakfast",
                    description : "khao",
                    time : "8:00",
                    date : "2021-12-12",
                    uniq : uuid(),
                    priority : 2,
                    check : false
                },
                {
                    event : "Lunch",
                    description : "khao",
                    time : "13:30",
                    date : "2021-12-12",
                    uniq : uuid(),
                    priority : 1,
                    check : true
                },
                {
                    event : "Binner",
                    description : "khao",
                    time : "13:30",
                    date : "2021-12-17",
                    uniq : uuid(),
                    priority : 3,
                    check : true
                }

            ]
        })
        console.log(user)
        await user.save()
        console.log("doneee")
    }
    catch(e){
        console.log("didn't work")
    }
}
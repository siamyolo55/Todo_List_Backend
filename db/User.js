const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id : String,
    name : String,
    email : String,
    password : String,
    todos : [
        {
            event : String,
            description : String,
            time : String,
            date : String,
            uniq : String,
            priority : Number,
            check : Boolean
        }
    ]
})

module.exports = mongoose.model("Users",userSchema)
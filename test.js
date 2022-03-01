const mongoose = require('mongoose')

const url = "mongodb+srv://siam-titan:abrarsiamtitan@cluster0.98epk.mongodb.net/UserData?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParams).then(() => {
    console.log('worked')
}).catch((err) => {
    console.log(err)
})
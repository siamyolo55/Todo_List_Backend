let loginForm = document.querySelector("#loginForm")


async function userInfo(){
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    //console.log(name,password)     

    // MAJOR CHANGES HERE

    let result = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`)
    console.log(result)

    if(result.status==200 && result.data.length==1){
        localStorage.setItem("user-info",JSON.stringify(result.data[0]))
        window.location.href = "pages/home.html"   
    }
    else{
        document.getElementById('wrong').style.display = "block"
        return setTimeout(() => {
            document.getElementById('wrong').style.display = "none"
        }, 2000);
    }
}

function showForm(){
    document.getElementById('showForm').style.display = "block"
    document.getElementById('first').style.display = "none"
    document.getElementById('second').style.display = "none"
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

loginForm.addEventListener('submit', (e) => {
    console.log("reached here")
    e.preventDefault()
    userInfo()
})

let signUp = document.getElementById('signUp')

signUp.addEventListener('click',async (e)=>{
    e.preventDefault()
    let name = document.getElementById('sname').value
    let email = document.getElementById('semail').value
    let password = document.getElementById('spassword').value
    let id = uuid()

    let result = await axios.post("http://localhost:3000/users",{
        name : name,
        email : email,
        password : password,
        todos : [],
        id : id
    })
    console.log(result)

    if(result.status!=201 || result.data.length<=0){
        document.getElementById('error').style.display = "block"
        return setTimeout(() => {
            document.getElementById('error').style.display = "none"
        }, 2000);
    }

    document.getElementById('first').style.display = "block"
    document.getElementById('second').style.display = "block"
    document.getElementById('showForm').style.display = "none"
})

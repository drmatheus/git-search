/* Desenvolva sua lógica aqui...*/

let inputName = document.querySelector("#user")
let buttonFind = document.querySelector("#goFind")
let recentProfileArray = []



async function saveRecentProfiles(){
    if(!localStorage.getItem("recentProfiles")){
        localStorage.setItem("recentProfiles", JSON.stringify(recentProfileArray))        
    }else if(JSON.parse(localStorage.getItem("recentProfiles")).length < recentProfileArray.length){
        if(recentProfileArray.length > 3){
            recentProfileArray.splice(3)
        }
       let myProfiles = localStorage.setItem("recentProfiles", JSON.stringify(recentProfileArray))
       myProfiles = localStorage.getItem("recentProfiles")
        recentProfileArray = [...JSON.parse(myProfiles)] 

    }else{
       let myProfiles = localStorage.getItem("recentProfiles")
        recentProfileArray = [...JSON.parse(myProfiles)]  
    } 
}

async function createRecentProfiles (Array){
    
    Array.forEach( async (newUser)=>{

        let user = await fetch(`https://api.github.com/users/${newUser}`)
        userJson = await user.json()

        let myName = userJson.login

        let userDiv = document.createElement("div")
        userDiv.classList.add("tooltip")

        let userPic = document.createElement("img")
        userPic.src = `${userJson.avatar_url}` 

        let acessProfile = document.createElement("span")
        acessProfile.innerText = "Acessar este perfil"
        acessProfile.classList.add("tooltiptext")
        acessProfile.addEventListener("click",()=>{
            localStorage.setItem("mySearch",JSON.stringify(myName))
            location.assign("./pages/profile/index.html")
        })

        userDiv.append(userPic, acessProfile)

        let recentProfileRender = document.querySelector("#recentProfiles")

        recentProfileRender.appendChild(userDiv)

    })
}

function mySpinnerButton(){
    console.dir(buttonFind)
    if(buttonFind.classList.contains("spinner")){
        buttonFind.classList.toggle("spinner")
        buttonFind.innerText = "Ver perfil do github"
    }else{
        buttonFind.classList.toggle("spinner")
        buttonFind.innerHTML = `<img  class= "loadSpinner" src="./assets/img/loading.svg" alt="Spinner">`
    }
}

function showMyAlert(){
    let alert = document.querySelector(".alert")
    alert.classList.remove("hideMe")
}

function removeMyAlert(){
    let alert = document.querySelector(".alert")
    alert.classList.add("hideMe")
}

buttonFind.addEventListener("click", async () => {

    mySpinnerButton()
    setTimeout(async ()=>{
        let testingUser = await fetch(`https://api.github.com/users/${inputName.value}`)
    if(testingUser.ok){
       if(recentProfileArray[0] != inputName.value && recentProfileArray[1] != inputName.value){
                recentProfileArray.unshift(inputName.value)    
              }      
              saveRecentProfiles()
              mySpinnerButton()
              removeMyAlert()
              location.assign("./pages/profile/index.html")  
    }else{
            showMyAlert()
            mySpinnerButton()
    }

    }, 1500)
    

})

inputName.addEventListener("keyup", () => {    
    if(inputName.value.trim().length > 0) {
        buttonFind.disabled = false
        localStorage.setItem("mySearch",JSON.stringify(inputName.value))
        
    }else{
        buttonFind.disabled = true
    }
}
)

saveRecentProfiles()
createRecentProfiles (recentProfileArray)
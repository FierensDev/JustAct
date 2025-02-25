//import Elements from the HTML
let presentation = document.getElementById("presentation")
let LinkToSignIn = document.getElementById("LinkToSignIn")
let LinkToSignUp = document.getElementById("LinkToSignUp")
let LinksToPresentation = document.querySelectorAll(".LinkToPresentation")
let signInPage = document.getElementById("signInPage")
let signUpPage = document.getElementById("signUpPage")
let SignInToSignUp = document.getElementById("SignInToSignUp")
let SignUpToSignIn = document.getElementById("SignUpToSignIn")
let quitCreateTask= document.getElementById("quitCreateTask")
let openFormCreateTask = document.getElementById("openFormCreateTask")


//Function to move
export function linkTo(fromPage, toPage){
  fromPage.style.display = "none"
  toPage.style.display = "flex"
}

export function linkToPresentation(){
  presentation.style.display = "flex"
  signInPage.style.display = "none"
  signUpPage.style.display = "none"
}

export function showConnectionPage(){
  document.getElementById("presentation").style.display = "flex";
}

export function showHomePage(){
  document.getElementById("homePage").style.display = "flex";
}

//Add events to elements
LinkToSignIn.addEventListener("click", () => linkTo(presentation, signInPage))
LinkToSignUp.addEventListener("click", () => linkTo(presentation, signUpPage))
SignInToSignUp.addEventListener("click", () => linkTo(signInPage, signUpPage))
SignUpToSignIn.addEventListener("click", () => linkTo( signUpPage, signInPage))

quitCreateTask.addEventListener("click", () => mobileCreateTask.style.display = "none" ) 
openFormCreateTask.addEventListener("click", () => mobileCreateTask.style.display = "flex")

LinksToPresentation.forEach((LinkToPresentation) => {
  LinkToPresentation.addEventListener("click", () => {
    linkToPresentation();
  })
})


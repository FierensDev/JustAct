export function checkInputText(input){
  if(input.value == ""){
    input.style = "border: 2px solid red;"
    return false;
  } 
  input.style = "border: 2px solid black;"
  return true;
}

export function emailIsValid(email){
  let myRegex = /^[a-zA-Z0-9._]{3,20}@[a-zA-Z]{3,20}\.[a-z]{2,3}$/
  return myRegex.test(email)
}

export function passwordIsValid(password){
  let myRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/
  return myRegex.test(password)
}


export function showError(){
  let formError = document.getElementById("formError")

  formError.innerHTML = ""
  console.log(window.formError)
  Object.entries(window.formError).forEach(([key, value]) => {
    console.log(key,value)
    if(value !== false){
      formError.innerHTML += "<div>"+key+" : " +value+"</div>"
    }
  })
}

let SignUpError = document.getElementById("SignUpError")

export function refreshSignUpErrors(){
  console.log(window.singUpErrors)

  let err = window.singUpErrors
  let SignUpError = document.getElementById("SignUpError")
  SignUpError.innerHTML = ""
  Object.entries(err).forEach((e) => {
    console.log("key:", e[0], 'value:', e[1])

    if(e[1] === false){
      return
    } else {
      SignUpError.innerHTML += `<p class="error-text">${e[1]}</p>`
    }
  })

}

export function refreshSignInErrors(){
  let SignInError = document.getElementById("SignInError")
  SignInError.innerHTML = ""

  if(window.SignInError){
    SignInError.innerHTML += `<p class="error-text">Email ou mot de passe incorrect</p>`
  }

}
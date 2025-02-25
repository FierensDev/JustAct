import { getDatabase, updateDatabase } from "./database.js";
import { emailIsValid, passwordIsValid, refreshSignInErrors } from "./form.js";

let disconnect = document.getElementById("disconnect")

disconnect.addEventListener("click", () => disconnectUser())

export function getUser(){
  let getUser = localStorage.getItem("user");
  if(getUser){
    return JSON.parse(getUser);
  }
  return false;
}

export function updateUser(newUser){
  localStorage.setItem("user", JSON.stringify(newUser))
}

export function signIn(email, password){
  let userExist = window.database.user.find((user) =>{ 
    if(user.email === email && user.password === password){
      return user
    }
    return false;
  });

  if(!userExist){
    window.singInErrors = true;
    refreshSignInErrors();
    return
  }
  
  localStorage.setItem("user", JSON.stringify(userExist));
  window.location.reload();
}

export function signUp(email, password){
  let db = getDatabase();
  let maxId = db.user.reduce((max, user) => user.id > max ? user.id : max, 0)

  if(emailIsValid(email) && passwordIsValid(password)){
    let newUser =  {
      id: maxId+1,
      email: email,
      password: password,
      task: []
    };

    db.user.push(newUser);
    updateDatabase(db);

    return true;
  }
  return false;
}

export function disconnectUser(){
  localStorage.removeItem("user")
  window.location.reload()
}
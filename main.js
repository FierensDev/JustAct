import * as Router from "./utils/router.js";
import { getUser, signIn, signUp } from "./utils/user.js";
import { getDatabase, updateDatabase } from "./utils/database.js";
import { createTaskCard, findTask, getMaxTaskId, getTasks, pushTask, refreshTasks } from "./utils/task.js";
import { emailIsValid, passwordIsValid, refreshSignUpErrors } from "./utils/form.js";

//import Elements from the HTML
let formSignUp = document.getElementById("formSignUp");
let emailSignUp = document.getElementById("emailSignUp");
let passwordSignUp = document.getElementById("passwordSignUp");
let emailSignIn = document.getElementById("emailSignIn");
let passwordSignIn = document.getElementById("passwordSignIn");
let mobileCreateTask = document.getElementById("mobileCreateTask");
let formCreateTaskPhone = document.getElementById("formCreateTaskPhone")
let homeTaskContainer = document.getElementById("homeTaskContainer")
let searchTask = document.getElementById("searchTask");
let formCreateTask = document.getElementById("formCreateTask");
let formSignIn = document.getElementById("formSignIn");

//=== Manage Localstorage
//localstorage : Get database or create it
getDatabase();

//localstorage : Get user 
let user = getUser();

if(!user){
  Router.showConnectionPage();
} else {
  Router.showHomePage();
  refreshTasks();
}

//=== Add events to elements
//search elements
searchTask.addEventListener("keyup", (e) => {
 let result = findTask(searchTask.value);
  if(result){
    homeTaskContainer.innerHTML = "";
    result.forEach((task, index) => {
      let taskElement = createTaskCard(task, index)
      homeTaskContainer.appendChild(taskElement);
    })
  }
})

//Create task (responsive: phone)
formCreateTaskPhone.addEventListener("submit", (e) => {
   e.preventDefault();
   if(document.getElementById("titlePhone").value === ""){
    alert("Le champ titre ne doit pas etre vide")
    return;
   }
   if(document.getElementById("contentPhone").value === ""){
    alert("Le champ contenue ne doit pas etre vide")
    return;
   }
   if(document.getElementById("datePhone").value === ""){
    alert("Le champ date ne doit pas etre vide")
    return;
   }
    let task = {
      id: getMaxTaskId(),
      title: document.getElementById("titlePhone").value,
      describe: document.getElementById("contentPhone").value,
      isValidate: false,
      deadline: document.getElementById("datePhone").value
    }
  
    pushTask(task);
    mobileCreateTask.style.display = "none"
    refreshTasks();
})

//Create task (responsive: tablet+)
formCreateTask.addEventListener("submit", (e) => {
  e.preventDefault();

  if(document.getElementById("title").value === ""){
    alert("Le champ titre ne doit pas etre vide")
    return;
   }
   if(document.getElementById("content").value === ""){
    alert("Le champ contenue ne doit pas etre vide")
    return;
   }
   if(document.getElementById("date").value === ""){
    alert("Le champ date ne doit pas etre vide")
    return;
   }
   let task = {
    id: getMaxTaskId(),
     title: document.getElementById("title").value,
     describe: document.getElementById("content").value,
     isValidate: false,
     deadline: document.getElementById("date").value
   }
 
   pushTask(task);
   mobileCreateTask.style.display = "none"
   refreshTasks();
})

//Sign up user
formSignUp.addEventListener("submit", (e) => {
  e.preventDefault();
  if(signUp(emailSignUp.value, passwordSignUp.value)){
    Router.linkTo(signUpPage, signInPage);
  }
})

//Sign in user
formSignIn.addEventListener("submit", (e) => {
  e.preventDefault();
  let db = getDatabase();
  
  let email = document.getElementById("emailSignIn").value
  let password = document.getElementById("passwordSignIn").value

  signIn(email, password)
})

//manage errors
window.singUpErrors = {
  emailSignUp: false,
  passwordSignUp: false
}
window.signInError = false;

//Show an error if email is not valid
emailSignUp.addEventListener("blur", () => {
  if(!emailIsValid(emailSignUp.value)){
   window.singUpErrors.emailSignUp = "Email incorrect. (exemple d'email correct : dev.fierens@gmail.com" 
  } else {
    window.singUpErrors.emailSignUp = false
  }
  refreshSignUpErrors()
})

//Show an error if password is not valid
passwordSignUp.addEventListener("blur", () => {
  if(!passwordIsValid(passwordSignUp.value)){
   window.singUpErrors.passwordSignUp = "Le mot de passe doit contenir au minimum 6caracteres minimum dont : 1 majuscule, 1 minuscule, 1 nombre" 
  } else {
    window.singUpErrors.passwordSignUp = false
  }
  refreshSignUpErrors()
})


//Date on home page
let dateOfTheDay = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).split(" ");

let dateMonth =  document.getElementById("dateMonth")
let dateNumber = document.getElementById("dateNumber")
let dateDay = document.getElementById("dateDay")

dateMonth.innerHTML = dateOfTheDay[2].substring(0,3)
dateNumber.innerHTML = dateOfTheDay[1].length === 1 ? "0" + dateOfTheDay[1] : dateOfTheDay[1]
dateDay.innerHTML = dateOfTheDay[0]
//Get database from localstorage
export function getDatabase(){
  //add db to global to interact with it more easily
  window.database = JSON.parse(localStorage.getItem("todo_database"))
  
  if(window.database !== null){
    return window.database
  } else {
    localStorage.setItem("todo_database", JSON.stringify({ user : []}))
    window.database = JSON.parse(localStorage.getItem("todo_database"))
  }
}

//update database (you get the db first, apply your modify and push the new db)
export function updateDatabase(newDb){
  localStorage.setItem("todo_database", JSON.stringify(newDb))
  getDatabase();
}
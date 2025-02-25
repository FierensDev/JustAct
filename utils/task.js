import { updateDatabase } from "./database.js";
import { getUser, updateUser } from "./user.js";

//Get all tasks from the user
export function getTasks(){
  let tasks = JSON.parse(localStorage.getItem("user"));
  return tasks.task
}

//Create task card
export function createTaskCard(task, index){
 
  //First: create an element to interact with THIS element later
  let taskElement = document.createElement("div");
  taskElement.id = `task_${index}`;
  taskElement.classList.add("task");

  //Add other style
  taskElement.innerHTML = task.isValidate ? 
  `
  <div class="circle-validate">
    <svg width="10" height="7.77">
      <use xlink:href="svg/checkmark.svg#checkmark"></use>
    </svg>
  </div>
  <div>
    <p class="text-lg font-semibold color-subtitle">${task.title}</p>
    <p class="text-sm font-extralight color-subtitle">${task.describe}</p>
    <p class="font-thin text-xs color-subtitle">${task.deadline}</p>
  </div>
  `
  : 
  `
  <div class="circle">
  </div>
  <div id="taskDelete" class="rounded-full">
    <p id="delete">Supprimer la tache</p>
  </div>
  <div>
    <p class="text-lg font-semibold">${task.title}</p>
    <p class="text-sm font-extralight">${task.describe}</p>
    <p class="font-thin text-xs color-subtitle">${task.deadline}</p>
  </div>
`;

//Add event to THIS element
let taskDelete = taskElement.querySelector("#taskDelete");
let deleteButton = taskElement.querySelector("#delete");

if(deleteButton) {
  deleteButton.addEventListener("click", (e) => {
    e.stopPropagation()
    removeTask(task.id);
  })
}
taskElement.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  taskDelete.style.display = taskDelete.style.display === "flex" ? "none" : "flex"
  console.log("rigt clic", index)
});

 taskElement.addEventListener("click", () => {
  
   updateIsValidate(index); 
 });

 return taskElement;
}

//Update display task on every action
export function refreshTasks() {
  let homeTaskContainer = document.getElementById("homeTaskContainer")
  let tasks = getTasks();
  homeTaskContainer.innerHTML = "";

  tasks.forEach((task, index) => {
    let taskElement = createTaskCard(task, index)
    homeTaskContainer.appendChild(taskElement);
  })
}

//Remove task
export function removeTask(id){
  
  let user = getUser();
  let indexOf = user.task.findIndex((t) => t.id === id)
  user.task.splice(indexOf, 1)
  updateUser(user)

  let newDb = window.database.user.map((u, k) => {
    return u.id === user.id ? user : u
  })

  updateDatabase({user: newDb});
  refreshTasks();
}

//Add task
export function pushTask(task){
    let user = getUser();
    user.task.push(task)
    updateUser(user)
  
    let newDb = window.database.user.map((u, k) => {
      return u.id === user.id ? user : u
    })
  
    updateDatabase({user: newDb});
}

//Update the isValidate champ on the task
export function updateIsValidate(index){
  let user = getUser();
  user.task[index].isValidate = !user.task[index].isValidate
  updateUser(user)

  let newDb = window.database.user.map((u, k) => {
    return u.id === user.id ? user : u
  })

  updateDatabase({user: newDb});
  refreshTasks();
}

//use to search tasks
export function findTask(text){
  let user = getUser();
  let results = user.task.filter((v) => {
    return v.title.includes(text) || v.describe.includes(text);
  });

  return results;
}

export function getMaxTaskId(){
  
  let user = getUser();
  let maxId = user.task.reduce((max, task) => {
    console.log(task, max)
    return task.id > max ? task.id : max
  }, 0)
  console.log(maxId)
  return maxId+1;
}
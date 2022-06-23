getLocalTodo()
getLocalDone()
var addBtn = document.getElementById("myBtn")

// Input todo by pressing ENTER(clicks on plus sign)
var inputBox = document.getElementById("inputBox") 
inputBox.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    document.getElementById("myBtn").click();
  }
})

// Input todo by clicking plus sign
addBtn.onclick = function(){
  

  if (inputBox.value != ""){
    saveLocal(inputBox.value)
    var div = document.createElement("div")
    var checkIcon = document.createElement("i")
    checkIcon.className = "fa-regular fa-circle-check"
    checkIcon.onclick = function(){
      
      var p = this.parentElement
      removeLocalTodo(p)
      this.remove()
      document.getElementById("completed").append(p)
      location.reload()
      this.parentElement.remove()
   }
    var trashIcon = document.createElement("i")
    trashIcon.className = "fa-regular fa-trash-can"
    trashIcon.onclick = function(){
      var p = this.parentElement
      deleteLocalTodo(p)
      p.remove()
    }
    var text = document.createTextNode(inputBox.value)
    div.append(text, trashIcon, checkIcon)
    document.getElementById("notCompleted").appendChild(div).className = "task"
    inputBox.value = ""
  }
}
// Save items added to your to do list in local storage FUNCTION ATTACHED PLUS ICON
function saveLocal(todo){
  var todos
  if (localStorage.getItem("todos") === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos))
}

// Retrieve items from local storage and build the to do list
function getLocalTodo(){
  var todos
  if (localStorage.getItem("todos") === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.forEach(function(todo) {
    var div = document.createElement("div")
    var checkIcon = document.createElement("i")
    checkIcon.className = "fa-regular fa-circle-check"
    checkIcon.onclick = function(){
      
      var p = this.parentElement
      removeLocalTodo(p)
      this.remove()
      document.getElementById("completed").append(p)
      this.parentElement.remove()
   }
    var trashIcon = document.createElement("i")
    trashIcon.className = "fa-regular fa-trash-can"
    trashIcon.onclick = function(){
      var p = this.parentElement
      deleteLocalTodo(p)
      p.remove()
    }
    var text = document.createTextNode(todo)
    div.append(text, trashIcon, checkIcon)
    document.getElementById("notCompleted").appendChild(div).className = "task"
  });
}

// Retrieve items from local storage and build the done list
function getLocalDone(){
  var done
  if (localStorage.getItem("done") === null){
    done = []
  }else{
    done = JSON.parse(localStorage.getItem("done"))
  }
  done.forEach(function(todo) {
    var div = document.createElement("div")
    
    var trashIcon = document.createElement("i")
    trashIcon.className = "fa-regular fa-trash-can"
    trashIcon.onclick = function(){
      var p = this.parentElement
      removeLocalDone(p)
      p.remove()
    }
    var text = document.createTextNode(todo)
    div.append(text, trashIcon)
    document.getElementById("completed").appendChild(div).className = "task"
  });
}



// Delete the local to do FUNCTION ATTACHED TO DO TRASH CAN
function deleteLocalTodo(todo){
  var todos
  if (localStorage.getItem("todos") === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  const todoElement = todo.innerText
  todos.splice(todos.indexOf(todoElement), 1)
  localStorage.setItem("todos", JSON.stringify(todos))
}


// Function to remove iteams from to do local storage FUNCTION ATTACHED TO DO CHECK
function removeLocalTodo(todo){
  var todos
  if (localStorage.getItem("todos") === null){
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  const todoElement = todo.innerText
  // Removed element from to do list will be saved to done list
  function saveLocalDone(todo){
    var done
    if (localStorage.getItem("done") === null){
      done = []
    }else{
      done = JSON.parse(localStorage.getItem("done"))
    }
    done.push(todo)
    localStorage.setItem("done", JSON.stringify(done))
    location.reload();


  }
  saveLocalDone(todoElement)
  // Delete element from to do list and add it to done(above step)
  todos.splice(todos.indexOf(todoElement), 1)
  localStorage.setItem("todos", JSON.stringify(todos))
}



// Remove element from done list fUNCTION ATTACHED DONE TRASH CAN 
function removeLocalDone(todo){
  var done
  if (localStorage.getItem("done") === null){
    done = []
  }else{
    done = JSON.parse(localStorage.getItem("done"))
  }
  const todoElement = todo.innerText
  
  done.splice(done.indexOf(todoElement), 1)
  localStorage.setItem("done", JSON.stringify(done))
}
/*
//getting elements from their id
const newToDoInput = document.getElementById("newToDoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

//adding event
addTodoBtn.addEventListener("click", () => {
  const newToDoText = newToDoInput.value;
  //logic
  if (newToDoText !== "") {
    const newToDoItem = document.createElement("li");
    newToDoItem.innerText = newToDoText;
    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.innerText = "X";
    deleteTodoBtn.classList.add("delete-todo-btn");
    deleteTodoBtn.addEventListener("click", () => {
      newToDoItem.remove();
    });
    newToDoItem.appendChild(deleteTodoBtn);
    todoList.appendChild(newToDoItem);
    newToDoInput.value = "";
  }
});

*/


// Getting elements from their id
const newToDoInput = document.getElementById("newToDoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

// Load to-do items from local storage on page load
document.addEventListener("DOMContentLoaded", () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  storedTodos.forEach(todoText => {
    const newToDoItem = createToDoItem(todoText);
    todoList.appendChild(newToDoItem);
  });
});

// Adding event
addTodoBtn.addEventListener("click", () => {
  const newToDoText = newToDoInput.value;

  // Logic
  if (newToDoText !== "") {
    const newToDoItem = createToDoItem(newToDoText);
    todoList.appendChild(newToDoItem);

    // Save to local storage
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    storedTodos.push(newToDoText);
    localStorage.setItem("todos", JSON.stringify(storedTodos));

    newToDoInput.value = "";
  }
});

function createToDoItem(text) {
  const newToDoItem = document.createElement("li");
  newToDoItem.innerText = text;
  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.classList.add("delete-todo-btn");
  deleteTodoBtn.innerText = "X";
  deleteTodoBtn.addEventListener("click", () => {
    newToDoItem.remove();

    // Remove from local storage
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const index = storedTodos.indexOf(text);
    if (index !== -1) {
      storedTodos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(storedTodos));
    }
  });

  newToDoItem.appendChild(deleteTodoBtn);

  return newToDoItem;
}

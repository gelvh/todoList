const description = document.querySelector("#desc");
const title = document.querySelector("#title");
const addBtn = document.querySelector("#add");
const error = document.querySelector("#error");
const todoList = document.querySelector(".todosList");
const modal = document.querySelector("#myModal");
const close = document.querySelector(".close");
const cancel = document.querySelector(".cancel");
const editTitle = document.querySelector("#editTitle");
const editDesc = document.querySelector("#editDesc");
let save;
let todoArray = [];
todoArray = JSON.parse(localStorage.getItem("todos")) || [];
const doneHandler = (done) => {
  let status = todoArray[done.id].done;
  console.log(status);
  const checked =
    done.parentElement.previousElementSibling.previousElementSibling
      .lastElementChild;
  if (!status) {
    checked.style.display = "inline";
    done.innerHTML = "not done yet";
    done.classList.add("notDone");
    todoArray[done.id].done = true;
  } else {
    checked.style.display = "none";
    done.innerHTML = "Done";
    done.classList.remove("notDone");
    done.classList.add("done");
    todoArray[done.id].done = false;
  }
  localStorage.setItem("todos", JSON.stringify(todoArray));
};
const removeHandler = (id) => {
  todoArray.splice(id, 1);
  if (todoArray.length === 0) todoList.innerHTML = "";
  localStorage.setItem("todos", JSON.stringify(todoArray));
  renderTodos();
};
const editHandler = (id, title, description) => {
  modal.style.display = "block";
  editTitle.value = title;
  editDesc.value = description;
  save = id;
};
const saveHandler = () => {
  if (
    editTitle.value !== todoArray[save].title ||
    editDesc.value !== todoArray[save].description
  ) {
    todoArray[save].title = editTitle.value;
    todoArray[save].description = editDesc.value;
    localStorage.setItem("todos", JSON.stringify(todoArray));
    modal.style.display = "none";
    renderTodos();
  } else {
    editTitle.style.borderColor = "#c7434a";
    editDesc.style.borderColor = "#c7434a";
  }
};
function closeModal() {
  modal.style.display = "none";
}
close.addEventListener("click", closeModal);
cancel.addEventListener("click", closeModal);
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
const renderTodos = () => {
  let section = "";
  if (todoArray) {
    todoArray.forEach((item, id) => {
      let isDone = item.done ? "notDone" : "done";
      let isDoneText = item.done ? "not done yet" : "Done";
      let checkedDone = item.done ? "checkedDone" : "checkedUnDone";
      section += `
      <section class="todoItem">
          <header class="todoTitle">
              <h2 class="titleH">${item.title}</h2>
              <span class="checked ${checkedDone}">Done!</span>
          </header>
          <div class="todoDesc">${item.description}</div>
          <div class="todoBtn">
              <button class="btn ${isDone}" id="${id}" onclick="doneHandler(this)">${isDoneText}</button>
              <button class="btn edit" onclick="editHandler(${id},'${item.title}','${item.description}' )">Edit</button>
              <button class="btn remove" onclick="removeHandler(${id})">Remove</button>
          </div>
      </section>`;
      todoList.innerHTML = section;
    });
  }
};
renderTodos();
const addTask = (e) => {
  e.preventDefault();
  if (!title.value || !description.value) {
    error.innerHTML = "The title or description should not be empty!";
    error.classList.add("errorRed");
    title.value = "";
    description.value = "";
  } else {
    let task = {
      title: title.value,
      description: description.value,
      done: false,
    };
    todoArray.push(task);
    localStorage.setItem("todos", JSON.stringify(todoArray));
    error.innerHTML = "Task has been created successfully!";
    error.classList.remove("errorRed");
    error.classList.add("errorGreen");
    renderTodos();
    title.value = "";
    description.value = "";
  }
};
addBtn.addEventListener("click", addTask);

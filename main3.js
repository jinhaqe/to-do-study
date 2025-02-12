let todos = [];

document.addEventListener("DOMContentLoaded", () => {
  loadTodos();
});

function button_event() {
  let input = document.getElementById("todo");
  let ul = document.querySelector("ul");

  if (input.value.trim() === "") {
    alert("내용을 입력해주세요!");
    return;
  }

  let newList = createList(input.value);
  ul.appendChild(newList);

  const checkbox = newList.querySelector(".check");
  const checked = checkbox.checked;

  addObj(input.value, checked);

  console.log(todos);

  input.value = "";
}

function createList(value) {
  let ul = document.querySelector("ul");
  let newLi = document.createElement("li");
  let text = document.createTextNode(value);

  let check = document.createElement("input");
  check.type = "checkbox";
  check.setAttribute("class", "check");

  newLi.appendChild(check);
  newLi.appendChild(text);

  let deletebtn = document.createElement("button");
  deletebtn.innerHTML = "삭제";
  deletebtn.setAttribute("class", "btn");

  let editBtn = document.createElement("button");
  editBtn.innerHTML = "수정";
  editBtn.setAttribute("class", "btn");

  newLi.appendChild(deletebtn);
  newLi.appendChild(editBtn);

  deletebtn.addEventListener("click", () => {
    ul.removeChild(newLi);
    removeObj(value);
    saveTodos();
  });

  editBtn.addEventListener("click", () => {
    const isEditing = editBtn.innerHTML === "확인";

    if (isEditing) {
      const newInput = newLi.querySelector(".newinput");
      text.textContent = newInput.value;
    }

    toggleEdit(isEditing);

    editBtn.innerHTML = isEditing ? "수정" : "확인";
    saveTodos();
  });

  function toggleEdit(isEditing) {
    newLi.innerHTML = "";

    if (isEditing) {
      newLi.appendChild(check);
      newLi.appendChild(text);
    } else {
      let newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = text.textContent;
      newInput.setAttribute("class", "newinput");

      newLi.appendChild(check);
      newLi.appendChild(newInput);
    }

    newLi.appendChild(deletebtn);
    newLi.appendChild(editBtn);
  }

  check.addEventListener("change", function () {
    if (check.checked) {
      newLi.classList.add("completed");
    } else {
      newLi.classList.remove("completed");
    }

    CheckedStatus(value, check.checked);
    saveTodos();
  });

  return newLi;
}

function addObj(title, checked) {
  const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;

  const newTodo = {
    title: title,
    checked: checked,
    id: newId,
  };

  todos.push(newTodo);
  saveTodos();
}

function removeObj(title) {
  todos = todos.filter((todo) => todo.title !== title);
  saveTodos();
}

function CheckedStatus(title, checked) {
  const todo = todos.find((todo) => todo.title === title);
  if (todo) {
    todo.checked = checked;
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    todos.forEach((todo) => {
      let newList = createList(todo.title);
      const checkbox = newList.querySelector(".check");
      checkbox.checked = todo.checked;
      if (todo.checked) newList.classList.add("completed");
      document.querySelector("ul").appendChild(newList);
    });
  }
}

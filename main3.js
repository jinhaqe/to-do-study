let todos = [];
let i = 1;

// localStorage에서 데이터 불러오기
function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    // 저장된 todo들을 화면에 표시
    todos.forEach((todo) => {
      let newList = createList(todo.title, todo.id);
      const checkbox = newList.querySelector(".check");
      checkbox.checked = todo.checked;
      if (todo.checked) {
        newList.classList.add("completed");
      }
      document.querySelector("ul").appendChild(newList);
    });
    // i 값을 업데이트
    updateMaxId();
  }
}

// 최대 id 값 업데이트
function updateMaxId() {
  if (todos.length > 0) {
    i = Math.max(...todos.map((todo) => todo.id)) + 1;
  } else {
    i = 1;
  }
}

// localStorage에 데이터 저장
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log("저장된 todos:", JSON.parse(localStorage.getItem("todos")));
}

// 현재 날짜와 시간 가져오기
function date_time() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let date1 = date.getDate();
  let Hours = date.getHours();
  let minutes = date.getMinutes();
  let Seconds = date.getSeconds();

  let today = `${year} / ${month < 10 ? `0${month}` : month} / ${
    date1 < 10 ? `0${date1}` : date1
  }`;

  let time = `${Hours < 10 ? `0${Hours}` : Hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  } : ${Seconds < 10 ? `0${Seconds}` : Seconds}`;

  document.querySelector(".date").innerHTML = today;
  document.querySelector(".time").innerHTML = time;
}

let time = setTimeout(() => {
  date_time();
});

let timeID = setInterval(() => {
  date_time();
}, 1000);

const API_KEY = "fd81f7c1133bdcc365228b56e695bc1f";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const temperature = Math.floor(data.main.temp);
      const weather = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      document.querySelector(
        ".weather"
      ).innerHTML = `${weather} (${temperature}°C)`;

      const iconElement = document.querySelector(".icon");
      if (iconElement) {
        iconElement.setAttribute("src", iconURL);
      }
    })
    .catch((error) => {
      console.error("날씨 데이터를 가져오는 중 에러 발생:", error);
      alert("날씨 데이터를 가져오는 것에 실패하였습니다.");
    });
}

function onGeoError() {
  alert("위치를 찾을 수 없어 날씨 정보를 가져올 수 없습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function button_event() {
  let input = document.getElementById("todo");
  let ul = document.querySelector("ul");

  if (input.value.trim() === "") {
    alert("내용을 입력해주세요!");
    return;
  }

  const newId = i;
  let newList = createList(input.value);
  ul.appendChild(newList);

  const checkbox = newList.querySelector(".check");
  addObj(input.value, checkbox.checked, newId);
  saveTodos();

  input.value = "";
}

function handleEnter(event) {
  if (event.key === "Enter") {
    button_event();
  }
}

function createList(value, providedId = null) {
  let ul = document.querySelector("ul");
  let newLi = document.createElement("li");
  const currentId = providedId !== null ? providedId : i;
  newLi.setAttribute("id", currentId);

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
    removeObj(parseInt(newLi.id));
    saveTodos();
    updateMaxId();
    console.log("현재 todos:", todos);
  });

  editBtn.addEventListener("click", () => {
    const isEditing = editBtn.innerHTML === "확인";

    if (isEditing) {
      const newInput = newLi.querySelector(".newinput");
      const newValue = newInput.value;
      titleStatus(parseInt(newLi.id), newValue);
      text.textContent = newValue;
      saveTodos();
    }

    toggleEdit(isEditing);
    editBtn.innerHTML = isEditing ? "수정" : "확인";
  });

  function toggleEdit(isEditing) {
    const currentText = text.textContent;
    const currentChecked = check.checked;

    newLi.innerHTML = "";

    if (isEditing) {
      newLi.appendChild(check);
      newLi.appendChild(text);
    } else {
      let newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = currentText;
      newInput.setAttribute("class", "newinput");

      newLi.appendChild(check);
      newLi.appendChild(newInput);
    }

    check.checked = currentChecked;
    newLi.appendChild(deletebtn);
    newLi.appendChild(editBtn);
  }

  check.addEventListener("change", function () {
    const id = parseInt(newLi.id);
    if (check.checked) {
      newLi.classList.add("completed");
    } else {
      newLi.classList.remove("completed");
    }

    CheckedStatus(id, check.checked);
    saveTodos();
  });

  if (providedId === null) {
    i++;
  }

  return newLi;
}

function addObj(title, checked, id = i - 1) {
  const newTodo = {
    title: title,
    checked: checked,
    id: id,
  };

  todos.push(newTodo);
}

function removeObj(id) {
  todos = todos.filter((todo) => todo.id !== id);
}

function CheckedStatus(id, checked) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.checked = checked;
  }
}

function titleStatus(id, newTitle) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.title = newTitle;
  }
}

// 페이지 로드 시 저장된 데이터 불러오기
document.addEventListener("DOMContentLoaded", loadTodos);

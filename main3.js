let todos = [];
let i = 1;

let time = setTimeout(() => {
  date_time();
});

let timeID = setInterval(() => {
  date_time();
}, 1000);

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

const API_KEY = "fd81f7c1133bdcc365228b56e695bc1f";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temperature = Math.floor(data.main.temp);
      const weather = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      // 날씨 정보를 화면에 표시
      document.querySelector(
        ".weather"
      ).innerHTML = `${weather} (${temperature}°C)`;

      // 날씨 아이콘을 화면에 표시
      const iconElement = document.querySelector(".icon");
      iconElement.setAttribute("src", iconURL);
    })
    .catch((error) => {
      console.error("날씨 데이터를 가져오는 것에 에러 뜸", error);
      alert("날씨 데이터를 가져오는 것에 실패하였습니다.");
    });
}

function onGeoError() {
  alert("위치 찾을 수 없음 그러니까 날씨도 모름");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

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
  newLi.setAttribute("id", i);
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
    console.log(todos);
  });

  editBtn.addEventListener("click", () => {
    const isEditing = editBtn.innerHTML === "확인";

    if (isEditing) {
      const newInput = newLi.querySelector(".newinput");
      titleStatus(parseInt(newLi.id), newInput.value);
      text.textContent = newInput.value;
    }

    toggleEdit(isEditing);

    editBtn.innerHTML = isEditing ? "수정" : "확인";
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

    CheckedStatus(parseInt(newLi.id), check.checked);
  });

  i++;

  return newLi;
}

function addObj(title, checked) {
  const newId = i - 1;

  const newTodo = {
    title: title,
    checked: checked,
    id: newId,
  };

  todos.push(newTodo);
}

function removeObj(id) {
  // id로 항목 삭제
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

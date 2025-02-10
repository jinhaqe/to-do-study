// 1. 투두리스트 디자인 만들기
// 2. Todo 객체 생성
// 3. 내용, 체크 여부, id

function button_event() {
  let input = document.getElementById("todo");
  let ul = document.querySelector("ul");
  let newLi = document.createElement("li");
  newLi.innerHTML = input.value;
  input.value = "";

  ul.appendChild(newLi);

  let insertbtn;
}

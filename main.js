// 1. 투두리스트 디자인 만들기
// 2. Todo 객체 생성
// 3. 내용, 체크 여부, id

function button_event() {
  let input = document.getElementById("todo");
  let ul = document.querySelector("ul");
  let newLi = document.createElement("li");
  let text = document.createTextNode(input.value);

  if (input.value.trim() === "") {
    alert("내용을 입력해주세요!");
    return;
  }

  let check = document.createElement("input");
  check.type = "checkbox";
  check.setAttribute("class", "check");

  newLi.appendChild(check);
  newLi.appendChild(text);

  input.value = "";

  ul.appendChild(newLi);

  // 삭제 버튼 생성
  let deletebtn = document.createElement("button");
  deletebtn.innerHTML = "삭제";
  deletebtn.setAttribute("class", "btn");

  // 수정 버튼 생성
  let insert_btn = document.createElement("button");
  insert_btn.innerHTML = "수정";
  insert_btn.setAttribute("class", "btn");

  newLi.appendChild(deletebtn);
  newLi.appendChild(insert_btn);

  let Editing = false;

  insert_btn.addEventListener("click", function () {
    if (!Editing) {
      // 수정 모드로 전환
      let newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = text.textContent;
      newInput.setAttribute("class", "newinput");

      // 기존 텍스트를 입력 필드로 교체
      newLi.replaceChild(newInput, text);
      insert_btn.innerHTML = "확인"; // 버튼을 '확인'으로 변경

      // "확인" 버튼 클릭 시
      insert_btn.removeEventListener("click", saveEdit); // 기존 이벤트 리스너 제거
      insert_btn.addEventListener("click", saveEdit); // 새로운 이벤트 리스너 추가

      Editing = true;
    }
  });

  // 확인 후 텍스트를 저장하는 함수
  function saveEdit() {
    let newInput = newLi.querySelector("input[type='text']");
    text = document.createTextNode(newInput.value); // 입력된 텍스트로 텍스트 노드 변경
    newLi.replaceChild(text, newInput); // input을 텍스트로 교체
    insert_btn.innerHTML = "수정"; // 버튼을 다시 '수정'으로 변경

    Editing = false;
  }

  deletebtn.addEventListener("click", () => {
    ul.removeChild(newLi); // 해당 li를 ul에서 제거
  });

  // 체크박스 클릭 이벤트 처리
  check.addEventListener("change", function () {
    if (check.checked) {
      // 체크되었을 때: 완료된 항목으로 표시
      newLi.classList.add("completed");
    } else {
      // 체크 해제되었을 때: 완료되지 않은 항목으로 표시
      newLi.classList.remove("completed");
    }
  });
}

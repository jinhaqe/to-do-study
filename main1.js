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

  deletebtn.addEventListener("click", () => {
    ul.removeChild(newLi); // 해당 li를 ul에서 제거
  });

  insert_btn.addEventListener("click", () => {
    const isEditing = insert_btn.innerHTML === "확인";

    // 텍스트 수정 상태일 때
    if (isEditing) {
      const newInput = newLi.querySelector(".newinput"); // 수정된 입력 값 가져오기
      text.textContent = newInput.value; // 텍스트를 수정된 값으로 업데이트
    }

    // 원래의 버튼 상태로 복원 및 내용 업데이트
    update(isEditing);

    // 버튼 상태 변경
    insert_btn.innerHTML = isEditing ? "수정" : "확인";
  });

  function update(isEditing) {
    newLi.innerHTML = ""; // 기존 내용 지우기

    if (isEditing) {
      newLi.appendChild(check); // 체크 버튼 추가
      newLi.appendChild(text); // 수정된 텍스트 추가
    } else {
      let newInput = document.createElement("input");
      newInput.type = "text";
      newInput.value = text.textContent; // 현재 텍스트 값을 input에 채우기
      newInput.setAttribute("class", "newinput");

      newLi.appendChild(check);
      newLi.appendChild(newInput); // 새 input 필드를 추가
    }

    newLi.appendChild(deletebtn); // 삭제 버튼 추가
    newLi.appendChild(insert_btn); // 수정 버튼 추가
  }

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

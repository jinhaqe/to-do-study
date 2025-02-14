const API_KEY = "fd81f7c1133bdcc365228b56e695bc1f";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json()) // 서버 응답을 JSON으로 변환
    .then((data) => {
      const temperature = data.main.temp; // 온도
      const weather = data.weather[0].description; // 날씨 설명
      const city = data.name; // 도시 이름
      const icon = data.weather[0].icon; // 날씨 아이콘 코드
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`; // 아이콘 이미지 URL

      // 날씨 정보를 화면에 표시
      document.querySelector(
        ".weather"
      ).innerHTML = `위치 : ${city}, 온도 : ${temperature}°C, 날씨 :  ${weather}.`;

      // 날씨 아이콘을 화면에 표시
      const iconElement = document.querySelector(".icon"); // HTML에서 <img class="icon">을 찾음
      iconElement.setAttribute("src", iconURL); // 아이콘 이미지 URL을 src로 설정
    })
    .catch((error) => {
      console.error("날씨 데이터를 가져오는 것에 에러 뜸", error);
      alert("날씨 데이터를 가져오는 것에 실패하였습니다.");
    });
}

function onGeoError() {
  alert("위치 찾을 수 없음 그러니까 날씨도 모름");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); // 현재 위치를 가져옴

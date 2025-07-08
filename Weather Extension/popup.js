
let weatherData;

const getBtn = document.getElementById("get-weather");
const loader = document.getElementById("loader");
const result = document.getElementById("result");
const errorBox = document.getElementById("error");
const toggle = document.querySelector(".toggle");
const btnC = document.getElementById("btn-c");
const btnF = document.getElementById("btn-f");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const cond = document.getElementById("condition");
const icon = document.getElementById("icon");

getBtn.onclick = function () {
  loader.classList.remove("hidden");
  result.classList.add("hidden");
  errorBox.classList.add("hidden");
  toggle.classList.add("hidden");

  navigator.geolocation.getCurrentPosition(function (pos) {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    const apiKey = "00bf073c6ee54b3786f81127250807";
    const url = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + lat + "," + lon;

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Something went wrong while fetching data");
        }
        return response.json();
      })
      .then(function (data) {
        weatherData = data;
        updateTemp("c");

        city.textContent = "📍 " + data.location.name + ", " + data.location.region;
        cond.textContent = data.current.condition.text;
        icon.src = "https:" + data.current.condition.icon;

        loader.classList.add("hidden");
        result.classList.remove("hidden");
        toggle.classList.remove("hidden");
      })

      .catch(function () {
        loader.classList.add("hidden");
        errorBox.textContent = "Failed to load weather data.";
        errorBox.classList.remove("hidden");
      });
  },

    function () {
      loader.classList.add("hidden");
      errorBox.textContent = "Location access is blocked.";
      errorBox.classList.remove("hidden");
    });
};

function updateTemp(unit) {
  if (!weatherData) return;

  let t;
  if (unit === "c") {
    t = weatherData.current.temp_c + " °C";
  } else {
    t = weatherData.current.temp_f + " °F";
  }
  temp.textContent = "🌡️ " + t;
}

btnC.onclick = function () {
  updateTemp("c");
  btnC.classList.add("active");
  btnF.classList.remove("active");
};

btnF.onclick = function () {
  updateTemp("f");
  btnF.classList.add("active");
  btnC.classList.remove("active");
};


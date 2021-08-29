function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  //console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `  <div id="forecast" class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  
 <div id="weather-forecast-date" class="col-2">
                <h3>${formatDay(forecastDay.dt)}</h3>
    <center>
                    <img id="icon" src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }.png">

                </br></br>

                <div class="weather-forecast-temperatures"> 

                    <span id=“weather-forecast-temperature-max“> <b>${Math.round(
                      forecastDay.temp.max
                    )}°</b> |</span>
                    <span id="weather-forecast-temperature-min"> ${Math.round(
                      forecastDay.temp.min
                    )}°</span>

                </div></center>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "ee1b96c1f77d3aae1b3b86327285b0f8";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  //console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  //console.log(response.data);
  let mainTemp = document.querySelector("h2");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  getForecast(response.data.coord);

  degreeTemperature = response.data.main.temp;

  mainTemp.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

function search(city) {
  let apiKey = "ee1b96c1f77d3aae1b3b86327285b0f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#input-search");
  search(cityInput.value);
  //console.log(cityInput.value);
}

let degreeTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Paris");

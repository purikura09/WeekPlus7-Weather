let apiKey = "ee1b96c1f77d3aae1b3b86327285b0f8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

function displayTemperature(response) {
  console.log(response.data);
  let mainTemp = document.querySelector("h2");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
}
axios.get(apiUrl).then(displayTemperature);

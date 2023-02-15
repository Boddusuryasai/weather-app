// Data => Done
// Variable to Store the Element => Done
// Function to get the data from weather app
// Manipluate the varibe of already created element
require('dotenv').config();
const APIKEY = process.env.API_KEY;
let data;

const inputBox = document.getElementById("inputBox");
const countryName = document.getElementById("countryName");
const stateName = document.getElementById("stateName");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const temprature = document.getElementById("temprature");
const logoImage = document.getElementById("logoImage");
const weatherStatus = document.getElementById("weatherStatus");
const grid = document.querySelector("#forecast")
const form = document.querySelector('form');
const getData = async (event) => {
  event.preventDefault();
  form.querySelector("button").disabled=true
  if (!inputBox.value) {
    alert("Please Enter The City Name: ");
    return;
  }

  //
  const city = inputBox.value;

  // Fetch Details

  const fetchData = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=14`
  );

  const orgData = await fetchData.json();
  data = orgData;
  // Displaying the data in HTML
  countryName.innerHTML = data.location.country;
  stateName.innerHTML = data.location.region;
  cityName.innerHTML = data.location.name;
  humidity.innerHTML = data.current.humidity;
  windSpeed.innerHTML = data.current.wind_kph;
  temprature.innerHTML = data.current.temp_c;
  logoImage.src = data.current.condition.icon;
  weatherStatus.innerHTML = data.current.condition.text;



  grid.innerHTML=""
  data.forecast.forecastday.forEach((a)=>{
    
  const div =document.createElement("div");
  div.classList.add("day_card")
  const img =document.createElement("img");
  const date = document.createElement("h3")
  const p1 =document.createElement("p");
  const p2 =document.createElement("p");
         date.innerText = a.date
          img.src = a.day.condition.icon;
          p1.innerHTML = 
          `${a.day.avgtemp_c} <span>&#8451</span>`
           p2.innerHTML = a.day.condition.text;
           div.appendChild(date)
           div.appendChild(img)
           div.appendChild(p1)
           div.appendChild(p2)
           grid.appendChild(div)
  })
 
  form.querySelector("button").disabled=false

   
};
form.addEventListener('submit', getData);



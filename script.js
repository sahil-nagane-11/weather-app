//      HTML Element Call
            // Search Section 
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.getElementById("searchBtn");
const searchNote = document.getElementById("searchNote");
const loadingDiv = document.querySelector(".loadingDiv");
const load = document.getElementById("load");
const errRead=document.getElementById("errRead");
            //Weather Card Section
const weatherCardSection = document.querySelector(".weather-cards-section");
            //Weather Card Left Side
const cityRes=document.getElementById("cityRes");
const displayDate = document.querySelector("#displayDate");
const temperature = document.querySelector("#temperature");
const weatherFeel = document.getElementById("weatherFeel");
const weatherIcon = document.getElementById("weatherIcon");
const temperatureIncrease = document.querySelector("#temperatureIncrease");
const temperatureDecrease = document.querySelector("#temperatureDecrease");

            //Weather Card Right Side
const showHumidity = document.getElementById("showHumidity");
const showWindSpeed = document.getElementById("showWindSpeed");
const showTempFeels = document.getElementById("showTempFeels");
const showPressure = document.querySelector("#showPressure");
            //Weather Card Bottom
const visibilityLength = document.getElementById("visibilityLength");
const showWindDirection = document.getElementById("showWindDirection");
const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");


                //  API
const URL = "https://api.weatherapi.com/v1/forecast.json";
const apiKey = "YOUR_API_KEY";
let city = "Pune";

const days = ["Sunday" , "Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday" , "Saturday"];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",

    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

            // Main Body
const errorStyle = ()=>{
        errRead.style.display = "block";
        errRead.style.color ="red";
        searchNote.style.display = "none";
}

const loadScreen = ()=>{
    searchBtn.disabled = true;
    searchNote.style.display = "none";
    weatherCardSection.style.opacity = "80%";
    loadingDiv.style.visibility = "visible";
}
const loadScreenDisable = ()=>{
    weatherCardSection.style.opacity = "100%";
    loadingDiv.style.visibility = "hidden";
    searchNote.style.display = "block";
    searchBtn.disabled = false;
}
async function fetchWeather() {
    try{
       
        if(city.trim() === ""){
            errorStyle();
            errRead.textContent = "Please Enter City Name";
            return;
        }
        loadScreen();
        let response= await fetch(`${URL}?key=${apiKey}&q=${city}`);
        let data=await response.json();
        
                    //API Data
                //weather current data card data
            //Weather Card Left Side Data
        if (data.error) {
            errorStyle();
            errRead.textContent = "City not found";
            return ;
        }
        const cityName = data.location.name;
        const countryName = data.location.country;
        const localTime = data.location.localtime;
        const weatherCondition = data.current.condition.text;
        const conditionIcon = data.current.condition.icon;
        const maxTemp = data.forecast.forecastday[0].day.maxtemp_c;
        const minTemp = data.forecast.forecastday[0].day.mintemp_c;
                // Weather Card Right Side Data
        const feelsLike =  data.current.feelslike_c;
        const humidity = data.current.humidity;
        const pressure = data.current.pressure_mb;
        const temperatureData = data.current.temp_c;
        
                //Weather Card Bottom Data
        const sunrise = data.forecast.forecastday[0].astro.sunrise;
        const sunset = data.forecast.forecastday[0].astro.sunset;
        const visibility = data.current.vis_km;
        const windDirection = data.current.wind_dir;
        const windSpeed = data.current.wind_kph;
        const date = new Date(localTime);

        const updatedDate = ()=>{
            const day = days[date.getDay()];
            const month = months[date.getMonth()];
            const currentDate = date.getDate();
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            let formattedHour;
            if(hours===0){
                formattedHour = 12;
            }
            else if(hours>12){
                formattedHour = hours-12;
            }else{
                formattedHour = hours;
            }
            let AMPM = hours>=12?"PM":"AM";
            let formattedMinute = minutes<10?`0${minutes}` : minutes;
            displayDate.textContent = `${day}, ${currentDate} ${month} ${year} • ${formattedHour}:${formattedMinute} ${AMPM} `;
            
        }
        updatedDate();
            let changeBackground = (imageName)=>{
                document.body.style.backgroundImage = `url("${imageName}")`;
            }
        let condition = weatherCondition.toLowerCase();
        const updateBackground = ()=>{
            
            if(condition.includes("rain") || 
                condition.includes("drizzle") || 
                condition.includes("shower") ){
                    changeBackground("images/rainy bg.png");

            }
            else if(condition.includes("sunny")||
                condition.includes("clear")){
                    changeBackground("images/sunny bg.png");
            }
            else if(condition.includes("cloud") || 
                condition.includes("overcast")){
                    changeBackground("images/cloudy bg.png");
            }
            else if(condition.includes("thunder") ||
                condition.includes("lightning")){
                    changeBackground("images/thunder bg.jpg");
            }
            else if(condition.includes("mist") ||
                condition.includes("fog") ||
                condition.includes("haze") ||
                condition.includes("smoky") ||
                condition.includes("smoke") ){
                    changeBackground("images/mist bg.png");
            }
            else if(condition.includes("snow") ||
                condition.includes("blizzard") ||
                condition.includes("sleet") ||
                condition.includes("ice")){
                    changeBackground("images/snow bg.jpg");
            }
        }
        updateBackground();

                    //Display Weather Card data
                    //Weather Card Left Side
    
        cityRes.textContent = `${cityName}, ${countryName}`;
        weatherFeel.textContent = weatherCondition;
        weatherIcon.src=conditionIcon;
        temperature.textContent = `${temperatureData} °C`;
        temperatureIncrease.textContent = `↑ ${maxTemp} °C`;
        temperatureDecrease.textContent = `↓ ${minTemp} °C`;
                    //Weather Card Right Side
        showHumidity.textContent = `${humidity} %`;
        showWindSpeed.textContent = `${windSpeed} km/h`;
        showTempFeels.textContent = `${feelsLike} °C`;
        showPressure.textContent = `${pressure} hPa`;
                    //Weather Card Bottom
        sunriseTime.textContent = sunrise;
        sunsetTime.textContent = sunset;
        visibilityLength.textContent = `${visibility} km`;
        showWindDirection.textContent = windDirection;

        searchNote.style.display = "block";
        errRead.style.display = "none";
        
             
    }
    catch(error){
        if(error.message === "Failed to fetch"){
            errorStyle();
            errRead.textContent ="Unable connect. Check your internet";
        }
        
        errorStyle();
    }
    finally{
        loadScreenDisable();
    }
        
        
}
fetchWeather();

 searchBtn.addEventListener("click" , (e)=>{
    if(e.type==="click"){
       
        city = cityInput.value;
        fetchWeather();
        return ;
    }
 });
 cityInput.addEventListener("keydown", (e)=>{
     if(e.key==="Enter"){
        
        city = cityInput.value;
        fetchWeather();
        return ; 
    }
 });


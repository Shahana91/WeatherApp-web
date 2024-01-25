const apikey="482dcd4de0fc4131379903db1d270c2a";
const url= "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const btn=document.getElementById("btn");

const weatherCard=document.querySelector(".weather")

btn.addEventListener('click',()=>{
    const city=document.querySelector(".search input");
    //console.log(city);
    if(city.value==""){
        alert("Please enter a City Name!");
    }else{
        fetchWeather(city.value);//function to fetch weather
    }
});

async function fetchWeather(city){
    const response=await fetch(url+city+`&appid=${apikey}`);
    console.log(url+city+`&appid=${apikey}`);
    if(response.status==200){
        document.querySelector(".error").style.display="none";
        const data=await response.json();
        weatherCard.style.display="block";

        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=`${data.main.temp}&deg c`;
        document.querySelector(".main").innerHTML=`${data.weather[0].main}`;
        document.querySelector(".humidity").innerHTML=`${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML=`${data.wind.speed}m/s`;//see documentation to know what is to be its suffix like %, m/s, etc...

        const condition=data.weather[0].main;
        const img=document.querySelector(".weather-icon");
        switch(condition){
            case "Clouds":img.src="img/clouds.png";break;
            case "Rain":img.src="img/rain.png";break;
            case "Drizzle":img.src="img/drizzle.png";break;
            case "Clear":img.src="img/clear.png";break;
            case "Snow":img.src="img/snow.png";break;
            case "Mist":img.src="img/mist.png";break;
        }
    }else if  (response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none"
    }
}
 
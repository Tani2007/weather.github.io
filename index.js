let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let feelsLike = document.querySelector(".weather_feelsLike")
let humidity = document.querySelector(".weather_humidity")
let windSpeed = document.querySelector(".weather_wind")
let pressure = document.querySelector(".weather_pressure")

let citySearch = document.querySelector(".weather_search")

//changing country code to country name 
const getCountryName = (code) => {
	return new Intl.DisplayNames([code], { type: 'region' }).of(code)
}

const getDateTime = (dt) => {
	const curDate = new Date(dt*1000);

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric"
	};
	const formatter = new Intl.DateTimeFormat('en-US',options)
	return formatter.format(curDate);
}

let city = "Delhi"

citySearch.addEventListener("submit", (e) => {
	e.preventDefault();
	let cityName = document.querySelector(".city_name");
	city = cityName.value;
	getWeatherData();
	cityName.value = ""
})





const getWeatherData = async () => {
	const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c5280f5618e80b5e8e2edde865a368ec`
	try{
		const res =await fetch(weatherUrl)
		const data = await res.json();
		console.log(data)
		const {main, name,weather,wind, sys, dt} = data;

		cityName.innerText = `${name},${getCountryName(sys.country)}`

		dateTime.innerText = getDateTime(dt)

		w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

		w_forecast.innerHTML =weather[0].main 

		w_temperature.innerHTML =`${((main.temp)-273.15).toFixed(0)}&#176C`;

		w_minTem.innerHTML = `Min: ${((main.temp_min)-273.15).toFixed(0)}&#176C`

		w_maxTem.innerHTML = `Max: ${((main.temp_max)-273.15).toFixed()}&#176C`

		feelsLike.innerHTML = `${((main.feels_like)-273.15).toFixed(0)}&#176C` 

		humidity.innerHTML = `${(main.humidity)}%`

		pressure.innerHTML = `${(main.pressure)}hPa`

		windSpeed.innerHTML = `${(wind.speed)}mph` 


	}catch(err){
		console.log(err)
	}
}


document.body.addEventListener("load",getWeatherData());
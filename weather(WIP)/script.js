const apiKey = "";

async function checkWeather(city) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none'; // Hide error message initially

    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        errorMessage.style.display = 'block';
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherType = data.weather[0].main.toLowerCase();
        setWeatherIcon(weatherType);
    } catch (error) {
        errorMessage.textContent = "City not found. Please enter a valid city name.";
        errorMessage.style.display = 'block';
        console.error("Error fetching weather data: ", error);
    }
}

async function checkWeatherByCoords(lat, lon) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none'; // Hide error message initially

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Location not found");
        }
        const data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherType = data.weather[0].main.toLowerCase();
        setWeatherIcon(weatherType);
    } catch (error) {
        errorMessage.textContent = "Error fetching weather data for your location.";
        errorMessage.style.display = 'block';
        console.error("Error fetching weather data: ", error);
    }
}

function setWeatherIcon(weatherType) {
    const weatherIcon = document.getElementById('weather-icon');
    const weatherIcons = {
        clear: 'images/clear.png',
        clouds: 'images/clouds.png',
        rain: 'images/rain.png',
        drizzle: 'images/drizzle.png',
        thunderstorm: 'images/thunderstorm.png',
        snow: 'images/snow.png',
        mist: 'images/mist.png'
    };

    weatherIcon.src = weatherIcons[weatherType];
}

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim();
    checkWeather(city);
});

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        checkWeatherByCoords(lat, lon);
    }, (error) => {
        console.error("Error getting location: ", error);
        checkWeather('New York');
    });
} else {
    checkWeather('New York');
}
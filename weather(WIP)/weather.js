// Function to get coordinates of a city using OpenStreetMap API
async function getCoordinates(city) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`);
    const data = await response.json();
    if (data.length > 0) {
        const location = data[0];
        return {
            lat: location.lat,
            lon: location.lon,
            display_name: location.display_name
        };
    } else {
        throw new Error('City not found');
    }
}

// Function to get weather data using Open-Meteo API
async function getWeather(lat, lon) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
    const weatherData = await response.json();
    return {
        temperature: weatherData.current_weather.temperature,
        weathercode: weatherData.current_weather.weathercode,
        humidity: weatherData.hourly.relative_humidity_2m[0],
        windspeed: weatherData.hourly.wind_speed_10m[0]
    };
}

// Function to get weather description and icon based on weather code
function getWeatherDescription(code) {
    const weatherDescriptions = {
        0: { description: 'Selkeää', icon: 'images/selkeää.svg' },
        1: { description: 'Enimmäkseen selkeää', icon: 'images/enimmäkseen_selkeää.svg' },
        2: { description: 'Puolipilvistä', icon: 'images/puolipilvistä.svg' },
        3: { description: 'Pilvistä', icon: 'images/pilvistä.svg' },
        45: { description: 'Sumua', icon: 'images/sumua.svg' },
        48: { description: 'Kuuraa', icon: 'images/kuuraa.svg' },
        51: { description: 'Heikko tihkusade', icon: 'images/tihkusade.svg' },
        53: { description: 'Kohtalainen tihkusade', icon: 'images/tihkusade.svg' },
        55: { description: 'Voimakas tihkusade', icon: 'images/tihkusade.svg' },
        61: { description: 'Heikko sade', icon: 'images/heikko_sade.svg' },
        63: { description: 'Kohtalainen sade', icon: 'images/kohtalainen_sade.svg' },
        65: { description: 'Voimakas sade', icon: 'images/voimakas_sade.svg' },
        71: { description: 'Heikko lumisade', icon: 'images/heikko_lumisade.svg' },
        73: { description: 'Kohtalainen lumisade', icon: 'images/kohtalainen_lumisade.svg' },
        75: { description: 'Voimakas lumisade', icon: 'images/voimakas_lumisade.svg' },
        80: { description: 'Heikot sadekuurot', icon: 'images/sadekuurot.svg' },
        81: { description: 'Kohtalaiset sadekuurot', icon: 'images/sadekuurot.svg' },
        82: { description: 'Voimakkaat sadekuurot', icon: 'images/sadekuurot.svg' },
        95: { description: 'Ukkosmyrsky', icon: 'images/ukkosmyrsky.svg' },
        96: { description: 'Ukkosmyrsky rakeilla', icon: 'images/ukkosmyrsky_rakeilla.png' }
    };
    return weatherDescriptions[code] || { description: 'Tuntematon säätila', icon: 'images/tuntematon_säätila.svg' };
}

// Function to search weather for the input city and display the result
async function searchWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = '';

    if (cityInput.trim() === '') {
        weatherResult.textContent = 'Syötä kaupungin nimi.';
        return;
    }

    try {
        const { lat, lon, display_name } = await getCoordinates(cityInput);
        const weather = await getWeather(lat, lon);
        const { description, icon } = getWeatherDescription(weather.weathercode);
        const humidityIconUrl = `images/humidity.png`; // Local path for humidity icon
        const windIconUrl = `images/wind.png`; // Local path for wind speed icon
        weatherResult.innerHTML = `
            <img src="${icon}" alt="${description}" class="weather-icon"><br>
            ${weather.temperature}°C<br>
            ${display_name}
            <div class="weather-info">
                <div><img src="${humidityIconUrl}" alt="Humidity"> ${weather.humidity}%</div>
                <div><img src="${windIconUrl}" alt="Wind Speed"> ${weather.windspeed} m/s</div>
            </div>
        `;
        localStorage.setItem('lastCity', cityInput); // Save the last searched city
    } catch (error) {
        weatherResult.textContent = error.message;
    }
}

// Function to load the last searched city from localStorage and display its weather on page load
window.onload = async () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        document.getElementById('cityInput').value = lastCity;
        await searchWeather();
    }
};

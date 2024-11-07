export { searchWeather };
async function getCoordinates(city) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`);
  const data = await response.json();
  if (data.length > 0) {
    const location = data[0];
    return {
      lat: location.lat,
      lon: location.lon,
      display_name: location.display_name,
    };
  } else {
    throw new Error("City not found");
  }
}

async function getWeather(lat, lon) {
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
  const weatherData = await response.json();
  return {
    temperature: weatherData.current_weather.temperature,
    weathercode: weatherData.current_weather.weathercode,
    humidity: weatherData.hourly.relative_humidity_2m[0],
    windspeed: weatherData.hourly.wind_speed_10m[0],
  };
}

function getWeatherDescription(code) {
  const weatherDescriptions = {
    0: { description: "Selkeää", icon: "images/weather/selkeää.svg" },
    1: { description: "Enimmäkseen selkeää", icon: "images/weather/enimmäkseen_selkeää.svg" },
    2: { description: "Puolipilvistä", icon: "images/weather/puolipilvistä.svg" },
    3: { description: "Pilvistä", icon: "images/weather/pilvistä.svg" },
    45: { description: "Sumua", icon: "images/weather/sumua.svg" },
    48: { description: "Kuuraa", icon: "images/weather/kuuraa.svg" },
    51: { description: "Heikko tihkusade", icon: "images/weather/tihkusade.svg" },
    53: { description: "Kohtalainen tihkusade", icon: "images/weather/tihkusade.svg" },
    55: { description: "Voimakas tihkusade", icon: "images/weather/tihkusade.svg" },
    61: { description: "Heikko sade", icon: "images/weather/heikko_sade.svg" },
    63: { description: "Kohtalainen sade", icon: "images/weather/kohtalainen_sade.svg" },
    65: { description: "Voimakas sade", icon: "images/weather/voimakas_sade.svg" },
    71: { description: "Heikko lumisade", icon: "images/weather/heikko_lumisade.svg" },
    73: { description: "Kohtalainen lumisade", icon: "images/weather/kohtalainen_lumisade.svg" },
    75: { description: "Voimakas lumisade", icon: "images/weather/voimakas_lumisade.svg" },
    80: { description: "Heikot sadekuurot", icon: "images/weather/sadekuurot.svg" },
    81: { description: "Kohtalaiset sadekuurot", icon: "images/weather/sadekuurot.svg" },
    82: { description: "Voimakkaat sadekuurot", icon: "images/weather/sadekuurot.svg" },
    95: { description: "Ukkosmyrsky", icon: "images/weather/ukkosmyrsky.svg" },
    96: { description: "Ukkosmyrsky rakeilla", icon: "images/weather/ukkosmyrsky_rakeilla.png" },
  };
  return weatherDescriptions[code] || { description: "Tuntematon säätila", icon: "images/tuntematon_säätila.svg" };
}

async function searchWeather() {
  const cityInput = document.getElementById("cityInput").value;
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = "";

  if (cityInput.trim() === "") {
    weatherResult.textContent = "Syötä kaupungin nimi.";
    return;
  }

  try {
    const { lat, lon, display_name } = await getCoordinates(cityInput);
    const weather = await getWeather(lat, lon);
    const { description, icon } = getWeatherDescription(weather.weathercode);
    const humidityIconUrl = `images/weather/humidity.png`; // Local path for humidity icon
    const windIconUrl = `images/weather/wind.png`; // Local path for wind speed icon
    weatherResult.innerHTML = `
            <img src="${icon}" alt="${description}" class="weather-icon"><br>
            ${weather.temperature}°C<br>
            ${display_name}
            <div class="weather-info">
                <div><img src="${humidityIconUrl}" alt="Humidity"> ${weather.humidity}%</div>
                <div><img src="${windIconUrl}" alt="Wind Speed"> ${weather.windspeed} m/s</div>
            </div>
        `;
    localStorage.setItem("lastCity", cityInput); // Save the last searched city
  } catch (error) {
    weatherResult.textContent = error.message;
  }
}

window.onload = async () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    document.getElementById("cityInput").value = lastCity;
    await searchWeather();
  }
};

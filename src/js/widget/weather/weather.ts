import selkeaaIcon from "/images/weather/selkeää.svg";
import enimmakseenSelkeaaIcon from "/images/weather/enimmäkseen_selkeää.svg";
import puolipilvistaIcon from "/images/weather/puolipilvistä.svg";
import pilvistaIcon from "/images/weather/pilvistä.svg";
import sumuaIcon from "/images/weather/sumua.svg";
import kuuraaIcon from "/images/weather/kuuraa.svg";
import tihkusadeIcon from "/images/weather/tihkusade.svg";
import heikkoSadeIcon from "/images/weather/heikko_sade.svg";
import kohtalainenSadeIcon from "/images/weather/kohtalainen_sade.svg";
import voimakasSadeIcon from "/images/weather/voimakas_sade.svg";
import heikkoLumisadeIcon from "/images/weather/heikko_lumisade.svg";
import kohtalainenLumisadeIcon from "/images/weather/kohtalainen_lumisade.svg";
import voimakasLumisadeIcon from "/images/weather/voimakas_lumisade.svg";
import sadekuurotIcon from "/images/weather/sadekuurot.svg";
import ukkosmyrskyIcon from "/images/weather/ukkosmyrsky.svg";
import ukkosmyrskyRakeillaIcon from "/images/weather/ukkosmyrsky_rakeilla.png";
// import tuntematonSaaIcon from "/images/weather/tuntematon_säätila.svg";
import humidityIconUrl from "/images/weather/humidity.png";
import windIconUrl from "/images/weather/wind.png";

export { searchWeather, loadLastCity };
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
    0: { description: "Selkeää", icon: selkeaaIcon },
    1: { description: "Enimmäkseen selkeää", icon: enimmakseenSelkeaaIcon },
    2: { description: "Puolipilvistä", icon: puolipilvistaIcon },
    3: { description: "Pilvistä", icon: pilvistaIcon },
    45: { description: "Sumua", icon: sumuaIcon },
    48: { description: "Kuuraa", icon: kuuraaIcon },
    51: { description: "Heikko tihkusade", icon: tihkusadeIcon },
    53: { description: "Kohtalainen tihkusade", icon: tihkusadeIcon },
    55: { description: "Voimakas tihkusade", icon: tihkusadeIcon },
    61: { description: "Heikko sade", icon: heikkoSadeIcon },
    63: { description: "Kohtalainen sade", icon: kohtalainenSadeIcon },
    65: { description: "Voimakas sade", icon: voimakasSadeIcon },
    71: { description: "Heikko lumisade", icon: heikkoLumisadeIcon },
    73: { description: "Kohtalainen lumisade", icon: kohtalainenLumisadeIcon },
    75: { description: "Voimakas lumisade", icon: voimakasLumisadeIcon },
    80: { description: "Heikot sadekuurot", icon: sadekuurotIcon },
    81: { description: "Kohtalaiset sadekuurot", icon: sadekuurotIcon },
    82: { description: "Voimakkaat sadekuurot", icon: sadekuurotIcon },
    95: { description: "Ukkosmyrsky", icon: ukkosmyrskyIcon },
    96: { description: "Ukkosmyrsky rakeilla", icon: ukkosmyrskyRakeillaIcon },
  };
  return weatherDescriptions[code] || { description: "Tuntematon säätila", icon: "" };
}

async function searchWeather() {
  const cityInput = (document.getElementById("cityInput") as HTMLInputElement).value;
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

async function loadLastCity() {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    (document.getElementById("cityInput") as HTMLInputElement).value = lastCity;
    await searchWeather();
  }
}

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

async function getWeather(lat, lon) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
    const weatherData = await response.json();
    return weatherData.current_weather;
}

function getWeatherDescription(code) {
    const weatherDescriptions = {
        0: { description: 'Selkeää', icon: '01d' },
        1: { description: 'Enimmäkseen selkeää', icon: '02d' },
        2: { description: 'Puolipilvistä', icon: '03d' },
        3: { description: 'Pilvistä', icon: '04d' },
        45: { description: 'Sumua', icon: '50d' },
        48: { description: 'Kuuraa', icon: '50d' },
        51: { description: 'Heikko tihkusade', icon: '09d' },
        53: { description: 'Kohtalainen tihkusade', icon: '09d' },
        55: { description: 'Voimakas tihkusade', icon: '09d' },
        61: { description: 'Heikko sade', icon: '10d' },
        63: { description: 'Kohtalainen sade', icon: '10d' },
        65: { description: 'Voimakas sade', icon: '10d' },
        71: { description: 'Heikko lumisade', icon: '13d' },
        73: { description: 'Kohtalainen lumisade', icon: '13d' },
        75: { description: 'Voimakas lumisade', icon: '13d' },
        80: { description: 'Heikot sadekuurot', icon: '09d' },
        81: { description: 'Kohtalaiset sadekuurot', icon: '09d' },
        82: { description: 'Voimakkaat sadekuurot', icon: '09d' },
        95: { description: 'Ukkosmyrsky', icon: '11d' },
        96: { description: 'Ukkosmyrsky rakeilla', icon: '11d' }
    };
    return weatherDescriptions[code] || { description: 'Tuntematon säätila', icon: '01d' };
}

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
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherResult.innerHTML = `<img src="${iconUrl}" alt="${description}" class="weather-icon"><br>${weather.temperature}°C<br>${display_name}`;
    } catch (error) {
        weatherResult.textContent = error.message;
    }
}

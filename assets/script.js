let citySubmit = document.getElementById('citySubmit');
let pastSearch = document.getElementById('pastSearch');
let citySearch = document.querySelector('#citySearch');
const todayWeather = document.querySelector('#weatherDisplay');
const fiveDayWeather = document.querySelector('#fiveDayWeather');
const weatherAPIKey = '9d3dbee189ccaae4b5d0e40a67f32667';

let pastSearchStorage = JSON.parse(localStorage.getItem('pastSearch')) || [];

function checkWeather() {

    const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${weatherAPIKey}&units=imperial`

    fetch(cityURL).then(function (response) {
        return response.json();
    }).then(function (data) {

        todayWeather.innerHTML = "";

        let weatherResultName = document.createElement('p');
        let forecastDate = document.createElement('p');
        let currentTemp = document.createElement('p');
        let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        let weatherResultIcon = document.createElement('img');
        let humidity = document.createElement('p');
        let windSpeed = document.createElement('p');

        weatherResultName.textContent = `${data.name}`;
        forecastDate.textContent = `${dayjs.unix(data.dt).format('MM/DD/YYYY')}`;
        currentTemp.textContent = `${data.main.temp}`;
        weatherResultIcon.src = weatherIcon;
        humidity.textContent = `${data.main.humidity}`;
        windSpeed.textContent = `${data.wind.speed}`;

        todayWeather.appendChild(weatherResultName);
        todayWeather.appendChild(forecastDate);
        todayWeather.appendChild(currentTemp);
        todayWeather.appendChild(weatherResultIcon);
        todayWeather.appendChild(humidity);
        todayWeather.appendChild(windSpeed);


        checkForecast(data.coord.lon, data.coord.lat);
    })
}

function checkForecast(lon, lat) {
    console.log(`${lon} ${lat}`);
    const fiveDayForcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=imperial`;

    fetch(fiveDayForcast).then(function (response) {
        return response.json();
    }).then(function (data) {

        fiveDayWeather.innerHTML = "";

        for (let i = 0; i < data.list.length; i += 8) {
            const forecastDisplay = document.createElement('div');

            let forecastDate = document.createElement('p');
            let currentTemp = document.createElement('p');
            let weatherIcon = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
            let weatherResultIcon = document.createElement('img');
            let humidity = document.createElement('p');
            let windSpeed = document.createElement('p');

            forecastDate.textContent = `${dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')}`;
            currentTemp.textContent = `${data.list[i].main.temp}`;
            weatherResultIcon.src = weatherIcon;
            humidity.textContent = `${data.list[i].main.humidity}`;
            windSpeed.textContent = `${data.list[i].wind.speed}`;

            forecastDisplay.appendChild(forecastDate);
            forecastDisplay.appendChild(currentTemp);
            forecastDisplay.appendChild(weatherResultIcon);
            forecastDisplay.appendChild(humidity);
            forecastDisplay.appendChild(windSpeed);

            fiveDayWeather.appendChild(forecastDisplay);
        }
    })
}

citySubmit.addEventListener('click', function (event) {

    event.preventDefault();
    pastSearchStorage.push(citySearch.value);

    localStorage.setItem('pastSearch', JSON.stringify(pastSearchStorage));
    displayPastSearch();
    checkWeather();
})

function displayPastSearch() {
    pastSearch.innerHTML = "";

    for (let i = 0; i < pastSearchStorage.length; i++) {
        let pastButton = document.createElement('button');

        pastButton.textContent = pastSearchStorage[i];

        pastSearch.appendChild(pastButton);
    }
}

displayPastSearch();
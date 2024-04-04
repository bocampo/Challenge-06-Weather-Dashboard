let citySubmit = document.getElementById('citySubmit');
let citySearch = document.querySelector('#citySearch');
const todayWeather = document.querySelector('#weatherDisplay');
const weatherAPIKey = '9d3dbee189ccaae4b5d0e40a67f32667';

function checkWeather() {

    const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${weatherAPIKey}`

    fetch(cityURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);

        let weatherResultName = document.createElement('p');
        let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        let weatherResultDate = document.createElement('p');

        weatherResultName.textContent = `${data.name} ${weatherIcon}`;
        //weatherResultDate.textContent = ;

        todayWeather.appendChild(weatherResultName);

        checkForecast(data.coord.lon, data.coord.lat);
    })
}

function checkForecast(lon, lat) {
    console.log(`${lon} ${lat}`);
    const fiveDayForcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;

    fetch(fiveDayForcast).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    })
}

citySubmit.addEventListener('click', function (event) {

    event.preventDefault();
    checkWeather();
})


const citySubmit = document.getElementById('search');
let citySearch = document.getElementById('citySearch');
const weatherAPIKey = '9d3dbee189ccaae4b5d0e40a67f32667';

const cityURL = `https://api.openweathermap.org/data/2.5/weather?q=Charlotte&appid=${weatherAPIKey}`



function checkWeather() {
    fetch(cityURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
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

checkWeather();

citySubmit.addEventListener('click', function (event) {



})


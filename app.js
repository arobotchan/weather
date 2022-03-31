const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // destructure properties
    const { cityDets, weatherDets } = data;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weatherDets.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weatherDets.Temperature.Imperial.Value}</span>
        <span>&deg;F</span>
    </div>`;

    const iconSrc = `img/icons/${weatherDets.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    // update the night/day icon images

    //can also use this line
    const timeSrc = weatherDets.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    // if (weatherDets.IsDayTime) {
    //     timeSrc = 'img/day.svg';
    // }
    // else {
    //     timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
}

const updateCity = async (city) => {    //async because it is going to take some time

    const cityDets = await getCity(city);    //await is used to make sure getCity(city) is finish before assigning value to cityDets(the object)
    const weatherDets = await getWeather(cityDets.Key);

    return {   //new objects
        cityDets: cityDets,
        weatherDets: weatherDets
    };
};

cityForm.addEventListener('submit', e => {
    // prevent default action, doesn't refresh the page
    e.preventDefault();
    // get city value
    const city = cityForm.city.value.trim();
    console.log(city);
    cityForm.reset();   // clears input box

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))    // call updateCity, pass in data(cityDets, weatherDets)
        .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('city', city);

});

if (localStorage.getItem('city')) {     // if item exist in localStorage
    updateCity(localStorage.getItem('city'))  //if so, updateCity with localStorage
        .then(data => updateUI(data))
        .catch(err => console.log(data));
}
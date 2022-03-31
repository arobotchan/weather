const key = 'hCILABX0gWnYLRDU88Y09A11ygk6fzKM';   //location API

// get weather information
const getWeather = async (id) => {

    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};

// get city information
const getCity = async (city) => {

    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];     // returns a promise,  first object in the array
};








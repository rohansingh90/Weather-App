const apikey = '0ff818759352ffe0f192814cd9b5d88c';


const getWeather = async ({city})=>{
    const respons = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`);
    const data = await respons.json();
    return data;
}
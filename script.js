const container = document.querySelector('.container');
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found')
search.addEventListener('click' , () =>
{
    const APIKey = 'bffa270d018f3a098f2035f4a113dfa9';
    const city = document.querySelector('.search-box input').value;
    if(city == '')
        return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
        console.log(json);
        if (json.cod == '404')
        {
            container.style.height = '400px'; 
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        switch (json.weather[0].main)
        {
            case 'Clear':
                image.src = 'clear.png';
                break;
            case 'Clouds' :
                image.src ='cloud.png';
                break;
            case 'Rain':
                image.src = 'rain.png';
                break;
            case 'Snow':
                image.src = 'Snow.png';
                break;
            case 'Mist':
                image.src ='mist.png';
                break;
            case 'Haze':
                image.src ='mist.png';
                break;
            default:
                image.src = 'cloud.png';
                break;
        }
    temperature.innerHTML =`${parseInt(json.main.temp)}<sup>°<span>C</span></sup>`;
    description.innerHTML =`${json.weather[0].description}`;
    humidity.innerHTML =`${json.main.humidity}%`;
    wind.innerHTML =`${parseInt(json.wind.speed)}Km/h`;
    })
    .catch(error => {
        console.error('error fetching weather data: ',error)
    })
});


// const apikey =
// let weather = async() =>
// {

    
//     try
//     {
//         const res = await fetch(temp);
//         const data = await res.json();
//         if(res.ok)
//         {
//             weatherShowfn(data);
//         }
//         else
//         {
//             alert('City not found.please try again');
//         }
//     }
//     catch(error)
//     {
//         console.error('error fetching...')
//     }
//     console.log("cityname: "+cityname);
// }
// weatherShowfn =async(data) =>{
//     $('#city-name').text(data.name);
// 	$('#temperature').html(`${data.main.temp}°C`);
// 	$('#description').text(`Description: ${data.weather[0].description}`);
//     $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
// }

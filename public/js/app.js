console.log('app.js script is loaded!');
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
        
//     })
// })

const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const forecastResponse = document.getElementById('forecastResponse');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = locationInput.value;
    forecastResponse.textContent = 'Loading..';
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {                     
            if(data.error) {
                return console.log(data.error);
            } else {
                forecastResponse.textContent = data.forecast;
                return console.log(data.forecast);
            }
        })
    });
})
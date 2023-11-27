// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_FyckgQNH5X5BXMHuuWj8EgkfY7FcewAgVs2OZscIRCnSDI12cNmbH8Fu9cxZ5GpP';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const { fetchBreeds } = require('./cat-api.js');

fetchBreeds()
  .then(breeds => {
    for (let i = 0; i < breeds.length; i++) {
      let option = document.createElement('option');
      option.value = i;
      option.innerHTML = `${breeds[i].name}`;
      console.log(option);
      breedSelect.appendChild(option);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

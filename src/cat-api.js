import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_FyckgQNH5X5BXMHuuWj8EgkfY7FcewAgVs2OZscIRCnSDI12cNmbH8Fu9cxZ5GpP';
const url = 'https://api.thecatapi.com/v1/breeds';

function fetchBreeds() {
  return axios
    .get(url)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw error;
    });
}

module.exports = { fetchBreeds };

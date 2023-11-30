// import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

breedSelect.style.marginBottom = '60px';

loader.style.display = 'block';

fetchBreeds()
  .then(breeds => {
    loader.style.display = 'none';
    breedSelect.classList.remove('is-hidden');

    for (let i = 0; i < breeds.length; i++) {
      let option = document.createElement('option');
      option.value = breeds[i].id;
      option.innerHTML = breeds[i].name;
      breedSelect.appendChild(option);
    }
  })
  .catch(error => {
    loader.style.display = 'none';
    breedSelect.classList.add('is-hidden');

    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  });

breedSelect.addEventListener('change', function () {
  const selectedBreedId = this.value;
  catInfo.innerHTML = '';

  loader.style.display = 'block';

  fetchCatByBreed(selectedBreedId)
    .then(breeds => {
      loader.style.display = 'none';
      breedSelect.classList.remove('is-hidden');

      if (
        Array.isArray(breeds) &&
        breeds.length > 0 &&
        breeds[0].breeds &&
        breeds[0].breeds.length > 0
      ) {
        const catData = breeds[0];

        // Create image box
        const imgBox = `
        <div style="max-width: 400px; max-height: 400px;">
          <img src="${catData.url}" style="border: 1px solid black; width: 100%; height: auto;">
        </div>
      `;

        // Create text box
        const textBox = `
        <div>
          <h2>${catData.breeds[0].name}</h2>
          <p style="width: 400px;">${catData.breeds[0].description}</p>
          <p><span style="font-weight: 700;">Temperament: </span>${catData.breeds[0].temperament}</p>
        </div>
      `;

        // Display cat info
        catInfo.style.display = 'flex';
        catInfo.style.gap = '40px';
        catInfo.innerHTML = imgBox + textBox;
      } else {
        loader.style.display = 'none';

        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        breedSelect.classList.add('is-hidden');
        console.error(
          'Incomplete or no data received for the selected breed:',
          breeds
        );
      }
    })
    .catch(error => {
      breedSelect.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loader.style.display = 'none';
    });
});

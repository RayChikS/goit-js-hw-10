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

    for (let i = 0; i < breeds.length; i++) {
      let option = document.createElement('option');
      option.value = breeds[i].id;
      option.innerHTML = breeds[i].name;
      breedSelect.appendChild(option);
    }
  })
  .catch(error => {
    loader.style.display = 'none';
    // showError();
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

      if (
        Array.isArray(breeds) &&
        breeds.length > 0 &&
        breeds[0].breeds &&
        breeds[0].breeds.length > 0
      ) {
        const catData = breeds[0];

        const imgBox = document.createElement('div');
        imgBox.style.maxWidth = '400px';
        imgBox.style.maxHeight = '400px';
        const catImg = document.createElement('img');
        catImg.src = catData.url;
        catImg.style.border = '1px solid black';
        catImg.style.width = '100%';
        catImg.style.height = 'auto';
        imgBox.appendChild(catImg);

        const textBox = document.createElement('div');
        const catTitle = document.createElement('h2');
        catTitle.textContent = catData.breeds[0].name;
        const catDescr = document.createElement('p');
        catDescr.textContent = catData.breeds[0].description;
        catDescr.style.width = '400px';
        const span = document.createElement('span');
        span.textContent = 'Temperament: ';
        span.style.fontWeight = '700';
        const catText = document.createElement('p');
        catText.textContent = catData.breeds[0].temperament;
        catText.prepend(span);
        textBox.appendChild(catTitle);
        textBox.appendChild(catDescr);
        textBox.appendChild(catText);

        catInfo.style.display = 'flex';
        catInfo.style.gap = '40px';

        catInfo.appendChild(imgBox);
        catInfo.appendChild(textBox);
      } else {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
        console.error(
          'Incomplete or no data received for the selected breed:',
          breeds
        );
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});

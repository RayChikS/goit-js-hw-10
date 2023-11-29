const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

fetchBreeds()
  .then(breeds => {
    for (let i = 0; i < breeds.length; i++) {
      let option = document.createElement('option');
      option.value = breeds[i].id;
      option.innerHTML = breeds[i].name;
      // console.log(option);
      breedSelect.appendChild(option);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

breedSelect.addEventListener('change', function () {
  const selectedBreedId = this.value;
  catInfo.innerHTML = '';

  fetchCatByBreed(selectedBreedId)
    .then(breeds => {
      console.log(breeds);
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
        console.error(
          'Incomplete or no data received for the selected breed:',
          breeds
        );
      }
    })
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
    });
});

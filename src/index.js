const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const { fetchBreeds, fetchCatByBreed } = require('./cat-api.js');

fetchBreeds()
  .then(breeds => {
    for (let i = 0; i < breeds.length; i++) {
      let option = document.createElement('option');
      option.value = i;
      option.innerHTML = `${breeds[i].name}`;
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
    .then(breed => {
      const catImg = document.createElement('img');
      catImg.src = `${breed.url}`;
      const catTitle = document.createElement('h2');
      catTitle.textContent = `${breed.name}`;
      const catText = document.createElement('p');
      catText.textContent = `${breed.temperament}`;
      catInfo.appendChild(catImg);
      catInfo.appendChild(catTitle);
      catInfo.appendChild(catText);
    })
    .catch(error => {
      console.error('Error fetching cat by breed:', error);
    });
});

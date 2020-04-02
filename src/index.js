console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const dogImgContainer = document.querySelector('#dog-image-container')

    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    const breedContainer = document.querySelector('#dog-breeds')

    const breedArray = []

    const breedSelectDropDown = document.querySelector('#breed-dropdown')

    fetch(imgUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        const message = object.message
        for (const i in message) {
            const newImg = document.createElement('img');
            newImg.src = message[i]
            dogImgContainer.appendChild(newImg)
        }
    });


    fetch(breedUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        const message = object.message
        for (const breed in message) {
            breedArray.push(breed)
        }
        renderBreed(breedArray)
    });

    function renderBreed(array) {
        for (const breed of array) {
            const newLi = document.createElement('li');
            newLi.textContent = breed;
            breedContainer.appendChild(newLi);
        }
    }


    breedContainer.addEventListener('click', (e) => {
        if (e.target.nodeName === 'LI') {
            e.target.style.color = `#${Math.floor(Math.random()*16777215).toString(16)}`
        }
    })




    breedSelectDropDown.addEventListener('change', (e) => {
        const lis = breedContainer.querySelectorAll('li')
        lis.forEach( li => li.remove() );

        const letter = e.target.value
        const newBreedArr = [];
        for (const breed of breedArray) {
            if (breed.slice(0,1) === letter) {
                newBreedArr.push(breed)
            }
        }
        renderBreed(newBreedArr)
    })






})

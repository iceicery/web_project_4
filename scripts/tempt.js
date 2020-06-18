/**
Add the initial array elements to html
***/

//createCard: creat card for imgage elements
function createCard(name, link) {
    //clone template for image elements
    const imgElement = imgTemplate.cloneNode(true);
    const imgItem = imgElement.querySelector('.elements__item');
    const selectImg = imgElement.querySelector('.elements__img');
    const imgRemove = imgElement.querySelector('.elements__trash');
    const imgLike = imgElement.querySelector('.elements__heart');

    imgElement.querySelector(".elements__title").textContent = name;
    selectImg.src = link;
    //like items
    imgLike.addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__heart_active');
    });

    //remove items
    imgRemove.addEventListener('click', () => {
        imgItem.remove();
    });
    //select image and call enlarge popup
    selectImg.addEventListener('click', () => {
        //get the right elements to enlarge
        bigPicTitle.textContent = name;
        bigPicImg.src = link;
        picElement.classList.toggle('hidden');
        darkenDark.classList.toggle('hidden');
    });
    return imgElement;
}


//addImg: add image elements to created card
function addImg(name, link) {
    imgContainer.prepend(createCard(name, link));
}


//call addImg function to add initial elements one by one in the end
initialCards.forEach((card) => addImg(card.name, card.link));


/***
Add a new input to initalCards when submit the form
***/

function inputToCards(evt) {
    evt.preventDefault();
    addImg(imgTitleValue.value, imgLinkValue.value);
}
//submit add image form
addElements.addEventListener('submit', inputToCards);

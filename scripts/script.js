//call and dismiss the form//
const container = document.querySelector('.container');
const editButton = container.querySelector('.profile__button-sqr');
// Let's find the form in the DOM
const formElement = container.querySelector('.edit');
const cancelButton = container.querySelector('.edit__button-icon');
const saveButton = container.querySelector('.edit__button');
const darken = document.querySelector('.darken');
// Let's find the form fields in the DOM
const nameInput = container.querySelector('.edit__input-name');
const jobInput = container.querySelector('.edit__input-job');
// Select elements where the field values will be entered
const titleToChange = container.querySelector('.profile__title');
const subtitleToChange = container.querySelector('.profile__subtitle');
const addButton = container.querySelector('.profile__button-reg');
// add image form in the DOM
const addElements = container.querySelector('.add');
const createButton = container.querySelector('.add__button');
const cancelAddButton = container.querySelector('.add__button-icon');
//input value of creating a new image
const imgTitleValue = container.querySelector(".add__input-title");
const imgLinkValue = container.querySelector(".add__input-img");
//template
const imgTemplate = document.querySelector("#img-template").content;
const imgContainer = document.querySelector('.elements__container');
//big picture fields in DOM
const cancelPicButton = container.querySelector(".bigPic__button-icon");
const picElement = container.querySelector(".bigPic");
const darkenDark = document.querySelector('.darken-dark');
const bigPicImg = container.querySelector('.bigPic__img');
const bigPicTitle = container.querySelector('.bigPic__title');


//submit create image form
function callEdit() {
    formElement.classList.toggle('hidden');
    darken.classList.toggle('hidden');
}

editButton.addEventListener("click", callEdit);
cancelButton.addEventListener("click", callEdit);
saveButton.addEventListener('click', callEdit);


//form submit handler
function formSubmitHandler(evt) {
    evt.preventDefault();
    titleToChange.textContent = nameInput.value;
    subtitleToChange.textContent = jobInput.value;
}

// Connect the handler to the form:
formElement.addEventListener('submit', formSubmitHandler);

//call edit places form
function callAdd() {
    addElements.classList.toggle('hidden');
    darken.classList.toggle('hidden');
}

addButton.addEventListener('click', callAdd);
createButton.addEventListener('click', callAdd);
cancelAddButton.addEventListener('click', callAdd);

//cancel form 
const cancelForm = () => {
    addElements.classList.add('hidden');
    formElement.classList.add('hidden');
    darken.classList.add('hidden');
}
const EscForm = (evt) => {
    if (evt.key === 'Escape') {
        cancelForm();
        console.log("work");
    }
}

darken.addEventListener('click', cancelForm);
document.addEventListener('keydown', EscForm);


/**********************************
//add picture feature
**************************************/
// initial picture array
const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National...",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

/***
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
    imgLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__heart_active');
    });

    //remove items
    imgRemove.addEventListener('click', function () {
        imgItem.remove();
    });
    //select image and call enlarge popup
    selectImg.addEventListener('click', function () {
        //get the right elements to enlarge
        bigPicTitle.textContent = name;
        bigPicImg.src = link;
        picElement.classList.toggle('hidden');
        darkenDark.classList.toggle('hidden');
    });
    return imgElement;
}
createCard();

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

//cancel enlarge popup
const cancelEnlarge = () => {
    picElement.classList.add('hidden');
    darkenDark.classList.add('hidden');
}
//call to cancel enlarge popup 
cancelPicButton.addEventListener('click', cancelEnlarge);
darkenDark.addEventListener('click', cancelEnlarge);



/**
 * validating the "edit profile"
 */

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
}

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement);
    }
}




//check if the whole form is valid
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

//inactive button
const inactiveButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add("button__inactive");
}
//active button
const activeButton = (buttonElement) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button__inactive");
}

//Activate the button and change the form background if the whole form is valid
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        inactiveButton(buttonElement);
    }
    else {
        activeButton(buttonElement);
    }
}

//trigger the input event for edit form. formName are for two seperate forms 'edit' and 'add'
const setEventListeners = (formElement, formName) => {
    const inputList = Array.from(formElement.querySelectorAll(`.${formName}__input`));
    const buttonElement = formElement.querySelector(`.${formName}__button`);
    //set save button inactive before inputing
    toggleButtonState(inputList, buttonElement);
    //trigger the input event for each input
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}


const formEdit = container.querySelector('.edit__form');
const addEdit = container.querySelector('.add__form');

const enableValidation = () => {
    //prevent default
    formElement.addEventListener("summit", function (evt) {
        evt.preventDefault();
    });
    addElements.addEventListener("submit", function (evt) {
        evt.preventDefault();
    });
    //call setEventListeners for edit and add form
    setEventListeners(formEdit, 'edit');
    setEventListeners(addEdit, 'add');
}

enableValidation();

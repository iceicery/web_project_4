//import JS modules
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidatior.js";
import { togglePopup } from "./utils.js";

//DOM//
const container = document.querySelector('.container');
const editButton = container.querySelector('.profile__button-sqr');
// form in the DOM
const formElement = container.querySelector('.edit');
const cancelButton = container.querySelector('.edit__button-icon');
const saveButton = container.querySelector('.edit__button');
const darken = document.querySelector('.darken');
//form fields in the DOM
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
//container for image items
const imgContainer = document.querySelector('.elements__container');
//big picture fields in DOM
const cancelPicButton = container.querySelector(".bigPic__button-icon");
const picElement = container.querySelector(".bigPic");
const darkenDark = document.querySelector('.darken-dark');


//submit create image form
editButton.addEventListener("click", () => {
    togglePopup(formElement, darken);
});
cancelButton.addEventListener("click", () => {
    togglePopup(formElement, darken);
});
saveButton.addEventListener('click', () => {
    togglePopup(formElement, darken);
});


//form submit handler
function formSubmitHandler(evt) {
    evt.preventDefault();
    titleToChange.textContent = nameInput.value;
    subtitleToChange.textContent = jobInput.value;
}

// Connect the handler to the form:
formElement.addEventListener('submit', formSubmitHandler);

//call edit places form
addButton.addEventListener('click', () => {
    togglePopup(addElements, darken);
});
createButton.addEventListener('click', () => {
    togglePopup(addElements, darken);
});
cancelAddButton.addEventListener('click', () => {
    togglePopup(addElements, darken);
});

//cancel form 
const cancelForm = () => {
    addElements.classList.add('hidden');
    formElement.classList.add('hidden');
    darken.classList.add('hidden');
};

//cancel enlarge popup
const cancelEnlarge = () => {
    picElement.classList.add('hidden');
    darkenDark.classList.add('hidden');
};

const EscForm = (evt) => {
    if (evt.key === 'Escape') {
        cancelForm();
        cancelEnlarge();
    }
};

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

class Section{
    constructor({items,renderer},classSelector){
        this._items=items;
        this._renderer=renderer;
        this._container=document.querySelector(classSelector);
    }

    renderer(){
        this._items.forEach(item => {
            this._renderer(item);
        })
    }

    addItem(element){
        this._container.prepened(element);
    }
}

class Popup{
    constructor(popupSelector){
        this._popupItem=document.querySelector(popupSelector);
    }
    open(darkSelector){
        this._popupItem.classList.remove('hidden');
        darkSelector.classList.remove('hidden');
    }
    close(darkSelector){
        this._popupItem.classList.add('hidden');
        darkSelector.classList.add('hidden');
    }
    _handeEscClose(evt){
        if (evt.key="Escape"){
            this.close();
        }
    }
    setEventListeners(){
        this._popupItem.querySelector(`.${popSelector.substring(1)}__button-icon`).addEventListener('clisck',()=>{
            this.close();
        })
        darken.addEventListener('click',()=>{
            this.close();
        })
    }
}

class PopupWithImage extends Popup{ 
    constructor({data},popupSelector){
        super(popupSelector);
        this._title = data.title;
        this._image = data.image;

    }
    open(darkSelector){
        super._open(darkSelector);
        const bigPicImg = document.querySelector('.bigPic__img');
        const bigPicTitle = document.querySelector('.bigPic__title');
        bigPicTitle.textContent = this._text;
        bigPicImg.src = this._link;
    }
}

class PopupWithForm extends Popup{
    constructor(callback,popupSelector){
        super(popupSelector);
        this._callback = callback;
    }
    _getInputValues(){
        //collect data from all input fields
    }
    setEventListeners(){
        //click and close
        //submit
    }
    close(){
        //reset the from
    }
}

//add element to elements container by creating new card class
const addImg = (data) => {
    const card = new Card(data, '#img-template');
    const imgElement = card.createCard();
    imgContainer.prepend(imgElement);
};
//add element for each array element
initialCards.forEach((element) => {
    addImg(element);
});

//add a new input to initialCards when submit the form
const inputToCards = (evt) => {
    evt.preventDefault();
    const newData = {
        name: imgTitleValue.value,
        link: imgLinkValue.value
    };
    addImg(newData);
};
//submit add image form
addElements.addEventListener('submit', inputToCards);


//call to cancel enlarge popup 
cancelPicButton.addEventListener('click', cancelEnlarge);
darkenDark.addEventListener('click', cancelEnlarge);

//object list for edit form
const objectEdit = {
    errorClass: "formElement-error",
    errorMessageClass: "formInput-errorMessage",
    buttonClass: "button-inactive",
    inputList: Array.from(formElement.querySelectorAll(`.edit__input`)),
    buttonElement: formElement.querySelector('.edit__button')
};
//object list for add form
const objectAdd = {
    errorClass: "formInput-error",
    errorMessageClass: "formInput-errorMessage",
    buttonClass: "button-inactive",
    inputList: Array.from(addElements.querySelectorAll('.add__input')),
    buttonElement: addElements.querySelector('.add__button')
};

//validate both forms by creating new FormValidator class
const editValidClass = new FormValidator(objectEdit, formElement);
const addValidClass = new FormValidator(objectAdd, addElements);

editValidClass.enableValidatoin();
addValidClass.enableValidatoin();






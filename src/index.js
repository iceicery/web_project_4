//import CSS
//import "./index.css";
//import JS modules
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidatior.js";
import {
    container, editButton, formElement, darken, nameInput, jobInput, titleToChange, subtitleToChange,
    addButton, addElements, imgTitleValue, imgLinkValue, darkenDark, initialCards
} from "./utils/utils.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

//make a request to the server
//user info
fetch("https://around.nomoreparties.co/v1/group-2/users/me",{
    headers: {
        authorization: "0d9e4066-5c0e-4e11-b840-05b0bd7ab1a8"
      }
})
.then (res => {
    if (res.ok){
        return res.json();
    }else{
        return Promise.reject(res.status);
    }
});

//card
fetch("https://around.nomoreparties.co/v1/group-2/cards", {
  headers: {
    authorization: "0d9e4066-5c0e-4e11-b840-05b0bd7ab1a8"
  }
})
.then(res => res.json());
//edit the profile
fetch("https://around.nomoreparties.co/v1/group-2/users/me", {
  method: "PATCH",
  headers: {
    authorization: "0d9e4066-5c0e-4e11-b840-05b0bd7ab1a8",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Marie Skłodowska Curie",
    about: "Physicist and Chemist"
  })
});
//add a new card  
fetch("https://around.nomoreparties.co/v1/group-2/cards", {
  method: "POST",
  headers: {
    authorization: "0d9e4066-5c0e-4e11-b840-05b0bd7ab1a8",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "test",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  })
});



//create popupImg class for enlarge picture
const popupImg = new PopupWithImage({ popupSelector: '.bigPic', darkSelector: darkenDark });
//add image element to elements container by creating new Section
const addImgList = new Section({
    data: initialCards, renderer: (item) => {
        const card = new Card({
            data: item, handleCardClick: (name, link) => {
                popupImg.open(name, link);
            }
        }, '#img-template');
        const imgElement = card.createCard();
        addImgList.addItem(imgElement);
    }
}, '.elements__container');

addImgList.renderer();

//edit from
// update new userinfo when submitting the edit form
const user = new UserInfo(titleToChange, subtitleToChange);

const formSubmitHandler = (newData) => {
    user.setUserInfo(newData.name, newData.link);
}

const editFormPopup = new PopupWithForm(formSubmitHandler, { popupSelector: '.edit', darkSelector: darken });

//open edit form
editButton.addEventListener("click", () => {
    editFormPopup.open();
});

//add from
//get new img when submiting the add form
const addFormSubmitHandler = (newData) => {
    //const newData = [{ name: imgTitleValue.value, link: imgLinkValue.value }];
    const addImgList = new Section({
        data: [newData], renderer: (item) => {
            const card = new Card({
                data: item, handleCardClick: (name, link) => {
                    popupImg.open(name, link);
                }
            }, '#img-template');
            const imgElement = card.createCard();
            addImgList.addItem(imgElement);
        }
    }, '.elements__container');

    addImgList.renderer();
};

const addFormPopup = new PopupWithForm(addFormSubmitHandler, { popupSelector: '.add', darkSelector: darken });
//open add form
addButton.addEventListener('click', () => {
    addFormPopup.open();
});


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

editValidClass.enableValidation();
addValidClass.enableValidation();



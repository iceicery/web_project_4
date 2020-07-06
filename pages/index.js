//import JS modules
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidatior.js";
import {
    container, editButton, formElement, darken, nameInput, jobInput, titleToChange, subtitleToChange,
    addButton, addElements, imgTitleValue, imgLinkValue, darkenDark, initialCards
} from "../utils/utils.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//add image element to elements container by creating new Section
const addImgList = new Section({
    data: initialCards, renderer: (item) => {
        const card = new Card({
            data: item, handleCardClick: () => {
                const popupImg = new PopupWithImage(item, { popupSelector: '.bigPic', darkSelector: darkenDark });
                popupImg.open();
                popupImg.setEventListeners();
            }
        }, '#img-template');
        const imgElement = card.createCard();
        addImgList.addItem(imgElement);
    }
}, '.elements__container');

addImgList.renderer();

//edit from
// update new userinfo when submitting the edit form
const formSubmitHandler = (evt) => {
    evt.preventDefault();
    const user = new UserInfo(nameInput.value, jobInput.value);
    user.setUserInfo();
}

const editFormPopup = new PopupWithForm((evt) => {
    formSubmitHandler(evt);
}, { popupSelector: '.edit', darkSelector: darken });

editFormPopup.setEventListeners();

//open edit form
editButton.addEventListener("click", () => {
    editFormPopup.open();
});

//add from
//get new img when submiting the add form
const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    const newData = [{ name: imgTitleValue.value, link: imgLinkValue.value }];
    const addImgList = new Section({
        data: newData, renderer: (item) => {
            const card = new Card({
                data: item, handleCardClick: () => {
                    const popupImg = new PopupWithImage(item, { popupSelector: '.bigPic', darkSelector: darkenDark });
                    popupImg.open();
                    popupImg.setEventListeners();
                }
            }, '#img-template');
            const imgElement = card.createCard();
            addImgList.addItem(imgElement);
        }
    }, '.elements__container');

    addImgList.renderer();
};

const addFormPopup = new PopupWithForm((evt) => {
    addFormSubmitHandler(evt);
}, { popupSelector: '.add', darkSelector: darken });

addFormPopup.setEventListeners();
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

editValidClass.enableValidatoin();
addValidClass.enableValidatoin();






//import CSS
//import "./index.css";
//import JS modules
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidatior.js";
import {
    container, editButton, formElement, darken, nameInput, jobInput, titleToChange, subtitleToChange,
    addButton, addElements, imgTitleValue, imgLinkValue, darkenDark, initialCards, api, profileImg, profileImgBox
} from "./utils/utils.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

//create popupImg class for enlarge picture
const popupImg = new PopupWithImage({ popupSelector: '.bigPic', darkSelector: darkenDark });

//add initail cards from server to elements container
api.getInitialCards()
.then(res=>{
    const addImgList = new Section({
        data: res, renderer: (item) => {
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
})
.catch(error=>{
    console.log(error)
})

const user = new UserInfo(titleToChange, subtitleToChange);
//add inital userInfo to container
api.getUserInfo()
.then(res=>{
    user.setUserInfo(res.name,res.about);
})
.catch(error=>{
    console.log(error)
})


//edit from
// update new userinfo when submitting the edit form
const formSubmitHandler = (newData) => {
    user.setUserInfo(newData.name, newData.link);
    api.editProfile(newData.name,newData.link);
};


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
    api.postNewCard(newData.name,newData.link);
};


const addFormPopup = new PopupWithForm(addFormSubmitHandler, { popupSelector: '.add', darkSelector: darken });
//open add form
addButton.addEventListener('click', () => {
    addFormPopup.open();
});

const avatarFormSubmitHandler=(newData) =>{
    profileImg.src = newData.link;
    api.editProfilePic(newData.link);
}
const avatarFormPopup = new PopupWithForm(avatarFormSubmitHandler,{ popupSelector:".avatar",darkSelector: darken});
profileImgBox.addEventListener('click',()=>{
    avatarFormPopup.open();
})


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



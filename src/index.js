//import CSS
//import "./index.css";
//import JS modules
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidatior.js";
import {
    editButton, formElement, darken, titleToChange, subtitleToChange, userId,
    addButton, addElements, darkenDark, api, profileImg, profileImgBox, avatarElements
} from "./utils/utils.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithConfirm from "./components/PopupWithConfirm.js";
import UserInfo from "./components/UserInfo.js";

//create popupImg class for enlarge picture
const popupImg = new PopupWithImage({ popupSelector: '.bigPic', darkSelector: darkenDark });
//create popupWithConfrim class for confirm removing
const popupRemove = new PopupWithConfirm({ popupSelector: '.remove', darkSelector: darken });

//add initail cards from server to elements container
api.getInitialCards()
    .then(res => {
        const addImgList = new Section({
            data: res, renderer: (item) => {
                const ownerId = item.owner._id;
                const cardId = item._id;
                const likeCount = item.likes.length;
                //check if the user already liked the image
                let isLike = false;
                for (let i = 0; i < item.likes.length; i++) {
                    if (item.likes[i]._id === userId) {
                        isLike = true;
                        break;
                    }
                }

                const card = new Card({
                    data: item,
                    handleCardClick: (name, link) => {
                        popupImg.open(name, link);
                    },
                    handleCardRemove: (element, id) => {

                        popupRemove.open(element, id);
                    }

                }, '#img-template', ownerId, cardId, likeCount, isLike);
                const imgElement = card.createCard();
                addImgList.addItem(imgElement);
            }
        }, '.elements__container');

        addImgList.renderer();
    })
    .catch(error => {
        console.log(error)
    })

const user = new UserInfo(titleToChange, subtitleToChange);
const renderLoading=(isLoading,selector,text)=>{
    if (isLoading){
        document.querySelector(`${selector}__button`).textContent=`${text}...`;
    } else {
        document.querySelector(`${selector}__button`).textContent=`${text}`;
    }
}
//add inital userInfo to container
api.getUserInfo()
    .then(res => {
        user.setUserInfo(res.name, res.about);
        profileImg.src = res.avatar;
    })
    .catch(error => {
        console.log(error)
    })


//edit from
// update new userinfo when submitting the edit form
const formSubmitHandler = (newData) => {
    renderLoading(true, '.edit','Save')
    user.setUserInfo(newData.name, newData.link);
    api.editProfile(newData.name, newData.link)
    .finally((res) => {
        renderLoading(false,'.edit','Save');
    })
};


const editFormPopup = new PopupWithForm(formSubmitHandler, { popupSelector: '.edit', darkSelector: darken });

//open edit form
editButton.addEventListener("click", () => {
    editFormPopup.open();
});

//add from
//get new img when submiting the add form


const addFormSubmitHandler = (newData) => {
    renderLoading(true, '.add', 'Create');
    api.postNewCard(newData.name, newData.link)
        .then(res => {
            const addImgList = new Section({
                data: [res], renderer: (item) => {
                    const cardId = item._id;
                    const card = new Card({
                        data: item,
                        handleCardClick: (name, link) => {
                            popupImg.open(name, link);
                        },
                        handleCardRemove: (element, id) => {
                            popupRemove.open(element, id);
                        }
                    }, '#img-template', userId, cardId, 0, false);
                    const imgElement = card.createCard();
                    addImgList.addItem(imgElement);
                }
            }, '.elements__container');

            addImgList.renderer();
        })
        .catch(error => {
            console.log(error)
        })
        .finally((res)=>{
            renderLoading(false,'.add','Create')
        })
};


const addFormPopup = new PopupWithForm(addFormSubmitHandler, { popupSelector: '.add', darkSelector: darken });
//open add form
addButton.addEventListener('click', () => {
    addFormPopup.open();
});

//avatar popup
const avatarFormSubmitHandler = (newData) => {
    renderLoading(true,'.avatar','Save');
    profileImg.src = newData.link;
    api.editProfilePic(newData.link)
    .finally((res)=>{
      renderLoading(false,'.avatar','Save');
    });
}
const avatarFormPopup = new PopupWithForm(avatarFormSubmitHandler, { popupSelector: ".avatar", darkSelector: darken });
profileImgBox.addEventListener('click', () => {
    avatarFormPopup.open();
})



//object list for edit form
const objectEdit = {
    errorClass: "formInput-error",
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
//object list for profileimg form
const objectProfileImg = {
    errorClass: "formInput-error",
    errorMessageClass: "formInput-errorMessage",
    buttonClass: "button-inactive",
    inputList: Array.from(avatarElements.querySelectorAll('.avatar__input')),
    buttonElement: avatarElements.querySelector('.avatar__button')
}

//validate both forms by creating new FormValidator class
const editValidClass = new FormValidator(objectEdit, formElement);
const addValidClass = new FormValidator(objectAdd, addElements);
const avatarValidClass = new FormValidator(objectProfileImg, avatarElements)

editValidClass.enableValidation();
addValidClass.enableValidation();
avatarValidClass.enableValidation();


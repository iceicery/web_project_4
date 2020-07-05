//import JS modules
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidatior.js";
import { container, editButton, formElement, darken, nameInput, jobInput, titleToChange,
         subtitleToChange, addButton, addElements, imgTitleValue, imgLinkValue, darkenDark } from "./utils.js"; 



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
    constructor({data,renderer},classSelector){
        this._items=data; //array of data
        this._renderer=renderer;//function for creating and rendering data
        this._container=document.querySelector(classSelector);//where to add elements
    }

    renderer(){
        this._items.forEach((item) => {
            this._renderer(item);
        })
    }

    addItem(element){
        this._container.prepend(element);
    }
}


class Popup{
    constructor({popupSelector,darkSelector}){
        this._popupSelector=popupSelector;
        this._darkSelector=darkSelector
        this._popupItem=document.querySelector(popupSelector);
    }
    open(){
        this._popupItem.classList.remove('hidden');
        this._darkSelector.classList.remove('hidden');
    }
    close(){
        this._popupItem.classList.add('hidden');
        this._darkSelector.classList.add('hidden');
    }
    _handleEscClose(evt){
        if (evt.key =="Escape"){
            this.close();
        }
    }
    setEventListeners(){
        document.querySelector(`${this._popupSelector}__button-icon`).addEventListener('click',()=>{
            this.close();
        });
        this._darkSelector.addEventListener('click',()=>{
            this.close();
        });
        document.addEventListener('keydown',(evt)=>{
            this._handleEscClose(evt);
        });
    }
}

class PopupWithImage extends Popup{ 
    constructor(data,{popupSelector,darkSelector}){
        super({popupSelector,darkSelector});
        this._name = data.name;
        this._link = data.link;

    }
    open(){
        super.open();
        const bigPicImg = document.querySelector('.bigPic__img');
        const bigPicTitle = document.querySelector('.bigPic__title');
        bigPicTitle.textContent = this._name;
        bigPicImg.src = this._link;
    }
}



class PopupWithForm extends Popup{
    constructor(callback,{popupSelector,darkSelector}){
        super({popupSelector,darkSelector});
        this._arrayList=Array.from(document.querySelectorAll(`${popupSelector}__input`)),
        this._callback = callback;
    }
    _getInputValues(){
        const newData = {
            name: this._arrayList[0].value,
            link: this._arrayList[1].value
        };
        return newData;
        //collect data from all input fields
    }
    setEventListeners(){
        //click and close
        super.setEventListeners();
        //submit
        this._popupItem.addEventListener('submit',this._callback);
        //close the save button
        document.querySelector(`${this._popupSelector}__button`).addEventListener('click',()=>{
            this.close();
            this._callback;
        })
    }
    close(){
        super.close();
        //reset the from
        this._popupItem.reset;
    }
}

class UserInfo{
    constructor(userName,userJob){
        this._name=userName;
        this._job=userJob;
    }
    getUserInfo(){
        const userData = {
           userName: this._name,
           userJob: this._job
        }
        return userData;
    }
    setUserInfo(){
       titleToChange.textContent = this._name;
       subtitleToChange.textContent = this._job;
    }
}
//add element to elements container by creating new Section


const addImgList = new Section({data:initialCards,renderer:(item)=>{
    const card = new Card({data:item, handleCardClick: ()=>{
        const popupImg = new PopupWithImage(item, {popupSelector:'.bigPic',darkSelector:darkenDark});
        popupImg.open();
        popupImg.setEventListeners();
    }}, '#img-template');
    const imgElement=card.createCard();
    addImgList.addItem(imgElement);
}},'.elements__container');

addImgList.renderer();

//get new userinfo when submitting the edit form
const formSubmitHandler=(evt)=> {
    evt.preventDefault();
    const user = new UserInfo(nameInput.value,jobInput.value);
    user.setUserInfo();
}

const editFormPopup = new PopupWithForm((evt)=>{
    formSubmitHandler(evt);
},{popupSelector:'.edit',darkSelector:darken});

editFormPopup.setEventListeners();

//open edit form
editButton.addEventListener("click", () => {
    editFormPopup.open();
});

//get new img when submiting the add form
const addFormSubmitHandler = (evt)=>{
    evt.preventDefault();
    const newData = [{name: imgTitleValue.value, link:imgLinkValue.value}];    
    const addImgList = new Section({data:newData,renderer:(item)=>{
        const card = new Card({data:item, handleCardClick: ()=>{
            const popupImg = new PopupWithImage(item, {popupSelector:'.bigPic',darkSelector:darkenDark});
            popupImg.open();
            popupImg.setEventListeners();
        }}, '#img-template');
        const imgElement=card.createCard();
        addImgList.addItem(imgElement);
    }},'.elements__container');
    
    addImgList.renderer();
};

const addFormPopup = new PopupWithForm((evt) => {
    addFormSubmitHandler(evt);
},{popupSelector:'.add',darkSelector:darken});

addFormPopup.setEventListeners();
//call add form
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






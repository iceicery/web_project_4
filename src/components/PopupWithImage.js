import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector, darkSelector }) {
        super({ popupSelector, darkSelector });
    }
    open(name,link) {
        super.open();
        const bigPicImg = document.querySelector('.bigPic__img');
        const bigPicTitle = document.querySelector('.bigPic__title');
        bigPicTitle.textContent = name;
        bigPicImg.src = link;
        bigPicImg.alt = name;
        this.setEventListeners();
    }
}
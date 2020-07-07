import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ popupSelector, darkSelector }) {
        super({ popupSelector, darkSelector });
    }
    open(data) {
        super.open();
        const bigPicImg = document.querySelector('.bigPic__img');
        const bigPicTitle = document.querySelector('.bigPic__title');
        bigPicTitle.textContent = data.name;
        bigPicImg.src = data.link;
        bigPicImg.alt = data.name;
        this.setEventListeners();
    }
}
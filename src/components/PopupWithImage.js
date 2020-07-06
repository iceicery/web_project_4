import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(data, { popupSelector, darkSelector }) {
        super({ popupSelector, darkSelector });
        this._name = data.name;
        this._link = data.link;

    }
    open() {
        super.open();
        const bigPicImg = document.querySelector('.bigPic__img');
        const bigPicTitle = document.querySelector('.bigPic__title');
        bigPicTitle.textContent = this._name;
        bigPicImg.src = this._link;
    }
}
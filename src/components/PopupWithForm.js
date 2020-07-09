import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(callback, { popupSelector, darkSelector }) {
        super({ popupSelector, darkSelector });
        this._arrayList = Array.from(document.querySelectorAll(`${popupSelector}__input`));
        this._callback = callback;
    }
    _getInputValues() {
        const newData = {
            name: this._popupItem.querySelector(`${this._popupSelector}__input-name`),
            link: this._popupItem.querySelector(`${this._popupSelector}__input-link`)
        };
        return newData;
        //collect data from all input fields
    }
    setEventListeners() {
        //submit
        this._popupItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callback();
            super.close();
        });

        //click and close
        super.setEventListeners();
    }
    close() {
        super.close();
        //reset the from
        document.querySelector(`${this._popupSelector}__form`).reset();
    }
}
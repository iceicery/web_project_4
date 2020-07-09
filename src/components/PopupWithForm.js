import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(callback, { popupSelector, darkSelector }) {
        super({ popupSelector, darkSelector });
        this._callback = callback;
    }
    _getInputValues() {
        //const inputArray = Array.from(this._popupItem.querySelectorAll(`${this._popupSelector}__input`));
        const newData = {
            name: this._popupItem.querySelector(`${this._popupSelector}__input-name`).value,
            link: this._popupItem.querySelector(`${this._popupSelector}__input-job`).value
        };
        return newData;
        //collect data from all input fields
    }
    setEventListeners() {
        //submit
        this._popupItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const newData=this._getInputValues();
            this._callback(newData);
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
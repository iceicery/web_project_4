import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(callback, { popupSelector, darkSelector }) {
        super({ popupSelector, darkSelector });
        this._arrayList = Array.from(document.querySelectorAll(`${popupSelector}__input`)),
            this._callback = callback;
    }
    _getInputValues() {
        const newData = {
            name: this._arrayList[0].value,
            link: this._arrayList[1].value
        };
        return newData;
        //collect data from all input fields
    }
    setEventListeners() {
        //click and close
        super.setEventListeners();
        //submit
        this._popupItem.addEventListener('submit', this._callback);
        //close the save button
        document.querySelector(`${this._popupSelector}__button`).addEventListener('click', () => {
            this.close();
            this._callback;
        })
    }
    close() {
        super.close();
        //reset the from
        this._popupItem.reset;
    }
}
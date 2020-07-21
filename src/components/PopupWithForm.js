import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(callback, { popupSelector, darkSelector }) {
        super({ popupSelector, darkSelector });
        this._callback = callback;
    }
    _getInputValues() {
        const form=this._popupItem.querySelector(`${this._popupSelector}__form`);
        const newData = {
            name: form.name.value,
            link: form.link.value
        };
        return newData;
        //collect data from all input fields
    }
    setEventListeners() {
        //submit
        this._popupItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callback(this._getInputVales());
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


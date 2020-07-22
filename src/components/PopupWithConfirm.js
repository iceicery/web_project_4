import Popup from "./Popup.js";
import { api } from "../utils/utils.js"
export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, darkSelector }) {
        super({ popupSelector, darkSelector });
    }

    open(item, id) {
        super.open();
        this.remove(item,id);
        this.setEventListeners();
    }
    
    remove(item,id){
        this._popupItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
            super.close();
            api.deleteCard(id);
            item.remove();
        });
    }

    setEventListeners() {
        //submit
        super.setEventListeners();

    }
}
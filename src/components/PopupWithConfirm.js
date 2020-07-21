import Popup from "./Popup.js";
import {api} from "../utils/utils.js"
export default class PopupWithConfirm extends Popup{
    constructor({popupSelector, darkSelector}){
        super({popupSelector,darkSelector});
    }

    open(removeItem, deleteCard){
        super.open();
        this.setEventListeners(removeItem,deleteCard);
    }

    deleteCard(removeItem,deleteCard){
        removeItem.remove();
        api.deleteCard(deleteCard);
        console.log('deleteCard');
    }

    setEventListeners(removeItem, deleteCard){
        //submit
        this._popupItem.addEventListener('click',()=>{
            //evt.preventDefault();
            this.deleteCard(removeItem,deleteCard);
            console.log('setEvent');
            super.close();
        });
        super.setEventListeners();
        
    }
}
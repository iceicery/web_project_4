import Popup from "./Popup.js";
import {api} from "../utils/utils.js"
export default class PopupWithConfirm extends Popup{
    constructor(callback,{popupSelector, darkSelector}){
        super({popupSelector,darkSelector});
        this._callback=callback;
    }

    open(){
        super.open();
        this.setEventListeners();
    }

    deleteCard(removeItem,deleteCard){
        removeItem.remove();
        api.deleteCard(deleteCard);
    }

    setEventListeners(){
        //submit
        this._popupItem.addEventListener('click',()=>{
            //evt.preventDefault();
            this._callback();
            super.close();
        });
        super.setEventListeners();
        
    }
}
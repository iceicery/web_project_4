import Popup from "./Popup.js";
import {api} from "../utils/utils.js"
export default class PopupWithConfirm extends Popup{
    constructor({popupSelector, darkSelector}){
        super({popupSelector,darkSelector});
    }

    open(item,id){
        super.open();
        this.setEventListeners(item,id);
    }

    setEventListeners(item,id){
        //submit
        this._popupItem.addEventListener('click',()=>{
            item.remove();
            api.deleteCard(id);
            super.close();
        });
        super.setEventListeners();
        
    }
}
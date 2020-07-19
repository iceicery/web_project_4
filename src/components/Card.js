import {userId, api} from "../utils/utils.js";
export default class Card {
      constructor({ data, handleCardClick }, cardSelector,ownerId,cardId){
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._ownerId=ownerId;
        this._cardId=cardId;
    }
    //clone template for image elements
    _getTemplate() {
        const imgElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector(".elements__item")
            .cloneNode(true);

        return imgElement;

    }

    createCard() {
        this._element = this._getTemplate();


        this._element.querySelector(".elements__title").textContent = this._name;
        this._element.querySelector(".elements__img").src = this._link;      
        if (this._ownerId === userId){
            this._element.querySelector(".elements__trash").classList.remove('hidden');
        }
        this._setEventListeners();
        return this._element;
    }

    _removeItem() {
        this._element.remove();
        api.deleteCard(this._cardId);
    }
    _setEventListeners() {
        //like items
        this._element.querySelector('.elements__heart').addEventListener('click', (evt) => {
            evt.target.classList.toggle('elements__heart_active');
        });
        //remove items
        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            this._removeItem();
        });
        //enlarge items
        this._element.querySelector('.elements__img').addEventListener('click', () => {
            this._handleCardClick(this._name,this._link);
        })
    }
}


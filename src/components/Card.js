import { userId, api } from "../utils/utils.js";

export default class Card {
    constructor({ data, handleCardClick, handleCardRemove }, cardSelector, ownerId, cardId, likeCount, isLike) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._ownerId = ownerId;
        this._cardId = cardId;
        this._likeCount = likeCount;
        this._isLike = isLike;
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
        this._element.querySelector('.elements__like-count').textContent = `${this._likeCount}`;
        if (this._isLike === true) {
            this._element.querySelector('.elements__heart').classList.add('elements__heart_active');
        }
        if (this._ownerId === userId) {
            this._element.querySelector(".elements__trash").classList.remove('hidden');
        }
        this._setEventListeners();
        return this._element;
    }

    _removeItem() {
        this._element.remove();
        api.deleteCard(this._cardId);
    }

    _like() {
        this._isLike = !this._isLike;
    }

    _toggleLike() {
        if (this._isLike === false) {
            api.addLike(this._cardId);
            this._likeCount = this._likeCount + 1
            this._element.querySelector('.elements__heart').classList.add('elements__heart_active');
            this._like();
        } else {
            api.deleteLike(this._cardId);
            this._likeCount = this._likeCount - 1;
            this._element.querySelector('.elements__heart').classList.remove('elements__heart_active');
            this._like();
        }
        this._element.querySelector('.elements__like-count').textContent = `${this._likeCount}`;
    }


    _setEventListeners() {
        //like items
        this._element.querySelector('.elements__heart').addEventListener('click', (evt) => {
            //evt.target.classList.toggle('elements__heart_active');
            this._toggleLike();
        });
        //remove items
        this._element.querySelector('.elements__trash').addEventListener('click', () => {
            const item = this._element;
            const id = this._cardId;
            this._handleCardRemove(item, id);
        });
        //enlarge items
        this._element.querySelector('.elements__img').addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }
}

class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._text = data.name;
        this._link = data.link;
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


        this._element.querySelector(".elements__title").textContent = this._text;
        this._element.querySelector(".elements__img").src = this._link;
        this._setEventListeners();
        return this._element;
    }

    _removeItem() {
        this._element.remove();
    }

    _enlargePic() {
        const picElement = document.querySelector(".bigPic");
        const darkenDark = document.querySelector('.darken-dark');
        const bigPicImg = document.querySelector('.bigPic__img');
        const bigPicTitle = document.querySelector('.bigPic__title');
        bigPicTitle.textContent = this._text;
        bigPicImg.src = this._link;
        picElement.classList.toggle('hidden');
        darkenDark.classList.toggle('hidden');
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
            this._enlargePic();
        })
    }
}

export { Card };
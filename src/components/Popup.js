export default class Popup {
    constructor({ popupSelector, darkSelector }) {
        this._popupSelector = popupSelector;
        this._darkSelector = darkSelector
        this._popupItem = document.querySelector(popupSelector);
    }
    open() {
        this._popupItem.classList.remove('hidden');
        this._darkSelector.classList.remove('hidden');
    }
    close() {
        this._popupItem.classList.add('hidden');
        this._darkSelector.classList.add('hidden');
    }
    _handleEscClose(evt) {
        if (evt.key == "Escape") {
            this.close();
        }
    }
    setEventListeners() {
        document.querySelector(`${this._popupSelector}__button-icon`).addEventListener('click', () => {
            this.close();
        });
        this._darkSelector.addEventListener('click', () => {
            this.close();
        });
        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt);
        });
    }
}
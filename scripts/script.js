//call and dismiss the form//
const container = document.querySelector('.container');
const editButton = container.querySelector('.profile__button-sqr');
// Let's find the form in the DOM
const formElement = container.querySelector('.edit');
const cancelButton = container.querySelector('.edit__button-icon');
const saveButton = container.querySelector('.edit__button');
const darken = document.querySelector('.darken');
// Let's find the form fields in the DOM
const nameInput = container.querySelector('.edit__input-name');
const jobInput = container.querySelector('.edit__input-job');
// Select elements where the field values will be entered
const titleToChange = container.querySelector('.profile__title');
const subtitleToChange = container.querySelector('.profile__subtitle');
const addButton = container.querySelector('.profile__button-reg');
// add image form in the DOM
const addElements = container.querySelector('.add');
const createButton = container.querySelector('.add__button');
const cancelAddButton = container.querySelector('.add__button-icon');
//input value of creating a new image
const imgTitleValue = container.querySelector(".add__input-title");
const imgLinkValue = container.querySelector(".add__input-img");
//container for image items
const imgContainer = document.querySelector('.elements__container');
//big picture fields in DOM
const cancelPicButton = container.querySelector(".bigPic__button-icon");
const picElement = container.querySelector(".bigPic");
const darkenDark = document.querySelector('.darken-dark');
const bigPicImg = container.querySelector('.bigPic__img');
const bigPicTitle = container.querySelector('.bigPic__title');



//submit create image form
function callEdit() {
    formElement.classList.toggle('hidden');
    darken.classList.toggle('hidden');
}

editButton.addEventListener("click", callEdit);
cancelButton.addEventListener("click", callEdit);
saveButton.addEventListener('click', callEdit);


//form submit handler
function formSubmitHandler(evt) {
    evt.preventDefault();
    titleToChange.textContent = nameInput.value;
    subtitleToChange.textContent = jobInput.value;
}

// Connect the handler to the form:
formElement.addEventListener('submit', formSubmitHandler);

//call edit places form
function callAdd() {
    addElements.classList.toggle('hidden');
    darken.classList.toggle('hidden');
}

addButton.addEventListener('click', callAdd);
createButton.addEventListener('click', callAdd);
cancelAddButton.addEventListener('click', callAdd);

//cancel form 
const cancelForm = () => {
    addElements.classList.add('hidden');
    formElement.classList.add('hidden');
    darken.classList.add('hidden');
};

//cancel enlarge popup
const cancelEnlarge = () => {
    picElement.classList.add('hidden');
    darkenDark.classList.add('hidden');
};

const EscForm = (evt) => {
    if (evt.key === 'Escape') {
        cancelForm();
        cancelEnlarge();
    }
};

darken.addEventListener('click', cancelForm);
document.addEventListener('keydown', EscForm);


/**********************************
//add picture feature
**************************************/
// initial picture array
const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National...",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

//create class Card

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


//add element to elements container
const addImg = (data) => {
    const card = new Card(data, '.img-template');
    const imgElement = card.createCard();
    imgContainer.prepend(imgElement);
}
//add element for each array element
initialCards.forEach((element) => {
    addImg(element);
});

//add a new input to initialCards when submit the form

const inputToCards = (evt) => {
    evt.preventDefault();
    const newData = {
        name: imgTitleValue.value,
        link: imgLinkValue.value
    };
    addImg(newData);
}
//submit add image form
addElements.addEventListener('submit', inputToCards);


//call to cancel enlarge popup 
cancelPicButton.addEventListener('click', cancelEnlarge);
darkenDark.addEventListener('click', cancelEnlarge);




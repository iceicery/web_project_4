const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("formInput-error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("formInput-errorMessage");
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("formInput-error");
    errorElement.classList.remove("formInput-errorMessage");
    errorElement.textContent = "";
}

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement);
    }
}




//check if the whole form is valid
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

//inactive button
const inactiveButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add("button-inactive");
}
//active button
const activeButton = (buttonElement) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button-inactive");
}

//Activate the button and change the form background if the whole form is valid
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        inactiveButton(buttonElement);
    }
    else {
        activeButton(buttonElement);
    }
}

//trigger the input event for edit form. formName are for two seperate forms 'edit' and 'add'
const setEventListeners = (formElement, formName) => {
    const inputList = Array.from(formElement.querySelectorAll(`.${formName}__input`));
    const buttonElement = formElement.querySelector(`.${formName}__button`);
    //set save button inactive before inputing
    toggleButtonState(inputList, buttonElement);
    //trigger the input event for each input
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}


const formEdit = container.querySelector('.edit__form');
const addEdit = container.querySelector('.add__form');

const enableValidation = () => {
    //prevent default
    formElement.addEventListener("summit", function (evt) {
        evt.preventDefault();
    });
    addElements.addEventListener("submit", function (evt) {
        evt.preventDefault();
    });
    //call setEventListeners for edit and add form
    setEventListeners(formEdit, 'edit');
    setEventListeners(addEdit, 'add');
}

enableValidation();

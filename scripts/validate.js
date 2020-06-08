// I was told to declare container here. But it shows error in console since I already declare it in script.js
//const container = document.querySelector('.container');
//const formEdit = container.querySelector('.edit__form');
//const addEdit = container.querySelector('.add__form');

const showInputError = (formSelector, inputElement, inputErrorClass, errorClass, errorMessage) => {
    const errorElement = formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(`${inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${errorClass}`);
};


const hideInputError = (formSelector, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(`${inputErrorClass}`);
    errorElement.classList.remove(`${errorClass}`);
    errorElement.textContent = "";
};

const checkInputValidity = (formSelector, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formSelector, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
    }
    else {
        hideInputError(formSelector, inputElement, inputErrorClass, errorClass);
    }
};




//check if the whole form is valid
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//inactive button
const inactiveButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(`${inactiveButtonClass}`);
};
//active button
const activeButton = (buttonElement, inactiveButtonClass) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(`${inactiveButtonClass}`);
};

//Activate the button and change the form background if the whole form is valid
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        inactiveButton(buttonElement, inactiveButtonClass);
    }
    else {
        activeButton(buttonElement, inactiveButtonClass);
    }
};




//trigger the input event for edit form. formName are for two seperate forms 'edit' and 'add'
const setEventListeners = (formSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const formName = formSelector.className.split(" ")[0];
    const inputList = Array.from(formSelector.querySelectorAll(`.${formName}__input`));
    const buttonElement = formSelector.querySelector(`.${formName}__button`);
    //set save button inactive before inputing
    toggleButtonState(inputList, buttonElement);
    //trigger the input event for each input
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formSelector, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};




const enableValidation = (formSelector,/* inputSelector, submitButtonSelector,*/ inactiveButtonClass, inputErrorClass, errorClass) => {
    //prevent default
    formSelector.addEventListener("summit", (evt) => {
        evt.preventDefault();
    });
    //call setEventListeners for edit and add form
    setEventListeners(formSelector, inactiveButtonClass, inputErrorClass, errorClass);
};

enableValidation(formElement, "button-inactive", "formInput-error", "formInput-errorMessage");
enableValidation(addElements, "button-inactive", "formInput-error", "formInput-errorMessage");


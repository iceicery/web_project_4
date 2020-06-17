const showInputError = (formSelector, inputElement, errorMessage) => {
    const errorElement = formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("formInput-error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("formInput-errorMessage");
};


const hideInputError = (formSelector, inputElement) => {
    const errorElement = formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("formInput-error");
    errorElement.classList.remove("formInput-errorMessage");
    errorElement.textContent = "";
};

const checkInputValidity = (formSelector, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formSelector, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(formSelector, inputElement);
    }
};




//check if the whole form is valid
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

//inactive button
const inactiveButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add("button-inactive");
};
//active button
const activeButton = (buttonElement) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button-inactive");
};

//Activate the button and change the form background if the whole form is valid
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        inactiveButton(buttonElement);
    }
    else {
        activeButton(buttonElement);
    }
};




//trigger the input event for edit form. formName are for two seperate forms 'edit' and 'add'
const setEventListeners = (formSelector) => {
    const formName = formSelector.className.split(" ")[0];
    const inputList = Array.from(formSelector.querySelectorAll(`.${formName}__input`));
    const buttonElement = formSelector.querySelector(`.${formName}__button`);
    //set save button inactive before inputing
    toggleButtonState(inputList, buttonElement);
    //trigger the input event for each input
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(formSelector, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};




const enableValidation = (formSelector) => {
    //prevent default
    formSelector.addEventListener("submit", (evt) => {
        evt.preventDefault();
    });
    //call setEventListeners for edit and add form
    setEventListeners(formSelector);
};

enableValidation(formElement);
enableValidation(addElements);



class FormValidator{
    constructor(object,formSelector){
        this._object=object;
        this._formSelector=formSelector;
    }
    _showInputError(inputElement,errorMessage){
        const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._object.errorclass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._object.errorMessageClass);
    }

    _hideInputError(inputElement){
        const errorElement= this._formSelector.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._object.errorclass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._object.errorMessageClass);
    }
    _checkInputValidity(inputElement){
        if(!inputElement.validity.valid){
            this._showInputError(inputElement,inputElement.validationMessage);
        }
        else{
            this._hideInputError(inputElement);
        }
    }

    //check if the whole form is valid
    _hasInvalidInput(){
        return this._object.inputList.some((inputElement)=>{
            return !inputElement.validity.valid;
        })
    }
    
    _inactiveButton(){
        this._object.buttonElement.disabled = true;
        this._object.buttonElement.classList.add(this._object.buttonClass);
    }
    
    _activeButton(){
        this._object.buttonElement.disabled = false;
        this._object.buttonElement.classList.remove(this._object.buttonClass);
    }

   //Activate the button and change the form background if the whole form is valid
   _toggleButtonState(){
       if (this._hasInvalidInput()){
           this._inactiveButton();
       }
       else{
           this._activeButton();
       }
   }
   _setEventListeners(){
       //set button incative before inputing
       this._toggleButtonState();
       //trigger the input event for each input
       this._object.inputList.forEach((inputElement)=>{
           inputElement.addEventListener('input',()=>{
               this._checkInputValidity(inputElement);
               this._toggleButtonState();
           })
       })
   }

   enableValidatoin(){
      this._formSelector.addEventListener("sumbit",(evt)=>{
          evt.preventDefault();
      });
      this._setEventListeners();
   }

}


const objectEdit={
    errorClass:"formElement-error",
    errorMessageClass:"formInput-errorMessage",
    buttonClass:"button-inactive",
    inputList:Array.from(formElement.querySelectorAll(`.edit__input`)),
    buttonElement:formElement.querySelector('.edit__button')
};

const objectAdd={
    errorClass:"formInput-error",
    errorMessageClass:"formInput-errorMessage",
    buttonClass:"button-inactive",
    inputList:Array.from(addElements.querySelectorAll('.add__input')),
    buttonElement:addElements.querySelector('.add__button')
};


const editValidClass= new FormValidator(objectEdit,formElement);
const addValidClass= new FormValidator(objectAdd, addElements);

editValidClass.enableValidatoin();
addValidClass.enableValidatoin();



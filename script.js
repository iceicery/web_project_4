//call and dismiss the form//

let container=document.querySelector('.container');
let editButton=container.querySelector('.profile__button-sqr');
let editForm=container.querySelector('.edit');
let cancelButton=container.querySelector('.edit__icon');


function displayEdit(){
    editForm.classList.remove('edit__hidden');
}
function hiddenEdit(){
    editForm.classList.add('edit__hidden');
}


editButton.addEventListener("click",displayEdit);
cancelButton.addEventListener("click",hiddenEdit);



// Let's find the form in the DOM
let formElement = container.querySelector('.edit');

// Next is the form submit handler, though
// it won't submit anywhere just yet
function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
                                                // Having done so, we can define our own way of submitting the form.
                                                // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = container.querySelector('#name');
    let jobInput = container.querySelector('#job');// Use querySelector()
    console.log(nameInput.value);
    // Get the values of each field from the corresponding value property
    let name = nameInput.value;
    let job = jobInput.value;
    // Select elements where the field values will be entered
    let titleToChange=container.querySelector('.profile__title');
    let subtitleToChange=container.querySelector('.profile_subtitle') 
    // Insert new values using the textContent property of the querySelector() method
    titleToChange.innerHTML=name;
    subtitleToChange.innerHTML=job;
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);
let saveButton=container.querySelector('.edit__button');
saveButton.addEventListener('click',hiddenEdit); 

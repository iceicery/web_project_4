//call and dismiss the form//

const container=document.querySelector('.container');
const editButton=container.querySelector('.profile__button-sqr');
// Let's find the form in the DOM
const formElement=container.querySelector('.edit');
const cancelButton=container.querySelector('.edit__button-icon');
const saveButton=container.querySelector('.edit__button');
const darken=document.querySelector('.darken');


function callEdit(){
    formElement.classList.toggle('hidden');
    darken.classList.toggle('hidden');
}

editButton.addEventListener("click",callEdit);
cancelButton.addEventListener("click",callEdit);
saveButton.addEventListener('click',callEdit); 


// Next is the form submit handler, though
// it won't submit anywhere just yet
function formSubmitHandler (evt) {
    evt.preventDefault(); // This line stops the browser from submitting the form in the default way.
                                                // Having done so, we can define our own way of submitting the form.
                                                // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = container.querySelector('.edit__input-name');
    let jobInput = container.querySelector('.edit__input-job');// Use querySelector()
    // Get the values of each field from the corresponding value property
    let name = nameInput.value;
    let job = jobInput.value;
    // Select elements where the field values will be entered
    let titleToChange=container.querySelector('.profile__title');
    let subtitleToChange=container.querySelector('.profile__subtitle'); 
    // Insert new values using the textContent property of the querySelector() method
    titleToChange.textContent=name;
    subtitleToChange.textContent=job;
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);

//call edit places form
const addButton=container.querySelector('.profile__button-reg');
const addElements=container.querySelector('.add');
const createButton=container.querySelector('.add__button');
const cancelAddButton=container.querySelector('.add__button-icon');

function callAdd(){
    addElements.classList.toggle('hidden');
    darken.classList.toggle('hidden');
}

addButton.addEventListener('click',callAdd);
createButton.addEventListener('click',callAdd);
cancelAddButton.addEventListener('click',callAdd);

//call the big picture while selected.

const selectImg=container.querySelector('.elements__img');
const cancelPicButton=container.querySelector('.bigPic__button-icon');
const picElement=container.querySelector('.bigPic');
const darkenDark=document.querySelector('.darken-dark');

function callPic(){
    picElement.classList.toggle('hidden');
    darkenDark.classList.toggle('hidden');
}

selectImg.addEventListener('click',callPic);
cancelPicButton.addEventListener('click',callPic);
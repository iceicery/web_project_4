//call and dismiss the form//

const container=document.querySelector('.container');
const editButton=container.querySelector('.profile__button-sqr');
// Let's find the form in the DOM
let formElement=container.querySelector('.edit');
const cancelButton=container.querySelector('.edit__button-icon');
const saveButton=container.querySelector('.edit__button');


function callEdit(){
    formElement.classList.toggle('hidden');
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
    let subtitleToChange=container.querySelector('.profile_subtitle'); 
    // Insert new values using the textContent property of the querySelector() method
    titleToChange.textContent=name;
    subtitleToChange.textContent=job;

    //???????????????? Question ???????????????????????????????????????????//
    //I was told to delete one of unneccesary <div> which I wrap title and button, now I put the button inside the <h1> for better aligning title and the button
    //But when user input a value, it will overwrite the button.
    //Is this a way to keep my title buttun using script? or I need to put the <div> back. Thanks,
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);



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

//add picture feature

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
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];

console.log(initialCards[0]['name']);
console.log(initialCards[0]['link']);

//add new input to initalCards when submit the form
function inputToCards(evt){
    evt.preventDefault();
    let imgTitleValue=container.querySelector(".add__input-title").value;
    let imgLinkValue=container.querySelector(".add__input-img").value;
    //only add it if there are values 
    if (!!imgTitleValue || !!imgLinkValue){
    initialCards.push({name: imgTitleValue,link: imgLinkValue});
    console.log(initialCards)
    };
}
addElements.addEventListener('submit', inputToCards);

console.log(initialCards);
//initialCards[initialCards.length]['link']= "https://code.s3.yandex.net/web-code/lake-louise.jpg";
//console.log(initialCards);
//This is container for all the pictures
//const imgContainer=container.querySelector(".elements__container");



/*


const imgContainer=container.querySelector(".elements__container");

function addImg(name,link){
    const imgTemplate=document.querySelector("#img-template").content;
    const imgElement=imgTemplate.cloneNode(true);

    imgElement.querySelector(".elements__title").textContent = imgTitleValue;
    imgElement.querySelector(".elements__img").src = imgLinkValue;

    imgContainer.append(imgElement);
}*/
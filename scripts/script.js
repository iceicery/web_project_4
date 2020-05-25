//call and dismiss the form//

const container=document.querySelector('.container');
const editButton=container.querySelector('.profile__button-sqr');
// Let's find the form in the DOM
const formElement=container.querySelector('.edit');
const cancelButton=container.querySelector('.edit__button-icon');
const saveButton=container.querySelector('.edit__button');
const darken=document.querySelector('.darken');
// Let's find the form fields in the DOM
const nameInput = container.querySelector('.edit__input-name');
const jobInput = container.querySelector('.edit__input-job');
// Select elements where the field values will be entered
const titleToChange=container.querySelector('.profile__title');
const subtitleToChange=container.querySelector('.profile__subtitle'); 
const addButton=container.querySelector('.profile__button-reg');
// add image form in the DOM
const addElements=container.querySelector('.add');
const createButton=container.querySelector('.add__button');
const cancelAddButton=container.querySelector('.add__button-icon');
//input value of creating a new image
const imgTitleValue=container.querySelector(".add__input-title");
const imgLinkValue=container.querySelector(".add__input-img");

//submit create image form
addElements.addEventListener('submit',function(){
    console.log(imgTitleValue.value);
});

formElement.addEventListener('submit',function(){
    console.log(nameInput.value);
});


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
    
    
    // Insert new values using the textContent property of the querySelector() method
    titleToChange.textContent=nameInput.value;
    subtitleToChange.textContent=jobInput.value;
}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', formSubmitHandler);

//call edit places form


function callAdd(){
    addElements.classList.toggle('hidden');
    darken.classList.toggle('hidden');
}

addButton.addEventListener('click',callAdd);
createButton.addEventListener('click',callAdd);
cancelAddButton.addEventListener('click',callAdd);


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

/***
Add the initial array elements to html
***/

const imgContainer=container.querySelector(".elements__container");
const darkenDark=document.querySelector('.darken-dark');

//createCard: creat card for imgage elements
function createCard(name,link) {
    //template for image elements
    const imgTemplate=document.querySelector("#img-template").content;
    const imgElement=imgTemplate.cloneNode(true);
    const imgItem=imgElement.querySelector('.elements__item');
    const selectImg=imgElement.querySelector('.elements__img');
    const imgRemove=imgElement.querySelector('.elements__trash');
    const imgLike=imgElement.querySelector('.elements__heart');
    
    imgElement.querySelector(".elements__title").textContent = name;
    selectImg.src = link;
    
    //like items
    imgLike.addEventListener('click',function(evt){
        evt.target.classList.toggle('elements__heart_active');
    })
    
    //remove items
    imgRemove.addEventListener('click',function(){
        imgItem.remove();
    })
    return imgElement;

}

//addImg: add image elements to created card
function addImg(name,link){
    imgContainer.prepend(createCard(name,link));
}

//addImg function: add elements to the end of <ul> 
//                  also add enlarge elements to the end of <main> 
/*function addImg(name,link){
    //template for image elements
    const imgTemplate=document.querySelector("#img-template").content;
    const imgElement=imgTemplate.cloneNode(true);
    const imgItem=imgElement.querySelector('.elements__item');
    const selectImg=imgElement.querySelector('.elements__img');
    const imgRemove=imgElement.querySelector('.elements__trash');
    const imgLike=imgElement.querySelector('.elements__heart');
    
    imgElement.querySelector(".elements__title").textContent = name;
    selectImg.src = link;

    imgContainer.append(imgElement);

    //template for enlarge image
    const bigPicTemplate=document.querySelector('#bigPic-template').content;
    const bigPicElement=bigPicTemplate.cloneNode(true);

    const cancelPicButton=bigPicElement.querySelector(".bigPic__button-icon");
    const picElement=bigPicElement.querySelector(".bigPic");

    bigPicElement.querySelector(".bigPic__title").textContent= name;
    bigPicElement.querySelector(".bigPic__img").src= link;

    container.append(bigPicElement);    

    //callPic function: call enlarge image
    function callPic(){
    picElement.classList.toggle('hidden');
    darkenDark.classList.toggle('hidden');
    }
  
    //activate select img fuction
    selectImg.addEventListener('click',callPic);
    //activate cancel function
    cancelPicButton.addEventListener('click',callPic);
    
    //like items
    imgLike.addEventListener('click',function(evt){
        evt.target.classList.toggle('elements__heart_active');
    })
    
    //remove items
    imgRemove.addEventListener('click',function(){
        imgItem.remove();
    })
        
}*/
//call addImg function to add initial elements one by one in the end
for (let i=0 ; i< initialCards.length ; i++ ){
    addImg(initialCards[i]['name'],initialCards[i]['link']);
 }

 addImg("test","https://code.s3.yandex.net/web-code/lago.jpg")
/***
Add a new input to initalCards when submit the form
***/
console.log(nameInput.value);
console.log(jobInput.value);
console.log(imgTitleValue.value);
console.log(imgLinkValue.value);


function inputToCards(){
    name=imgTitleValue.value;
    title=imgLinkValue.value;
    return addImg(name,title);
}

//submit create image form
addElements.addEventListener('submit', inputToCards);


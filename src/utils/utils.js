import Api from "../components/Api.js";
//DOM//
export const container = document.querySelector('.container');
export const editButton = container.querySelector('.profile__button-sqr');
// form in the DOM
export const formElement = container.querySelector('.edit');
export const darken = document.querySelector('.darken');
//form fields in the DOM
export const nameInput = container.querySelector('.edit__input-name');
export const jobInput = container.querySelector('.edit__input-job');
// Select elements where the field values will be entered
export const titleToChange = container.querySelector('.profile__title');
export const subtitleToChange = container.querySelector('.profile__subtitle');
export const addButton = container.querySelector('.profile__button-reg');
// add image form in the DOM
export const addElements = container.querySelector('.add');
//input value of creating a new image
export const imgTitleValue = container.querySelector(".add__input-title");
export const imgLinkValue = container.querySelector(".add__input-img");
export const darkenDark = document.querySelector('.darken-dark');
export const profileImgBox = container.querySelector('.profile__img-container');
export const profileImg = container.querySelector('.profile__img');
export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-2",
    headers: {
        authorization: "0d9e4066-5c0e-4e11-b840-05b0bd7ab1a8",
        "Content-Type": "application/json"
    },
    userId: "ac6044650092e0692f027c6c"
});
export const userId = api.getId();


/*
export const initialCards = [
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
*/
export default class Api {
    constructor({ baseUrl, headers, userId }) {
        this.url = baseUrl;
        this.headers = headers;
        this.id = userId;
    }
    //get user Id
    getId() {
        return this.id;
    }

    //GET https://around.nomoreparties.co/v1/groupId/cards
    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
            .then((res) => { return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) })

    }

    //GET https://around.nomoreparties.co/v1/groupId/users/me
    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
            .then((res) => { return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) })
    }

    getAppInfo() {
        return Promise.all(this.getInitialCards(), this.getUserInfo())
    }
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    editProfile(newName, newJob) {
        return fetch(`${this.url}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: newName,
                about: newJob
            })
        })
            .then((res) => { return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) })
            .catch(error => {
                console.log(error)
            })
        
    }
    //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    editProfilePic(newLink) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: newLink
            })
        })
            .then((res) => { return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) })
            .catch(error => {
                console.log(error)
            })
        
    }
    //POST https://around.nomoreparties.co/v1/groupId/cards
    postNewCard(newName, newLink) {
        return fetch(`${this.url}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify({
                name: newName,
                link: newLink
            })
        })
        .then((res) => { return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) })
    }
    //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
    deleteCard(cardId) {
        fetch(`${this.url}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers
        })
            .then((res) => { return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) })
            .catch(error => {
                console.log(error)
            })
        
    }

    //PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    addLike(cardId) {
        fetch(`${this.url}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this.headers
        })
            .then((res) => { return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) })
            .catch(error => {
                console.log(error)
            })
        
    }
    //DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    deleteLike(cardId) {
        fetch(`${this.url}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this.headers
        })
            .then((res) => { return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) })
            .catch(error => {
                console.log(error)
            })
        
    }
}



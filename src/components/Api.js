export default class Api{
    constructor({baseUrl,headers}){
        this.url=baseUrl;
        this.headers=headers;
    }
//GET https://around.nomoreparties.co/v1/groupId/cards
    getInitialCards() {
        return fetch(`${this.url}/cards`,{
            headers:this.headers
        })
        .then(res=> res.ok ? res.json(): Promise.reject(`Error: ${res.status}`))
        
    }

//GET https://around.nomoreparties.co/v1/groupId/users/me
    getUserInfo(){
        return fetch(`${this.url}/users/me`,{
            headers:this.headers
        })
        .then(res=> res.ok ? res.json(): Promise.reject(`Error: ${res.status}`))
    }

    getAppInfo(){
        return Promise.all(this.getInitialCards(),this.getUserInfo())
    }
//PATCH https://around.nomoreparties.co/v1/groupId/users/me
    editProfile(newName,newJob){
        fetch(`${this.url}/users/me`,{
            method:"PATCH",
            headers:this.headers,
            body:JSON.stringify({
                name:newName,
                about:newJob
            })

        })
    }
//PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    editProfilePic(newLink){
        fetch(`${this.url}/users/me/avatar`,{
            method:"PATCH",
            headers:this.headers,
            body:JSON.stringify({
                avatar:newLink
            })
        }) 
    }
//POST https://around.nomoreparties.co/v1/groupId/cards
    postNewCard(newName,newLink){
        fetch(`${this.url}/cards`,{
            method:"POST",
            headers:this.headers,
            body: JSON.stringify({
                name: newName,
                link: newLink
            })
        })
    }
//DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
    deleteCard(cardId){
        fetch(`${this.url}/cards/${cardId}`,{
            method:"DELETE",
            headers:this.headers
        })
    }

//PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    addLike(cardId){
        fetch(`${this.url}/cards/likes/${cardId}`,{
            method:"PUT",
            headers:this.headers
        })
    }
//DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    deleteLike(cardId){
        fetch(`${this.url}/cards/likes/${cardId}`,{
            method:"DELETE",
            headers:this.headers
        })
    }
}
    
        

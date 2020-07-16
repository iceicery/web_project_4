export default class Api{
    constructor({baseUrl,headers}){
        this.url=baseUrl;
        this.headers=headers;
    }
    getInitialCards() {
        return fetch(`${this.url}/cards`,{
            headers:this.headers
        })
        .then(res=>{
            if (res.ok){
                return res.json();
            }else{
                return Promise.reject(res.status);
            }
        }) 
    }
    
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

    editProfilePic(newLink){
        fetch(`${this.url}/users/me/avatar`,{
            method:"PATCH",
            hearders:this.headers,
            body:JSON.stringify({
                avatar:newLink
            })
        }) 
    }

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

    deleteCard(cardId){
        fetch(`${this.url}/cards/${cardId}`,{
            method:"DELETE",
            headers:this.headers
        })
    }

    addLike(cardId){
        fetch(`${this.url}/cards/likes/${cardId}`,{
            method:"PUT",
            headers:this.headers
        })
    }

    deleteLike(cardId){
        fetch(`${this.url}/cards/likes/${cardId}`,{
            method:"DELETE",
            headers:this.headers
        })
    }
}
    
        

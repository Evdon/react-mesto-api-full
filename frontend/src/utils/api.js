class Api{
    constructor(options){
        this._url = options.baseUrl;
    }

    _checkResponse(res){
        if(res.ok){
            return res.json();
        } else {
            console.log(`${res.status}`);
        }
    }

    deleteCard(id){
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${localStorage.getItem("jwt")}`,
              'Content-Type': 'application/json'
            },
        })
        .then(this._checkResponse);
    }

    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
              authorization: `Bearer ${localStorage.getItem("jwt")}`,
              'Content-Type': 'application/json'
            },
        })
        .then(this._checkResponse);
    }

    getCards(){
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
              authorization: `Bearer ${localStorage.getItem("jwt")}`,
              'Content-Type': 'application/json'
            },
        })
        .then(this._checkResponse);
    }

    postCard(data){
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
              authorization: `Bearer ${localStorage.getItem("jwt")}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._checkResponse);
    }

    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: 'DELETE',
          headers: {
              authorization: `Bearer ${localStorage.getItem("jwt")}`,
              'Content-Type': 'application/json'
            },
        })
        .then(this._checkResponse);
    }

    setLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
              authorization: `Bearer ${localStorage.getItem("jwt")}`,
              'Content-Type': 'application/json'
            },
        })
        .then(this._checkResponse);
    }

    changeLikeCardStatus(id, isLikes) {
        if (isLikes) {
          return this.setLike(id);
        } else {
          return this.deleteLike(id);
        }
      }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: `Bearer ${localStorage.getItem("jwt")}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse);
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: `Bearer ${localStorage.getItem("jwt")}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse);
    }

}

const api = new Api({
    baseUrl: 'http://localhost:3000',
});

export default api;

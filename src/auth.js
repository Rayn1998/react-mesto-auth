export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "password": `${password}`,
            "email": `${email}`
        })
    })
    .then(response => {
        try {
            if (response.status === 200) {
                return response.json()
            }
        } catch(e) {
            return e
        }
    })
    .then(res => res)
    .catch(err => console.log(err))
}

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: {
            'password': `${password}`,
            'email': `${email}`
        }
    })
    .then(response => {
        try {
            if (response.status === 200) {
                return response.json()
            }
        } catch(e) {
            return e
        }
    })
    .then(res => res)
    .catch(err => console.log(err))
}

export const checkToken = jwt => {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    })
    .then(response => {
        try {
            if (response.status === 200) {
                return response.json()
            }
        } catch(e) {
            return e
        }
    })
    .then(res => res)
    .catch(err => console.log(err))
}
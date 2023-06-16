const configApi = {
    baseUrl: 'https://norma.nomoreparties.space/api',
}
const getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);  
}

const getIngredients = () => { 
    return fetch(`${configApi.baseUrl}/ingredients`)
    .then(getResponse)
}

const postIngredients = (body) => {
    return fetch (`${configApi.baseUrl}/orders`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)

    })
    .then(getResponse)
}

export {configApi, getIngredients, postIngredients}

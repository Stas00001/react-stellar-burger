const configApi = {
    baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
}
const getResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);  
}

const getIngredients = () => { 
    return fetch(`${configApi.baseUrl}`)
    .then(getResponse)
}

export {configApi, getIngredients}

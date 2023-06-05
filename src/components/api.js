const configApi = {
    baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
}
const getRespome = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);  
}

const getIngeredients = () => { 
    return fetch(`${configApi.baseUrl}`)
    .then(getRespome)
}

export {configApi, getIngeredients}

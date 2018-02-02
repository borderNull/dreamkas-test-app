import fetch from 'isomorphic-fetch';
import * as roomsApi from './roomsApi';

const fetchData = (type, method, params = {}) => async () => {
    const api = {roomsApi};

    if(!type || !method || !api[type][method]) throw 'method api is not defined';

    const request = api[type][method](params);
    const response = await fetch(request.action, request.params);

    return await response.json();
}

export default fetchData;
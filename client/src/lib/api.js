import { ajax } from 'rxjs/observable/dom/ajax';
import { getAccessToken } from './auth';

function getAuthHeaders() {
    return {
        'Authorization': `Bearer ${getAccessToken()}`
    };
}

const defaults = {
    headers: {},
    auth: false
}

export default class Api {

    static get(url, { headers, auth } = defaults) {
        return ajax.get(
            url,
            Object.assign({}, headers, auth ? getAuthHeaders() : null)
        );
    }

    static put(url, body, { headers, auth } = defaults) {
        return ajax.put(
            url,
            body,
            Object.assign({}, headers, auth ? getAuthHeaders() : null)
        );
    }

    static post(url, body, { headers, auth } = defaults) {
        return ajax.post(
            url,
            body,
            Object.assign({}, headers, auth ? getAuthHeaders() : null)
        );
    }

    static delete(url, { headers, auth } = defaults) {
        return ajax.delete(
            url,
            Object.assign({}, headers, auth ? getAuthHeaders() : null)
        );
    }

}

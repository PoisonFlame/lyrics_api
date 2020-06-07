import { authHeader} from '../helpers/auth-headers.js'

export const userService = {
    login,
    logout,
    register
};

function login(username,password) {
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({username,password})
    };
    
    return fetch('api.rpsh.me/v1/user/login', requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token){
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });

};

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('api.rpsh.me/v1/user/signup', requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
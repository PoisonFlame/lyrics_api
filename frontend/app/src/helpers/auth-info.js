import router from '../router';

const jwt = require('jsonwebtoken');


export function authInfo() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.token) {
       try{
        const payload = jwt.verify(user.token,process.env.VUE_APP_JWT_KEY, {complete: true});
        payload.payload.token = user.token;
        console.log(payload.payload);
        return payload.payload;
       }catch(err){
            localStorage.removeItem('user');
            if(router.currentRoute.path != "/"){
                router.go('/');
            }
            return {error:'User Session Invalid'};
       }

    }else{
        if(router.currentRoute.path != "/"){
            router.go('/');
        }
        return {error:'User Session Invalid'};
    }
}

export function loggedIn() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
}
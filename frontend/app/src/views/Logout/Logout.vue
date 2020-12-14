<template>
<div>Logout</div>
</template>

<script>
import router from '../../router';
import axios from 'axios';

let user = JSON.parse(localStorage.getItem('user'));

axios
    .post('api/blacklist/add', {
        token: user.token
    })
    .then(res => {
        localStorage.removeItem('user');
        router.go('/');
    })
    .catch(err => {
        localStorage.removeItem('user');
        router.go('/');
    });

// localStorage.removeItem('user');
// router.go('/');

export default {
    data() {}
};
</script>

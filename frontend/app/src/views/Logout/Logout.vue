<template>
<div>Logout</div>
</template>

<script>
import router from '../../router'

localStorage.removeItem('user');
router.go('/');

export default {
    data() {

    }
}
</script>

<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <div class="navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li v-if="currentUser" class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">{{ currentUser.name }}</a>
                        </li>
                        <li v-if="currentUser" class="nav-item">
                            <a class="nav-link" href="/surveys">опросы</a>
                        </li>
                        <li v-if="admin" class="nav-item">
                            <a class="nav-link" href="/addSurvey">создать опрос</a>
                        </li>
                        <li v-if="admin" class="nav-item">
                            <a class="nav-link" href="/reports">отчеты</a>
                        </li>
                        <li v-if="currentUser" class="nav-item">
                            <a class="nav-link" @click.prevent="logOut" href="#">выход</a>
                        </li>
                        <li v-else class="nav-item">
                            <router-link to="/login" class="nav-link">
                                войти
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
  
<script>
export default {
    name: "NavBar",
    data() {

        return {
            admin: false,
        };

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    },
    mounted() {
        if (this.currentUser) {
            if (this.currentUser.isAdmin) {
                this.admin = true;
            }
        }
    }
};
</script>
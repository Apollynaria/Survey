<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid">
                <div class="navbar-collapse d-flex justify-content-between w-100" id="navbarNav">
                    <ul class="navbar-nav w-100">
                        <li v-if="currentUser" class="nav-item">
                            <a class="nav-link disabled" aria-current="page" href="#"><font-awesome-icon :icon="['fas', 'user']" /> {{ currentUser.name }}</a>
                        </li>
                        <li>&nbsp;</li>
                        <li v-if="currentUser" class="nav-item">
                            <a class="nav-link" href="/surveys"><font-awesome-icon
                                    :icon="['fas', 'square-poll-horizontal']" /> Опросы</a>
                        </li>
                        <li>&nbsp;</li>
                        <li v-if="admin" class="nav-item">
                            <a class="nav-link" href="/addSurvey"><font-awesome-icon :icon="['fas', 'square-plus']" />
                                Создать опрос</a>
                        </li>
                        <li>&nbsp;</li>
                        <li v-if="admin" class="nav-item">
                            <a class="nav-link" href="/reports"><font-awesome-icon :icon="['fas', 'file-contract']" />
                                Отчеты</a>
                        </li>
                        <li>&nbsp;</li>
                        <li v-if="currentUser" class="nav-item">
                            <a class="nav-link" @click.prevent="logOut" href="/"><font-awesome-icon
                                    :icon="['fas', 'door-open']" /> Выход</a>
                        </li>
                        <li v-else class="nav-item">
                            <router-link to="/login" class="nav-link">
                                <font-awesome-icon
                                    :icon="['fas', 'door-open']" /> Войти
                            </router-link>
                        </li>


                    </ul>
                </div>

                <a href="/"><img src="../assets/logo.svg" height="80" /></a>

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

<style scoped>
.navbar {
    background-color: #0a7a5d;
    font-size: 14pt;
}

.nav-link {
    color: white !important;
}

.nav-link:hover{
    color:rgb(210, 210, 210) !important;
}
</style>
<template>
    <div class="p-5 middle">
        <div class="question rounded p-4">
            <h4 class="mx-auto mt-4">Регистрация пользователя</h4>
            <form name="form" @submit="handleRegister">
                <div v-if="!successful">
                    <div class="form-group mt-2">
                        <input type="text" class="form-control" name="name" placeholder="ФИО" v-model="user.name"
                            required />
                    </div>
                    <div class="form-group mt-2">
                        <input type="text" class="form-control" name="login" placeholder="Логин" v-model="user.login"
                            required />
                    </div>
                    <div class="form-group mt-2">
                        <input type="password" class="form-control" name="password" placeholder="Пароль"
                            v-model="user.password" required />
                    </div>
                    <div class="form-group mt-4">
                        <button class="btn btn-primary">Зарегистрироваться</button>
                    </div>
                </div>
                <div class="form-group mt-2 ">
                    <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RegisterUser',
    data() {
        return {
            user: {
                name: "",
                login: "",
                password: "",
                isAdmin: 0
            },
            successful: false,
            message: ''
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    mounted() {
        if (this.loggedIn) {
            // Авторизация прошла успешно, переходим к главной странице.
            // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
            window.location.href = '/';
        }
    },
    methods: {
        handleRegister(e) {
            e.preventDefault();
            this.message = '';

            this.$store.dispatch("auth/register", this.user) // обращаемся к методу register, который определён в auth.service.js
                .then(data => {
                    this.message = data.message;
                    this.successful = true;
                })
                .catch(e => {
                    this.message = e.response.data.message;
                }
                );

        }
    }
};
</script>
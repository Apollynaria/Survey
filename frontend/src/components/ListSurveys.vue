<template>
    <div class="p-3">
        <div class="text-center">
            <h2 class="text-center mt-2">Список опросов</h2>
            <router-link v-if="admin" class="btn btn-success" to="/addSurvey"><font-awesome-icon
                    :icon="['fas', 'plus']" /> ДОБАВИТЬ ОПРОС</router-link>
        </div>

        <div class="list-surveys">
            <ul class="list-group p-3 w-100" >
                <li class="list-group-item d-flex justify-content-between" v-for="(survey, index) in surveys" :key="index">
                    <router-link class="link" :to="{
                            name: 'survey',
                            params: { id: survey.id }
                        }">
                        {{ survey.name }}
                    </router-link>
                    <router-link v-if="admin" class="btn btn-outline-primary" :to="{
                            name: 'updateSurvey',
                            params: { id: survey.id }
                        }">
                        <font-awesome-icon :icon="['fas', 'bolt']" /> ИЗМЕНИТЬ
                    </router-link>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import http from "../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
export default {
    name: "ListSurveys", // Имя шаблона
    data() { // данные компонента (определение переменных)
        return {
            surveys: [],
            admin: false,
        };
    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: { // методы компонента
        getSurveys() {
            http
                .get("/surveys") // обращаемся к серверу для получения списка пользователей
                .then(response => { // запрос выполнен успешно
                    console.log(this.currentUser.isAdmin)
                    this.surveys = response.data;
                })
                .catch(e => { // запрос выполнен с ошибкой
                    console.log(e);
                });
        }
    },
    mounted() { // загружаем данные пользователей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
        if (this.currentUser) {
            if (this.currentUser.isAdmin) {
                this.admin = true;
            }
        }
        this.getSurveys();
    }
}
</script>

<style scoped>
.item {
    margin-left: 5px;
}

.link {
    text-decoration: none;
    align-self: center;
    color: #0a7a5d;
}


.list-group {
    max-width: 600pt;
    font-size: 14pt;
}

.list-surveys{
    text-align: -webkit-center !important;
}
</style>
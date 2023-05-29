<template>
    <div>
        <h4>Список опросов</h4>
        <router-link v-if="currentUser.isAdmin" class="btn btn-success" to="/addSurvey">Добавить опрос</router-link>
        <!-- <router-link class="item" to="/searchSurveys">Поиск пользователя</router-link> -->
        <ul class="list-group p-3">
            <li class="list-group-item d-flex justify-content-between" v-for="(survey, index) in surveys" :key="index">
                <router-link :to="{
                        name: 'survey',
                        params: { id: survey.id }
                    }">
                    {{ survey.name }}
                </router-link>
                <router-link v-if="currentUser.isAdmin" class="btn btn-primary" :to="{
                    name: 'updateSurvey',
                    params: { id: survey.id }
                }">
                    Изменить
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import http from "../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
export default {
    name: "ListSurveys", // Имя шаблона
    data() { // данные компонента (определение переменных)
        return {
            surveys: []
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
        this.getSurveys();
    }
}
</script>

<style>
.item {
    margin-left: 5px;
}
</style>
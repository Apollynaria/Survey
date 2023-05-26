<template>
    <div>
        <h4>Список опросов</h4>
        <router-link class="btn btn-success" to="/addSurvey">Добавить опрос</router-link>
        <!-- <router-link class="item" to="/searchSurveys">Поиск пользователя</router-link> -->
        <ul>
            <li v-for="(survey, index) in surveys" :key="index">
                {{ survey.name }}
                <!-- <router-link :to="{
                        name: 'survey-details',
                        params: { id: survey.id }
                    }">
                    {{survey.name}}
                </router-link> -->
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
        methods: { // методы компонента
            getSurveys() {
                http
                    .get("/surveys") // обращаемся к серверу для получения списка пользователей
                    .then(response => { // запрос выполнен успешно
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
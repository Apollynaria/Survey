<template>
    <div class="p-3">
        <h4>Опрос {{ }}</h4>
        <form @submit="saveAnswers">
            <!-- <input class="form-check-input" type="checkbox" value="" > -->
            <div>{{ this.name }}</div>

            <div v-for="(question, index) in questions" :key="index" class="p-4">
                <div class="question p-3 rounded">
                    <div>Вопрос {{ index + 1 }}. </div>

                    <span>{{ question.text }}</span>

                    <!-- Выбор одного ответа -->
                    <div v-if="question.type == 1" class="text-center mt-2">
                        <div class="mt-1" v-for="(answer, index2) in question.answers" :key="index2">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="radio" id="radio" required
                                    v-model="userAnswers[index]">
                                <label class="form-check-label" for="radio">{{ answer.txt }}</label>
                            </div>
                        </div>
                    </div>

                    <!-- Выбор нескольких ответов -->

                    <div v-if="question.type == 2" class="text-center mt-2">
                        <div class="mt-1" v-for="(answer, index2) in question.answers" :key="index2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="checkbox" id="checkbox" required
                                    v-model="userAnswers[index]">
                                <label class="form-check-label" for="checkbox">{{ answer.txt }}</label>
                            </div>
                        </div>
                    </div>


                    <!-- Поле -->
                    <div v-if="question.type == 3" class="text-center mt-2">
                        <textarea type="text" class="form-control" rows="5" placeholder="Впишите ваш ответ сюда" required
                            v-model="userAnswers[index]"></textarea>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <input type="submit" class="btn btn-success mt-2" value="  ОТПРАВИТЬ  ">
            </div>
        </form>
        <ul>
        </ul>
    </div>
</template>

<script>

import http from "../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
export default {
    name: "SurveyPage", // Имя шаблона
    props: ['id'],
    data() { // данные компонента (определение переменных)
        return {
            name: "",
            typeQuestion: 1,
            answer: {
                txt: ""
            },
            question: {
                text: "",
                type: "",
                answers: []
            },
            questions: [],
            userAnswers: [],
        };
    },
    methods: { // методы компонента
        getSurvey() {
            http
                .get("/survey/" + this.id)
                .then(response => {
                    this.name = response.data.survey.name;
                    this.questions = response.data.survey.questions;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        saveAnswers(event){
            event.preventDefault();
            console.log(this.userAnswers);
        }
    },

    mounted() {
        this.getSurvey();
    }
}
</script>

<style>
.item {
    margin-left: 5px;
}

.question {
    background-color: rgb(228, 228, 228);
}
</style>
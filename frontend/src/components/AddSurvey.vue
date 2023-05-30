<template>
    <div v-if="admin" class="p-3">
        <form @submit="addSurvey">
            <h2 class="text-center mt-2">Создание опроса</h2>
            <div class="middle">
                <div class="answer-form ms-1" style="max-width: 600pt; font-size: 14pt">Название опроса</div>
                <input class="form-control question" type="text" v-model="name" required>
            </div>

            <div v-for="(question, index) in questions" :key="index" class="p-5 middle">
                <div class="question p-3 rounded answer-form">
                    <div>Вопрос {{ index + 1 }}. {{ checkType(question.type) }}</div>

                    <textarea type="text" class="form-control" rows="5" placeholder="Впишите ваш вопрос сюда"
                        v-model="question.text"></textarea>

                    <!-- Выбор одного ответа -->
                    <!-- Выбор нескольких ответов -->
                    <div class="mt-2" v-if="question.type != 3">
                        Варианты ответов:
                        <div class="mt-1" v-for="(answer, index2) in question.answers" :key="index2">
                            <div class="d-flex flex-row mt-2">
                                {{ index2 + 1 + `)` }}
                                <div class="ms-2 w-100 me-2">
                                    <input class="form-control" type="text" v-model="answer.txt"
                                        placeholder="Впишите ваш ответ сюда">
                                </div>
                                <div class="" v-if="question.answers.length > 1">
                                    <div class="btn btn-outline-danger" @click="deleteAnswer(index, index2)">
                                        <font-awesome-icon :icon="['fas', 'trash-can']" /></div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center d-flex flex-row mt-2 justify-content-between">
                            <div class="btn btn-outline-primary me-2 mt-2" @click="addAnswer(index)"><font-awesome-icon :icon="['fas', 'plus']" /> ДОБАВИТЬ ОТВЕТ</div>
                            <div class="btn btn-outline-danger mt-2" @click="deleteQuestion(index)"><font-awesome-icon :icon="['fas', 'xmark']" /> УДАЛИТЬ ВОПРОС</div>
                        </div>
                    </div>

                    <!-- Поле -->
                    <div v-if="question.type == 3" class="text-center mt-2 d-flex justify-content-end">
                        <div class="btn btn-outline-danger mt-2" @click="deleteQuestion(index)"><font-awesome-icon :icon="['fas', 'xmark']" /> УДАЛИТЬ ВОПРОС</div>
                    </div>
                </div>
            </div>

            <div class="p-5 middle">
                <div class="question rounded p-5 row">
                    <div class="middle col-8">
                        <select v-model="typeQuestion" class="form-control mt-2" id="" required>
                            <option value="1">Выбор одного ответа</option>
                            <option value="2">Выбор нескольких ответов</option>
                            <option value="3">Свободный ответ</option>
                        </select>
                    </div>
                    <div class="col-4">
                        <div class="btn btn-outline-primary mt-2" @click="addQuestion"><font-awesome-icon :icon="['fas', 'plus']" /> ДОБАВИТЬ ВОПРОС</div>
                    </div>
                </div>
            </div>

            <div class="text-center">
                <input type="submit" style="font-size: 12pt !important;" class="btn btn-success mt-2" value="   +   ДОБАВИТЬ ОПРОС      ">
            </div>
        </form>
        <ul>
        </ul>
    </div>
</template>

<script>

import http from "../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
export default {
    name: "AddSurvey", // Имя шаблона
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
            admin: false,
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    created() {
        if (!this.currentUser.isAdmin) {
            window.location.href = '/';
        }
    },
    methods: { // методы компонента
        addSurvey(event) {
            event.preventDefault();
            const surveyInfo = {
                name: this.name,
                questions: this.questions
            }
            console.log(surveyInfo)
            http
                .post("/addSurvey", surveyInfo)
                .then(response => {
                    console.log(response.data);
                    window.location.href = '/listSurveys';
                })
                .catch(e => {
                    console.log(e);
                });
        },
        checkType(id) {
            if (id == 1) return "Выбор одного ответа";
            if (id == 2) return "Выбор нескольких ответов";
            return "Свободный ответ";
        },
        addQuestion() {
            let answer = {
                txt: ""
            }
            let appendedQuest = {
                text: "",
                type: this.typeQuestion,
                answers: [answer]
            };
            this.questions.push(appendedQuest);
        },

        addAnswer(index) {
            let answer = {
                txt: this.answerTxt
            }
            this.questions[index].answers.push(answer);
        },

        deleteAnswer(index, index2) {
            this.questions[index].answers.splice(index2, 1);
        },

        deleteQuestion(index) {
            this.questions.splice(index, 1);
        }
    },
    mounted() {
        if (this.currentUser) {
            if (this.currentUser.isAdmin) {
                this.admin = true;
            }
        }
    }
}
</script>

<style>
.item {
    margin-left: 5px;
}

</style>
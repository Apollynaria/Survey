<template>
    <div v-if="currentUser" class="p-3">
        <form @submit="saveAnswers">
            <h2 class="text-center mt-2">{{ this.name }}</h2>

            <div v-for="(question, index) in questions" :key="index" class="p-5 middle">
                <div class="question p-5 rounded">
                    <form class="answer-form">
                        <span>{{ index + 1 }}. {{ question.text }}</span>

                        <!-- Выбор одного ответа -->
                        <div v-if="question.type == 1" class="mt-2">
                            <div class="mt-1" v-for="(answer, index2) in question.answers" :key="index2">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="radio" id="radio" :value="answer.txt"
                                        @click="selectAnswer(question, index2)" required>
                                    <label class="form-check-label" for="radio">{{ answer.txt }}</label>
                                </div>
                            </div>
                        </div>

                        <!-- Выбор нескольких ответов -->
                        <div v-if="question.type == 2" class="mt-2">
                            <div class="mt-1" v-for="(answer, index2) in question.answers" :key="index2">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="checkbox" id="checkbox"
                                        @click="question.answers[index2].user_ans = !question.answers[index2].user_ans"
                                        :value="answer.txt">
                                    <label class="form-check-label" for="checkbox">{{ answer.txt }}</label>
                                </div>
                            </div>
                        </div>

                        <!-- Поле -->
                        <div v-if="question.type == 3" class="text-center mt-2">
                            <textarea type="text" class="form-control" rows="8" placeholder="Впишите ваш ответ сюда"
                                v-model="user_answers[index].answers[0].user_ans"></textarea>
                        </div>
                    </form>

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
import http from "../http-common";

export default {
    name: "SurveyPage",
    props: ['id'],
    data() {
        return {
            name: "",
            questions: [],
            user_answers: []
        };
    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        getSurvey() {
            http
                .get("/survey/" + this.id)
                .then(response => {
                    this.name = response.data.survey.name;
                    // Инициализация объекта ответов для каждого вопроса
                    for (let i = 0; i < this.questions.length; i++) {
                        this.$set(this.answers, i, []);
                    }
                    this.questions = response.data.survey.questions;
                    this.user_answers = this.questions;

                    for (let i = 0; i < this.user_answers.length; i++) {
                        const answers = this.user_answers[i].answers;
                        for (let j = 0; j < answers.length; j++) {
                            if (this.user_answers[i].type == 3) {
                                answers[j].user_ans = "" //если это свободный вариант
                            }
                            else {
                                answers[j].user_ans = false; // добавляем свойство user_ans со значением по умолчанию
                            }
                        }
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
        saveAnswers(event) {
            event.preventDefault();
            // Вывод объекта ответов в консоль для проверки

            let data = [];

            for (let i = 0; i < this.user_answers.length; i++) {
                const answers = this.user_answers[i].answers;
                for (let j = 0; j < answers.length; j++) {
                    let data_one = {
                        id_answer: "",
                        ans: "",
                        id_user: this.currentUser.id
                    }
                    if(this.user_answers[i].type == 3){
                        data_one.id_answer = answers[j].id;
                        data_one.ans = answers[j].user_ans;
                        data.push(data_one);
                    } 
                    else if(answers[j].user_ans == true){
                        data_one.id_answer = answers[j].id;
                        data_one.ans = '';
                        data.push(data_one);
                    }
                }
            }

            http
                .post("/addUserAnswers", data)
                .then(response => {
                    console.log(response.data);
                    window.location.href = '/listSurveys';
                })
                .catch(e => {
                    console.log(e);
                });

            
            console.log(data)
        },
        selectAnswer(question, index) {
            const answers = question.answers;
            for (let i = 0; i < answers.length; i++) {
                if (i !== index) {
                    answers[i].user_ans = false;
                }
            }
            answers[index].user_ans = true;
        },
    },

    mounted() {
        this.getSurvey();
        // Инициализация массива ответов для каждого вопроса
    }
}
</script>
    
<style>
.item {
    margin-left: 5px;
}

.question {
    background-color: rgb(255, 255, 255);
    max-width: 600pt;
    font-size: 14pt;
}

.middle{
    text-align: -webkit-center;
}

textarea{
    resize: none;
}

.form-check{
    text-align: left !important;
}

.answer-form{
    text-align: left !important;
}

.f-14{
    font-size: 14pt !important;
}

textarea,
input {
    font-size: 12pt !important;
}

.btn-end{
    width: 200pt;
}

</style>
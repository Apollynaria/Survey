<template>
    <div class="p-3">
        <h4>Отчеты</h4>

        <form>
            <div>Опрос</div>
            <select class="form-select" v-model="obj.survey" required @change="getQuestionsForSurvey">
                <option value="" selected disabled hidden>Название опроса</option>
                <option v-for="(survey, index) in surveys" :key="index" :value="survey.id">
                    {{ survey.name }}
                </option>
            </select>

            <div v-if="this.questions.length > 0" class="mt-2">
                <div>Вопрос</div>
                <select class="form-select" v-model="obj.question" @change="getAnswersByQuestion">
                    <option value="" selected disabled hidden>Вопрос</option>
                    <option v-for="(question, index) in questions" :key="index" :value="question.id">
                        {{ question.text }}
                    </option>
                </select>
            </div>


            <table class="table mt-2 rounded table-striped" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Имя</th>
                        <th scope="col">Логин</th>
                        <th scope="col">Ответ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user_answer, index) in answers" :key="index">
                        <th scope="row">{{index+1}}</th>
                        <td>{{ user_answer.user.name }}</td>
                        <td>{{ user_answer.user.login }}</td>
                        <td>{{ user_answer.answer ? user_answer.answer : user_answer.userAnswerAnswer.txt  }}</td>
                    </tr>
                </tbody>
            </table>

        </form>
    </div>
</template>
    
<script>
import http from "../http-common";

export default {
    name: "ReportsPage",
    data() {
        return {
            surveys: [],
            questions: [],
            obj: {
                survey_id: "",
                question: "",
            },
            answers: []
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },
    methods: {
        getSurveys() {
            http
                .get("/surveys")
                .then((response) => {
                    this.surveys = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        getQuestionsForSurvey() {
            http
                .get("/questionsForSurvey/" + this.obj.survey) // обращаемся к серверу для получения списка вопросов для выбранного опроса
                .then((response) => {
                    this.questions = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getAnswersByQuestion(){
            http
                .get("/findAllAnswersByQuestion/" + this.obj.question)
                .then((response) => {
                    this.answers = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.getSurveys();
    },
};
</script>
    
<style>
.item {
    margin-left: 5px;
}

.table{
    background-color: white;
}
</style>
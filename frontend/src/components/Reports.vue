<template>
    <div v-if="admin" class="p-3">
        <h4>Отчеты</h4>

        <form>
            <div>Опрос</div>
            <select class="form-select" v-model="obj.survey" id="sel" required @change="getQuestionsForSurvey">
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


            <table class="table mt-2 rounded table-striped">
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
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ user_answer.user.name }}</td>
                        <td>{{ user_answer.user.login }}</td>
                        <td>{{ user_answer.answer ? user_answer.answer : user_answer.userAnswerAnswer.txt }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="text-center">
                <div class="btn btn-success" @click="getExcelFile">&nbsp;&nbsp;<font-awesome-icon
                        :icon="['fas', 'file-excel']" /> Excel&nbsp;&nbsp;</div>
            </div>
        </form>
    </div>
</template>
    
<script>
import http from "../http-common";
import axios from 'axios';

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
            answers: [],
            admin: false,
            allAnswers: [],
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
        getAnswersByQuestion() {
            http
                .get("/findAllAnswersByQuestion/" + this.obj.question)
                .then((response) => {
                    this.answers = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },

        async getExcelFile() {

            var arr1 = [this.surveys.find(survey => survey.id === this.obj.survey).name,'№']
            var arr2 = ['','Имя']
            var arr3 = ['','Логин']
            var arr4 = ['','Ответ']

            const requests = [];

            for (let j = 0; j < this.questions.length; j++) {
                const request = http
                    .get("/findAllAnswersByQuestion/" + this.questions[j].id)
                    .then((response) => {
                        this.allAnswers = response.data;
                        arr1.push(this.questions[j].text);
                        arr2.push('');
                        arr3.push('');
                        arr4.push('')
                        for (let i = 0; i < this.allAnswers.length; i++) {
                            arr1.push(i + 1);
                            arr2.push(this.allAnswers[i].user.name);
                            arr3.push(this.allAnswers[i].user.login);
                            if (this.allAnswers[i].answer == '') {
                                arr4.push(this.allAnswers[i].userAnswerAnswer.txt);
                            } else {
                                arr4.push(this.allAnswers[i].answer);
                            }
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                requests.push(request);
            }

            await Promise.all(requests); // Wait for all requests to complete

            var arr = [];
            arr.push(arr1);
            arr.push(arr2);
            arr.push(arr3);
            arr.push(arr4);
            console.log(arr);

            try {
                const response = await http.post('/saveFile', arr, { responseType: 'blob' });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'report.xlsx');
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.log(error);
            }
        },

        async downloadFile() {
            const url = '/api/downloadFile'; // URL для загрузки файла
            try {
                const response = await axios.get(url, { responseType: 'blob' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(response.data);
                link.download = 'file.xlsx'; // Имя файла для сохранения

                // Добавляем ссылку на страницу и эмулируем клик на элементе, чтобы начать загрузку файла
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        if (this.currentUser) {
            if (this.currentUser.isAdmin) {
                this.admin = true;
            }
        }
        this.getSurveys();
    },
};
</script>
    
<style>
.item {
    margin-left: 5px;
}

.table {
    background-color: white;
}
</style>
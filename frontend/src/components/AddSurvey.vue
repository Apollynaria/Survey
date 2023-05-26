<template>
    <div class="p-3">
        <h4>Создание опроса</h4>
        <form @submit="addSurvey">
            <!-- <input class="form-check-input" type="checkbox" value="" > -->
            <div>Название опроса</div>
            <input class="form-control" type="text" value="" required>

            <div v-for="(question, index) in questions" :key="index" class="p-4">
                <div class="question p-3 rounded">
                    <div>Вопрос {{ index + 1 }}. {{checkType(question.type)}}</div>
                    
                    <textarea type="text" class="form-control" rows="5"
                        placeholder="Впишите ваш вопрос сюда" v-model="question.text"></textarea>

                    <!-- Выбор одного ответа -->
                    <!-- Выбор нескольких ответов -->
                    <div class="mt-2" v-if="question.type != 3">
                        <div class="mt-1" v-for="(answer, index2) in question.answers" :key="index2">
                            <div class="row">
                                <div class="col-1">
                                    {{ index2 + 1 }}
                                </div>
                                <div class="col-8">
                                    <input class="form-control" type="text" v-model="answer.txt"
                                        placeholder="Впишите ваш ответ сюда">
                                </div>
                                <div class="col-3" v-if="question.answers.length > 1">
                                    <div class="btn btn-danger" @click="deleteAnswer(index, index2)">УДАЛИТЬ</div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center d-flex flex-row mt-2 justify-content-center">
                            <div class="btn btn-primary me-2" @click="addAnswer(index)">ДОБАВИТЬ ОТВЕТ</div>
                            <div class="btn btn-danger" @click="deleteQuestion(index)">УДАЛИТЬ ВОПРОС</div>
                        </div>
                    </div>

                    <!-- Поле -->
                    <div v-if="question.type == 3" class="text-center mt-2">
                        <div class="btn btn-danger" @click="deleteQuestion(index)">УДАЛИТЬ ВОПРОС</div>
                    </div>
                </div>
            </div>

            <div class="row mt-2">
                <div>Вид вопроса</div>
                <div class="col-9">
                    <select v-model="typeQuestion" class="form-control mt-2" id="" required>
                        <option value="1">Выбор одного ответа</option>
                        <option value="2">Выбор нескольких ответов</option>
                        <option value="3">Свободный ответ</option>
                    </select>
                </div>
                <div class="col-3">
                    <div class="btn btn-primary mt-2" @click="addQuestion">ДОБАВИТЬ ВОПРОС</div>
                </div>
            </div>

            <div class="text-center">
                <input type="submit" class="btn btn-success mt-2" value="      ДОБАВИТЬ ОПРОС      ">
            </div>
        </form>
        <ul>
        </ul>
    </div>
</template>

<script>

// import http from "../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
export default {
    name: "AddSurvey", // Имя шаблона
    data() { // данные компонента (определение переменных)
        return {
            typeQuestion: 1,
            answer: {
                txt: ""
            },
            question: {
                text: "",
                type: "",
                answers: []
            },
            questions: []
        };
    },
    methods: { // методы компонента
        addSurvey(event) {
            event.preventDefault();
            console.log(this.questions)
            // http
            //     .get("/surveys") // обращаемся к серверу для получения списка пользователей
            //     .then(response => { // запрос выполнен успешно
            //         this.surveys = response.data;
            //     })
            //     .catch(e => { // запрос выполнен с ошибкой
            //         console.log(e);
            //     });
        },
        checkType(id) {
            if(id == 1) return "Выбор одного ответа";
            if(id == 2) return "Выбор нескольких ответов";
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
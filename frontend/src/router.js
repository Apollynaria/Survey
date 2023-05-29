import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListSurveys from "./components/ListSurveys";
import AddSurvey from "./components/AddSurvey";
import SurveyUpdate from "./components/SurveyUpdate";
import SurveyPage from "./components/SurveyPage";
import Login from "./components/Login";
import Register from "./components/Register";


// определяем маршруты
const routes = [
    {
        path: "/listSurveys", // указание маршрута, по которому будем переходить к списку пользователей
        name: "surveys", // имя маршрута
        alias: "/surveys", // указание дополнительного маршрута
        component: ListSurveys, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список опросов"
        }
    },
    {
        path: "/addSurvey", 
        name: "addSurvey", 
        alias: "/addSurvey",
        component: AddSurvey,
        meta: {
            title: "Добавить опрос"
        }
    },

    {
        path: "/updateSurvey/:id", 
        name: "updateSurvey", 
        component: SurveyUpdate,
        props: true,
        meta: {
            title: "Редактирование опроса"
        }
    },

    {
        path: "/survey/:id", 
        name: "survey", 
        component: SurveyPage,
        props: true,
        meta: {
            title: "Опрос"
        }
    },
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach((to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';
    next();
});

export default router;
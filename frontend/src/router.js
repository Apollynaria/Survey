import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListSurveys from "./components/ListSurveys";
import AddSurvey from "./components/AddSurvey";
import SurveyUpdate from "./components/SurveyUpdate";
import SurveyPage from "./components/SurveyPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ReportsPage from "./components/Reports";

// определяем маршруты
const routes = [
    {
        path: "/listSurveys", // указание маршрута, по которому будем переходить к списку пользователей
        name: "surveys", // имя маршрута
        alias: "/surveys", // указание дополнительного маршрута
        component: ListSurveys, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список опросов",
            requiredAuth: true
        }
    },
    {
        path: "/addSurvey", 
        name: "addSurvey", 
        alias: "/addSurvey",
        component: AddSurvey,
        meta: {
            title: "Добавить опрос",
            requiredAuth: true
        }
    },

    {
        path: "/updateSurvey/:id", 
        name: "updateSurvey", 
        component: SurveyUpdate,
        props: true,
        meta: {
            title: "Редактирование опроса",
            requiredAuth: true
        }
    },

    {
        path: "/survey/:id", 
        name: "survey", 
        component: SurveyPage,
        props: true,
        meta: {
            title: "Опрос",
            requiredAuth: true
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
    {
        path: "/reports",
        name: "ReportsPage",
        component: ReportsPage,
        meta: {
            title: "Отчеты",
            requiredAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

import store from "./store/index";
// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }

    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;
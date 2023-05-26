import { createWebHistory, createRouter } from "vue-router";
// импорт компонентов
import ListSurveys from "./components/ListSurveys";
import AddSurvey from "./components/AddSurvey";

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
            title: "Добавить опросов"
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
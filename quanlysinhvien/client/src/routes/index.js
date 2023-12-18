import Dashboard from "../pages/Dashboard/Dashboard";
import LoginStudent from "../pages/LoginStudent";
import LoginTeacher from "../pages/LoginTeacher";
import Main from "../pages/Main";

//public routes
export const publicRoutes = [
    { path: '/login-student', component: LoginStudent, layout: null},
    { path: '/login-teacher', component: LoginTeacher, layout: null},
    { path: '/', component: Dashboard, layout: null},
    { path: '/main', component: Main},
]
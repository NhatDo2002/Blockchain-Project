import Dashboard from "../pages/Dashboard/Dashboard";
import LoginStudent from "../pages/LoginStudent";
import LoginTeacher from "../pages/LoginTeacher";
import Main from "../pages/Main";
import ManageStudent from "../pages/ManageStudent";
import ManageScore from "../pages/ManageScore";
import Information from "../pages/Infomation/Information";
import Category from "../pages/Category/Category";
import Result from "../pages/Result/Result";
import RegisterSubject from "../pages/RegisterSubject";

//public routes
export const publicRoutes = [
    { path: '/login-student', component: LoginStudent, layout: null },
    { path: '/login-teacher', component: LoginTeacher, layout: null },
    { path: '/', component: Dashboard, layout: null },
    { path: '/main', component: Main },
    { path: '/teacher/manageStudent', component: ManageStudent },
    { path: '/teacher/manageScore', component: ManageScore },
    { path: '/student', component: Information},
    { path: '/student/category', component: Category},
    { path: '/student/result', component: Result},
    { path: '/student/register-subject', component: RegisterSubject}
]
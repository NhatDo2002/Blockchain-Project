import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faCreditCard, faGraduationCap, faPaste, faLandmark } from "@fortawesome/free-solid-svg-icons";
import styles from './Sidebar.module.scss';
import SidebarItem from "../../../components/SidebarItem";


const cx = classNames.bind(styles);

const STUDENT_SIDEBAR_ITEMS = [
    {
        title: "Thông tin sinh viên",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: "#"
    },
    {
        title: "Quản lý học tập",
        icon: <FontAwesomeIcon icon={faBook} />,
        link: "#"
    },
    {
        title: "Học phí - Phí dịch vụ",
        icon: <FontAwesomeIcon icon={faCreditCard} />,
        link: "#"
    }
]

const TEACHER_SIDEBAR_ITEMS = [
    {
        title: "Quản lý sinh viên",
        icon: <FontAwesomeIcon icon={faGraduationCap} />,
        link: "/teacher/manageStudent"
    },
    {
        title: "Quản lý điểm",
        icon: <FontAwesomeIcon icon={faPaste} />,
        link: "/teacher/manageScore"
    },
    {
        title: "Quản lý môn học",
        icon: <FontAwesomeIcon icon={faLandmark} />,
        link: "#",
    }
]

let ROLE = 0

let logined = sessionStorage.getItem("user")
logined = JSON.parse(logined)
console.log(logined)
if(logined !== null){
    if(logined.USERNAME === "admin"){
        ROLE = 0
    }else{
        ROLE = 1
    }
}


function Sidebar(){

    return (
        <div className={cx('container')}>
            {ROLE === 1 ? 
                (STUDENT_SIDEBAR_ITEMS.map((item,index) => {
                    return <SidebarItem
                            key={index}
                            title = {item.title}
                            leftIcon = {item.icon}
                        />
                })) 
            : 
                (TEACHER_SIDEBAR_ITEMS.map((item,index) => {
                    return <SidebarItem
                            key={index}
                            title = {item.title}
                            leftIcon = {item.icon}
                            link = {item.link}
                        />
                })) 
            }           
        </div>
    )
}

export default Sidebar
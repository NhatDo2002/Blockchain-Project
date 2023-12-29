import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faCreditCard, faGraduationCap, faPaste, faLandmark } from "@fortawesome/free-solid-svg-icons";
import styles from './Sidebar.module.scss';
import SidebarItem from "../../../components/SidebarItem";
import { useUserContext } from '../../../context/UserContext'
import { useState } from "react";

const cx = classNames.bind(styles);

const STUDENT_SIDEBAR_ITEMS = [
    {
        title: "Thông tin sinh viên",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: "/student"
    },
    {
        title: "Quản lý học tập",
        icon: <FontAwesomeIcon icon={faBook} />,
        link: "/student/category"
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

function Sidebar(){
    const [role, setRole] = useState(0)

    let { user } = useUserContext()

    if(user !== null){
        if(user.USERNAME !== "admin" && role !== 1){
            setRole(1)
        }
    }

    return (
        <div className={cx('container')}>
            {role === 1 ? 
                (STUDENT_SIDEBAR_ITEMS.map((item,index) => {
                    return <SidebarItem
                            key={index}
                            title = {item.title}
                            leftIcon = {item.icon}
                            link = {item.link}
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
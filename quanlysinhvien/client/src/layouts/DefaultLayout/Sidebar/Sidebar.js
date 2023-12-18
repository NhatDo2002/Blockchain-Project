import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faCreditCard, faGraduationCap, faPaste, faLandmark } from "@fortawesome/free-solid-svg-icons";
import styles from './Sidebar.module.scss';
import SidebarItem from "../../../components/SidebarItem";


const cx = classNames.bind(styles);

const STUDENT_SIDEBAR_ITEMS = [
    {
        title: "Thông tin sinh viên",
        icon: <FontAwesomeIcon icon={faUser} />
    },
    {
        title: "Quản lý học tập",
        icon: <FontAwesomeIcon icon={faBook} />
    },
    {
        title: "Học phí - Phí dịch vụ",
        icon: <FontAwesomeIcon icon={faCreditCard} />
    }
]

const TEACHER_SIDEBAR_ITEMS = [
    {
        title: "Quản lý sinh viên",
        icon: <FontAwesomeIcon icon={faGraduationCap} />
    },
    {
        title: "Quản lý điểm",
        icon: <FontAwesomeIcon icon={faPaste} />
    },
    {
        title: "Quản lý môn học",
        icon: <FontAwesomeIcon icon={faLandmark} />
    }
]

const RULE = "teacher"

function Sidebar(){
    return (
        <div className={cx('container')}>
            {RULE === "user" ? 
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
                        />
                })) 
            }           
        </div>
    )
}

export default Sidebar
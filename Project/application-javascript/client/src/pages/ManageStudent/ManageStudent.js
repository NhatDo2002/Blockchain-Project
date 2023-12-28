import classNames from "classnames/bind"
import { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../../context/UserContext'
import styles from './ManageStudent.module.scss'
import * as studentAPI from "../../api/studentService"
import * as loginAPI from "../../api/loginService"
import EditStudent from "../../components/EditStudent/EditStudent"
import DeleteStudent from "../../components/DeleteStudent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import ButtonAccount from "../../components/ButtonAccount";

const cx = classNames.bind(styles)

function ManageStudent(){
    const [students, setStudents] = useState([])
    const [accounts, setAccounts] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [editStudent, setEditStudent] = useState({})
    const [deleteStudent, setDeleteStudent] = useState({})

    const navigate = useNavigate()
    const { user } = useUserContext()

    useEffect(() => {
        console.log(user)
        if(user === null){
            navigate('/')
        }
    },[user])
    
    const handleUnshowEdit = () => {
        setShowEdit(false)
    }

    const handleUnshowDelete = () => {
        setShowDelete(false)
    }

    const handleEdit = (student) => {
        setEditStudent(student)
        setShowEdit(true)
    }

    const handleDelete = (student) => {
        let ds = {
            MSSV: student.MSSV,
            HOVATEN: student.HOVATEN
        }

        setDeleteStudent(ds)
        setShowDelete(true)
    }

    const handleCheckAccount = (username, hovaten) => {
        var check = accounts.some(account => account.USERNAME === username)
        if(check === true){
            return (
                <ButtonAccount created>
                    <FontAwesomeIcon icon={faUserCheck} />
                </ButtonAccount>
            )
        }else{
            return (
                <ButtonAccount 
                    onClick={() => handleCreateAccount(username, hovaten)}
                    none
                >
                    <FontAwesomeIcon icon={faUserPlus} />
                </ButtonAccount>
            )
        }
    }

    useEffect(() => {
        const fetchApi = async () => {
            const result = await studentAPI.getAllStudent()
            const getAccount = await loginAPI.getAllAccount()
            console.log(JSON.parse(result.response))
            console.log(getAccount)
            setAccounts(getAccount)
            setStudents(JSON.parse(result.response))
        }

        fetchApi()
    }, [])

    const handleCreateAccount = (mssv, hovaten) => {
        const fetchAPI = async (mssv, hovaten) => {
            const result = await loginAPI.createAccount(mssv, hovaten)
            console.log(result)
            window.location.reload()
        }

        fetchAPI(mssv, hovaten)
    }

    return (
        <div className={cx('content-container')}>
            {showDelete && <DeleteStudent 
                                MSSV={deleteStudent.MSSV}
                                HOVATEN={deleteStudent.HOVATEN}
                                onClick={handleUnshowDelete}
                            />}
            {showEdit && <EditStudent 
                            student={editStudent}
                            onClick={handleUnshowEdit}
                        />}
            <div className={cx('content')}>
                <h1 className={cx('header')}>Trang quản lý sinh viên</h1>
                <div className={cx('annoucement')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr className={cx("table-header")}>
                                <th>MSSV</th>
                                <th>Họ và tên</th>
                                <th>Năm sinh</th>
                                <th>Giới tính</th>
                                <th>Khoa</th>
                                <th>Tổng điểm</th>
                                <th>Tài khoản</th>
                                <th>Quản lý</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s, index) => {
                                return (<tr key={index} className={cx("table-content")}>
                                    <td>{s.MSSV}</td>
                                    <td>{s.HOVATEN}</td>
                                    <td>{s.NAMSINH}</td>
                                    <td>{s.GIOITINH}</td>
                                    <td>{s.KHOA}</td>
                                    <td>{s.GPA}</td>
                                    <td>{handleCheckAccount(s.MSSV, s.HOVATEN)}</td>
                                    <td>
                                        <p className={cx('edit-btn')} onClick={() => {handleEdit(s)}}>Chỉnh sửa</p>
                                        <p className={cx('delete-btn')} onClick={() => {handleDelete(s)}}>Xóa sinh viên</p>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageStudent
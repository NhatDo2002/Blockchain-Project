import classNames from "classnames/bind"
import { useEffect,useState } from 'react'
import styles from './ManageStudent.module.scss'
import * as studentAPI from "../../api/studentService"
import * as loginAPI from "../../api/loginService"
import EditStudent from "../../components/EditStudent/EditStudent"
import DeleteStudent from "../../components/DeleteStudent"

const cx = classNames.bind(styles)

function ManageStudent(){
    const [students, setStudents] = useState([])
    const [accounts, setAccounts] = useState([])
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [editStudent, setEditStudent] = useState({})
    const [deleteStudent, setDeleteStudent] = useState({})
    const [createAccount, setCreateAccount] = useState(false)
    
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

    const handleCheckAccount = (username) => {
        var check = accounts.some(account => account.USERNAME === username)
        console.log(check)
        if(check === true){
            return "Đã có"
        }else{
            return "Tạo tài khoản"
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

    const handleCreateAccount = (mssv) => {
        const fetchAPI = async (mssv) => {
            const result = await loginAPI.createAccount(mssv)
            console.log(result)
            window.location.reload()
        }

        fetchAPI(mssv)
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
                                    <td><button onClick={() => {handleCreateAccount(s.MSSV)}} className={cx('account-btn')}>{handleCheckAccount(s.MSSV)}</button></td>
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
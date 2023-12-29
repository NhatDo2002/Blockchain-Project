import classNames from "classnames/bind"
import styles from "./RegisterSubject.module.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import * as studentAPI from "../../api/studentService"

const cx = classNames.bind(styles)

const subjects = [
    {
        TENMONHOC: "Lập trình hướng đối tượng",
        SOTINCHI: 4
    },
    {
        TENMONHOC: "Thiết kế UX/UI",
        SOTINCHI: 3
    },
    {
        TENMONHOC: "Công nghệ phần mềm",
        SOTINCHI: 4
    },
    {
        TENMONHOC: "Xử lý ngôn ngữ tự nhiên",
        SOTINCHI: 4
    },
]

function RegisterSubject(){
    const [allSubjects, setAllSubjects] = useState([])


    const navigate = useNavigate()
    let { user } = useUserContext()

    useEffect(() => {
        if(user === null){
            navigate('/')
        }else if(user.USERNAME === "admin"){
            navigate('/main')
        }else{
            const fetchAPI = async (mssv) => {
                const result = await studentAPI.getStudentWithMSSV(mssv)
                console.log(JSON.parse(result.response).MONHOC)
                setAllSubjects(JSON.parse(result.response).MONHOC)
            }

            fetchAPI(user.USERNAME)
        }
    },[user])

    console.log(allSubjects)

    const handleRegisterSubject = (mssv, tenmonhoc) => {
        const fetchAPI = async (mssv, tenmonhoc) => {
            const result = await studentAPI.addSubject(mssv, tenmonhoc)
            console.log(result)
            window.location.reload()
        }

        fetchAPI(mssv, tenmonhoc)
    }

    const handleCheckSubject = (username, tenmonhoc) => {
        var check = allSubjects.some(subject => subject.TENMONHOC === tenmonhoc)
        if(check === false){
            return (
                <button onClick={() => {handleRegisterSubject(username, tenmonhoc)}} className={cx('register-btn')}>Đăng ký</button>
            )
        }else{
            return (
                <button className={cx('registered-btn')}>Đã dăng ký</button>
            )
        }
    }

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                Quản lý học tập
            </div>
            <h2 className={cx('subtitle')}>Đăng ký môn học học kỳ 2</h2>
            <table className={cx('table')}>
                <thead>
                    <tr className={cx("table-header")}>
                        <th>Môn Học</th>
                        <th>Số tín chỉ</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map((mh, index) => {
                        return (<tr key={index} className={cx("table-content")}>
                            <td>{mh.TENMONHOC}</td>
                            <td>{mh.SOTINCHI}</td>
                            <td>{handleCheckSubject(user.USERNAME, mh.TENMONHOC)}</td>    
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className={cx('note-container')}>
                <p className={cx('note')}>Ghi chú:</p>
                <p>Sinh viên lưu ý trước khi đăng ký môn phải kiểm tra thật kỹ môn học mình sắp đăng ký </p>
                <p>Sau khi đăng ký nếu muốn rút môn xin gửi đơn rút môn về khoa </p>
            </div>
        </div>
    )
}

export default RegisterSubject
import classNames from "classnames/bind"
import { useEffect,useState } from 'react'
import styles from './ManageStudent.module.scss'
import * as studentAPI from "../../api/studentService"

const cx = classNames.bind(styles)

function ManageStudent(){
    const [students, setStudents] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await studentAPI.getAllStudent()
            console.log(JSON.parse(result.response))

            setStudents(JSON.parse(result.response))
        }

        fetchApi()
    }, [])

    return (
        <div className={cx('content-container')}>
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
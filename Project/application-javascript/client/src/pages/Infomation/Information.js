import classNames from "classnames/bind"
import styles from "./Information.module.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import * as studentAPI from "../../api/studentService"

const cx = classNames.bind(styles)

function Information(){
    const [student, setStudent] = useState({})

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
                console.log(result)
                setStudent(JSON.parse(result.response))
            }

            fetchAPI(user.USERNAME)
        }
    },[user])

    console.log(student)
    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                Thông tin sinh viên
            </div>
            <div className={cx('infor-container')}>
                <div className={cx('infor-group')}>
                    <div className={cx('group')}>
                        <label className={cx('label')}>Họ và tên</label>
                        <div className={cx('name')}>
                            {student.HOVATEN}
                        </div>
                    </div>

                    <div className={cx('group')}>
                        <label className={cx('label')}>Mã số sinh viên</label>
                        <div className={cx('name')}>
                            {student.MSSV}
                        </div>
                    </div>
                </div>
                <div className={cx("infor-group")}>
                    <div className={cx('group')}>
                        <label className={cx('label')}>Giới tính</label>
                        <div className={cx('date')}>
                            {student.MSSV}
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <label className={cx('label')}>Năm sinh</label>
                        <div className={cx('date')}>
                            {student.NAMSINH}
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <label className={cx('label')}>Khoa</label>
                        <div className={cx('date')}>
                            {student.KHOA}
                        </div>
                    </div>
                </div>
                <table className={cx('table')}>
                    <thead className={cx('table-header')}>
                        <th>Năm học</th>
                        <th>Các vi phạm quy chế - quy định của nhà trường</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={cx('table-content')}></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <table className={cx('table')}>
                    <thead className={cx('table-header')}>
                        <th>Năm học</th>
                        <th>Các khen thưởng - học bổng của sinh viên</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={cx('table-content')}></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Information
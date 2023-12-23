import classNames from "classnames/bind"
import { useEffect, useState } from 'react'
import Select from 'react-select'
import styles from './ManageScore.module.scss'
import * as studentAPI from "../../api/studentService"

const cx = classNames.bind(styles)

function ManageScore(){
    const [students, setStudents] = useState([])
    const [oneStudent, setOneStudent] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const result2 = await studentAPI.getStudentWithMSSV("51800742")
            console.log(JSON.parse(result2.response))
            setOneStudent(JSON.parse(result2.response))
        }

        fetchApi()
    }, [])
        // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await studentAPI.getStudentWithMSSV("51800742")
    //         console.log("hehe")
    //         setOneStudent(JSON.parse(result.response))
    //         console.log(oneStudent)
    //     }

    //     fetchApi()
    // },[])


    return (
        <div className={cx('content-container')}>
            <div className={cx('content')}>
                <h1 className={cx('header')}>Trang quản lý điểm sinh viên</h1>
                <label className={cx('select-label')}>
                    Lựa chọn sinh viên muốn quản lý điểm
                    <select className={cx("select")}>
                        {students.map((stu) => {
                            return <option>{stu.MSSV}</option>
                        })}
                    </select>
                </label>
                <div className={cx('annoucement')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr className={cx("table-header")}>
                                <th>Môn Học</th>
                                <th>Điểm quá trình 1</th>
                                <th>Điểm quá trình 2</th>
                                <th>Điểm giữa kỳ</th>
                                <th>Điểm cuối kỳ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {oneStudent.MONHOC.map((s, index) => {
                                return (<tr key={index} className={cx("table-content")}>
                                    <td>{s.TENMONHOC}</td>
                                    <td>{s.QT1}</td>
                                    <td>{s.QT2}</td>
                                    <td>{s.GIUAKY}</td>
                                    <td>{s.CUOIKY}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageScore
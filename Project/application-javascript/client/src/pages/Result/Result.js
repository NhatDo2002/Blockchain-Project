import classNames from "classnames/bind"
import styles from "./Result.module.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import * as studentAPI from "../../api/studentService"


const cx = classNames.bind(styles)

function Result(){
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

    return (
        <div className={cx('container')}>
            <div className={cx('title')}>
                Quản lý học tập
            </div>
            <h2 className={cx('subtitle')}>Kết quả học tập của sinh viên {student.HOVATEN}</h2>
            <table className={cx('table')}>
                <thead>
                    <tr className={cx("table-header")}>
                        <th>Môn Học</th>
                        <th>Số tín chỉ</th>
                        <th>Điểm quá trình 1</th>
                        <th>Điểm quá trình 2</th>
                        <th>Điểm giữa kỳ</th>
                        <th>Điểm cuối kỳ</th>
                    </tr>
                </thead>
                <tbody>
                    {student.MONHOC?.map((mh, index) => {
                        return (<tr key={index} className={cx("table-content")}>
                            <td>{mh.TENMONHOC}</td>
                            <td>3</td>
                            <td>{mh.QT1}</td>    
                            <td>{mh.QT2}</td>
                            <td>{mh.GIUAKY}</td>
                            <td>{mh.CUOIKY}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <div className={cx('note-container')}>
                <p className={cx('note')}>Ghi chú:</p>
                <p>Sinh viên có thắc mắc về điểm vui lòng nộp đơn khiếu nại điểm về Khoa </p>
            </div>
        </div>
    )
}

export default Result
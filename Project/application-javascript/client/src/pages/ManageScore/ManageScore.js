import classNames from "classnames/bind"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../../context/UserContext'
import styles from './ManageScore.module.scss'
import * as studentAPI from "../../api/studentService"
import EditStudent from "../../components/EditStudentMark";
import DeleteStudentMark from "../../components/DeleteStudentMark";

const cx = classNames.bind(styles)

function ManageScore(){
    const [students, setStudents] = useState([])
    const [editStudent, setEditStudent] = useState({})
    const [deleteMark, setDeleteMark] = useState({})
    const [showEdit, setShowEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

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

    const handleEdit = (mssv, tensv ,monhoc) => {
        let editStudentMark = {
            MSSV: mssv,
            HOVATEN: tensv,
            TENMONHOC: monhoc.TENMONHOC,
            QT1: monhoc.QT1,
            QT2: monhoc.QT2,
            GIUAKY: monhoc.GIUAKY,
            CUOIKY: monhoc.CUOIKY
        }

        setEditStudent(editStudentMark)
        setShowEdit(true)
    }

    const handleDelete = (tensv, mssv, monhoc) => {
        let deleteStudentMark = {
            MSSV: mssv,
            HOVATEN: tensv,
            TENMONHOC: monhoc.TENMONHOC,
        }

        setDeleteMark(deleteStudentMark)
        setShowDelete(true)
    }

    useEffect(() => {
        const fetchApi = async () => {
            const result = await studentAPI.getAllStudent()
            setStudents(JSON.parse(result.response))
        }

        fetchApi()
    }, [])

    return (
        <>
            <div className={cx('content-container')}>
                {showDelete && <DeleteStudentMark
                                    name={deleteMark.HOVATEN}
                                    mssv={deleteMark.MSSV}
                                    tenmonhoc={deleteMark.TENMONHOC}
                                    onClick={handleUnshowDelete}
                                />}
                {showEdit && <EditStudent 
                                name={editStudent.HOVATEN}
                                mssv={editStudent.MSSV}
                                tenmonhoc={editStudent.TENMONHOC}
                                qt1={editStudent.QT1}
                                qt2={editStudent.QT2}
                                giuaky={editStudent.GIUAKY}
                                cuoiky={editStudent.CUOIKY}
                                onClick={handleUnshowEdit}
                            />}
                <div className={cx('content')}>
                    <h1 className={cx('header')}>Trang quản lý điểm sinh viên</h1>
                    {students.map((s,index) => {
                        return <div key={index} style={{width: '100%'}}>
                            <div className={cx('student-info')}>
                                <p className={cx('student-text')}>Họ và tên : {s.HOVATEN}</p>
                                <p className={cx('student-text')}>MSSV : {s.MSSV}</p>
                            </div>
                            <div className={cx('annoucement')}>
                                    <table className={cx('table')}>
                                        <thead>
                                            <tr className={cx("table-header")}>
                                                <th>Môn Học</th>
                                                <th>Điểm quá trình 1</th>
                                                <th>Điểm quá trình 2</th>
                                                <th>Điểm giữa kỳ</th>
                                                <th>Điểm cuối kỳ</th>
                                                <th>Quản lý</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {s.MONHOC?.map((mh, index) => {
                                                return (<tr key={index} className={cx("table-content")}>
                                                    <td>{mh.TENMONHOC}</td>
                                                    <td>{mh.QT1}</td>    
                                                    <td>{mh.QT2}</td>
                                                    <td>{mh.GIUAKY}</td>
                                                    <td>{mh.CUOIKY}</td>
                                                    <td>
                                                        <p className={cx('edit-btn')} onClick={() => {handleEdit(s.MSSV, s.HOVATEN, mh)}}>Chỉnh sửa</p>
                                                        <p className={cx('delete-btn')} onClick={() => {handleDelete(s.HOVATEN, s.MSSV, mh)}}>Xóa điểm</p>
                                                    </td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default ManageScore
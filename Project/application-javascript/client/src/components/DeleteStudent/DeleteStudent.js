import classNames from "classnames/bind"
import { Formik } from 'formik'
import { useState } from 'react'
import styles from "./DeleteStudent.module.scss"
import * as studentService from "../../api/studentService"

const cx = classNames.bind(styles);

const fn = () => {}

function DeleteStudent({ MSSV, HOVATEN, onClick = fn}){
    const [pending, setPending] = useState(false)
    const [message, setMessage] = useState("")
    const fn = onClick

    const afterSubmit = () => {
        fn()
        window.location.reload()
    }

    return (
        <div className={cx('container')}>
            <h1>Xác nhận xóa thông tin sinh viên</h1>
            <h1>Sinh viên {HOVATEN}</h1>
            <div className={cx('content')}>
                <p className={cx('content-text')}>
                    Giảng viên xác nhận xóa thông của sinh viên <span style={{fontWeight: "bold"}}>{HOVATEN}</span> với mã số sinh viên là <span style={{fontWeight: "bold"}}>{MSSV}</span>?
                </p>
                <Formik
                    initialValues={{ MSSV: MSSV}}
                    onSubmit = {(values, {setSubmitting}) => { 
                        //setSubmitting(true)
                        const fetchAPI = async (values) => {
                            console.log(values)
                            setPending(true)
                            setMessage("Đang thực hiện việc xóa thông tin")
                            const result = await studentService.deleteStudent(values)
                            console.log(result)
                            setMessage("Xóa thông tin thành công")
                            setInterval(() => {
                                afterSubmit()
                            }, 3000)
                        }
                        fetchAPI(values)
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <form className={cx('edit-form')} onSubmit={handleSubmit}>
                            <input 
                                    type="hidden" 
                                    name="MSSV"
                                    onChange={handleChange}
                                    value={values.MSSV}
                                />
                            {pending? (<div className={cx('btn-contain')}>
                                <p className={cx('pending-text')}>{message}</p>
                            </div>) 
                            : (
                                <div className={cx('btn-contain')}>
                                    <button type="submit" className={cx('btn')}>Đồng ý</button>
                                    <button type="button" onClick={onClick} className={cx('btn')}><span style={{color: "red"}}>Hủy bỏ</span></button>
                                </div>
                            )}
                            
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default DeleteStudent
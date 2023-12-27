import classNames from "classnames/bind"
import { Formik } from 'formik'
import { useState } from 'react'
import styles from "./DeleteStudentMark.module.scss"
import * as markService from "../../api/markService"

const cx = classNames.bind(styles);

const fn = () => {}

function DeleteStudentMark({ name, mssv, tenmonhoc, onClick = fn}){
    const [pending, setPending] = useState(false)
    const [message, setMessage] = useState("")
    const fn = onClick

    const afterSubmit = () => {
        fn()
        window.location.reload()
    }

    return (
        <div className={cx('container')}>
            <h1>Xác nhận xóa điểm</h1>
            <h1>Môn {tenmonhoc}</h1>
            <div className={cx('content')}>
                <p className={cx('content-text')}>
                    Giảng viên xác nhận xóa điểm của sinh viên <span style={{fontWeight: "bold"}}>{name}</span> với mã số sinh viên là <span style={{fontWeight: "bold"}}>{mssv}</span>?
                </p>
                <Formik
                    initialValues={{ MSSV: mssv, TENMONHOC: tenmonhoc}}
                    onSubmit = {(values, {setSubmitting}) => { 
                        //setSubmitting(true)
                        const fetchAPI = async (values) => {
                            setPending(true)
                            setMessage("Đang thực hiện việc xóa môn học")
                            const result = await markService.deleteMark(values) 
                            console.log(result)
                            setMessage("Xóa môn học thành công")
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
                            <input 
                                    type="hidden" 
                                    name="TENMONHOC"
                                    onChange={handleChange}
                                    value={values.TENMONHOC}
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

export default DeleteStudentMark
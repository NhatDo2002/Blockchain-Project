import classNames from "classnames/bind"
import { Formik } from 'formik'
import { useState } from 'react'
import styles from "./EditStudentMark.module.scss"
import * as markService from "../../api/markService"

const cx = classNames.bind(styles);

const fn = () => {}
function EditStudent({ name, mssv, tenmonhoc, qt1, qt2, giuaky, cuoiky , onClick = fn}){
    const [success, setSuccess] = useState(false)

    const afterSubmit = () => {
        fn()
        window.location.reload()
    }

    return (
        <div className={cx('container')}>
            <h1>Chỉnh sửa điểm</h1>
            <h1>Môn {tenmonhoc}</h1>
            <div className={cx('edit-header-name')}>
                <p className={cx('text')}>Sinh viên: {name}</p>
                <p className={cx('text')}>Mã số sinh viên: {mssv}</p>
            </div>
            <Formik
                initialValues={{ MSSV: mssv, TENMONHOC: tenmonhoc , QT1: qt1, QT2: qt2, GIUAKY: giuaky, CUOIKY: cuoiky}}
                onSubmit = {(values, {setSubmitting}) => { 
                    //setSubmitting(true)
                    const fetchAPI = async (values) => {
                        const result = await markService.updateMark(values) 
                        console.log(result)

                        setSuccess(true)
                        setInterval(() => {
                            afterSubmit()
                        }, 3000)
                    }
                    
                    fetchAPI(values)
                    setInterval(() => {
                        setSuccess(false)
                    }, 4000)
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form className={cx('edit-form')} onSubmit={handleSubmit}>
                        <div className={cx('edit-form-input')}>
                            <div className={cx('input-contain')}>
                                <label className={cx('title')}>QT1<span style={{color: "red"}}>{"(*)"}</span></label>
                                <input 
                                    className={cx('input')} 
                                    type="number" 
                                    name="QT1"
                                    onChange={handleChange}
                                    value={values.QT1}
                                />
                            </div>
                            <div className={cx('input-contain')}>
                                <label className={cx('title')}>QT2<span style={{color: "red"}}>{"(*)"}</span></label>
                                <input 
                                    className={cx('input')} 
                                    type="number" 
                                    name="QT2"
                                    onChange={handleChange}
                                    value={values.QT2}
                                />
                            </div>
                            <div className={cx('input-contain')}>
                                <label className={cx('title')}>GIUAKY<span style={{color: "red"}}>{"(*)"}</span></label>
                                <input 
                                    className={cx('input')} 
                                    type="number" 
                                    name="GIUAKY"
                                    onChange={handleChange}
                                    value={values.GIUAKY}
                                />
                            </div>
                            <div className={cx('input-contain')}>
                                <label className={cx('title')}>CUOIKY<span style={{color: "red"}}>{"(*)"}</span></label>
                                <input 
                                    className={cx('input')} 
                                    type="number" 
                                    name="CUOIKY"
                                    onChange={handleChange}
                                    value={values.CUOIKY}
                                />
                            </div>
                        </div>
                        <div className={cx('success-ctn')}>
                            {success && <p className={cx('success')}>Chỉnh sửa điểm thành công</p>}
                        </div>
                        <div className={cx('btn-contain')}>
                            <button type="submit" className={cx('btn')}>Chỉnh sửa</button>
                            <button type="button" onClick={onClick} className={cx('btn')}><span style={{color: "red"}}>Hủy bỏ</span></button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default EditStudent
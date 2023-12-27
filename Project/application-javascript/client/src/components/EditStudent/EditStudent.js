import classNames from "classnames/bind"
import { Formik } from 'formik'
import { useState } from 'react'
import styles from "./EditStudent.module.scss"
import * as studentService from "../../api/studentService"

const cx = classNames.bind(styles);

const fn = () => {}
function EditStudent({ student, onClick = fn }){
    const [success, setSuccess] = useState(false)

    const afterSubmit = () => {
        fn()
        window.location.reload()
    }

    return (
        <div className={cx('container')}>
            <h1>Chỉnh sửa thông tin</h1>
            <div className={cx('edit-header-name')}>
                <p className={cx('text')}>Mã số sinh viên: {student.MSSV}</p>
            </div>
            <Formik
                initialValues={{ MSSV: student.MSSV, HOVATEN: student.HOVATEN, NAMSINH: student.NAMSINH, GIOITINH: student.GIOITINH, KHOA: student.KHOA, GPA: student.GPA}}
                onSubmit = {(values, {setSubmitting}) => { 
                    //setSubmitting(true)
                    console.log(values)
                    const fetchAPI = async (values) => {
                        const result = await studentService.editStudent(values)
                        console.log(result)
                        setSuccess(true)
                        setInterval(() => {
                            afterSubmit()
                        }, 3000)
                    }

                    fetchAPI(values)
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <form className={cx('edit-form')} onSubmit={handleSubmit}>
                        <div className={cx('edit-form-input')}>
                            <div className={cx('input-contain')}>
                                <label className={cx('title')}>Họ và tên<span style={{color: "red"}}>{"(*)"}</span></label>
                                <input 
                                    className={cx('input')} 
                                    type="text" 
                                    name="HOVATEN"
                                    onChange={handleChange}
                                    value={values.HOVATEN}
                                />
                            </div>
                            <div className={cx("input-contain-row")}>
                                <div className={cx('input-contain')}>
                                    <label className={cx('title')}>Giới tính<span style={{color: "red"}}>{"(*)"}</span></label>
                                    <select
                                        name="GIOITINH"
                                        value={values.GIOITINH}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={cx('edit-select')}
                                    >
                                        <option value="Nam" label="Nam">
                                            Nam
                                        </option>
                                        <option value="Nu" label="Nu">
                                            Nu
                                        </option>
                                    </select>
                                </div>
        
                                <div className={cx('input-contain')}>
                                    <label className={cx('title')}>Năm sinh<span style={{color: "red"}}>{"(*)"}</span></label>
                                    <input 
                                        className={cx('input')} 
                                        type="text" 
                                        name="NAMSINH"
                                        onChange={handleChange}
                                        value={values.NAMSINH}
                                    />
                                </div>
                                <div className={cx('input-contain')}></div>
                                <div className={cx('input-contain')}></div>
                            </div>
                            <div className={cx('input-contain')}>
                                <label className={cx('title')}>Khoa<span style={{color: "red"}}>{"(*)"}</span></label>
                                <input 
                                    className={cx('input')} 
                                    type="text" 
                                    name="KHOA"
                                    onChange={handleChange}
                                    value={values.KHOA}
                                />
                            </div>
                        </div>
                        <div className={cx('success-ctn')}>
                            {success && <p className={cx('success')}>Chỉnh sửa sinh viên thành công</p>}
                        </div>
                        <div className={cx('btn-contain')}>
                            <button type="submit" className={cx('btn')}>Xác nhận</button>
                            <button onClick={onClick} type="button" className={cx('btn')}><span style={{color: "red"}}>Hủy bỏ</span></button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default EditStudent
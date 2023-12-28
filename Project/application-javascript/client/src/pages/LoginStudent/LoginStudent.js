import classNames from "classnames/bind"
import { Formik } from 'formik'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useUserContext } from '../../context/UserContext'
import styles from './LoginStudent.module.scss'
import images from "../../assets/images"
import * as loginAPI from "../../api/loginService"


const cx = classNames.bind(styles)

function LoginStudent(){
    const [error,setError] = useState("")

    const navigate = useNavigate()
    const { login } = useUserContext()

    return(
        <div className={cx('container')}>
            <div className={cx('login-container')}>
                <div className={cx('input-side')}>
                    <div className={cx('padding')}>
                        <p className={cx('header')}>Đăng nhập</p>
                        <p className={cx('side-header')}>Cổng thông tin sinh viên</p>
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            onSubmit = {(values, {setSubmitting}) => { 
                                //setSubmitting(true)
                                const fetchAPI = async (values) => {
                                    const result = await loginAPI.accountLogin(values)
                                    if(result.code === 1){
                                        console.log(result)
                                        setError(result.message)
                                        values.username = ""
                                        values.password = ""
                                    }else if(result.code === 0){
                                        console.log("Đăng nhập thành công với tài khoản",result)
                                        setError("")
                                        let user = JSON.parse(result.data)
                                        sessionStorage.setItem("user", JSON.stringify(user))
                                        login(JSON.parse(sessionStorage.getItem("user")))
                                        navigate("/main")
                                    }
                                }

                                fetchAPI(values)
                            }}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                <form className={cx('login-form')} onSubmit={handleSubmit}>
                                <div className={cx('input-contain')}>
                                    <label className={cx('title')}>Mã số sinh viên<span style={{color: "red"}}>{"(*)"}</span></label>
                                    <input 
                                        className={cx('input')} 
                                        type="text"
                                        name="username"
                                        placeholder="Nhập mã số..."
                                        onChange={handleChange}
                                        value={values.username}
                                    />
                                </div>
                                <div className={cx('input-contain')}>
                                    <label className={cx('title')}>Mật khẩu<span style={{color: "red"}}>{"(*)"}</span></label>
                                    <input 
                                        className={cx('input')} 
                                        type="password"
                                        name="password" 
                                        placeholder="Nhập mật khẩu..." 
                                        onChange={handleChange}
                                        value={values.password}    
                                    />
                                </div>
                                {(error || error.length > 0) && <p className={cx('errors')}>{error}</p>}
                                <div className={cx('btn-contain')}>
                                    <button type="submit" className={cx('btn')}>Đăng nhập</button>
                                </div>
                            </form>
                            )}
                        </Formik>
                        <div className={cx('img-contain')}>
                            <img className={cx('img-login')} src={images.duck} alt="Vịt vàng" />
                        </div>
                    </div>
                </div>
                <div className={cx('logo-side')}>
                    <img className={cx('logo-img')} src={images.logo_TDT} alt="Logo TDTU" />
                </div>
            </div>
        </div>
    )
}

export default LoginStudent
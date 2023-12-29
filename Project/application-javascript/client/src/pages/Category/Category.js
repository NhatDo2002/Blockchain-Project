import classNames from "classnames/bind"
import styles from "./Category.module.scss"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { useUserContext } from '../../context/UserContext'

const cx = classNames.bind(styles)

function Category(){
    const navigate = useNavigate()
    let { user } = useUserContext()

    useEffect(() => {
        if(user === null){
            navigate('/')
        }else if(user.USERNAME === "admin"){
            navigate('/main')
        }
    },[user])

    return(
        <div className={cx('container')}>
            <div className={cx('title')}>
                Quản lý học tập
            </div>
            <div className={cx('choice-container')}>
                <a href="/student/result" className={cx('choice')}>
                    Kết quả học tập
                </a>
                <a href="/student/register-subject" className={cx('choice')}>
                    Đăng ký môn học
                </a>
            </div>
        </div>
    )
}

export default Category
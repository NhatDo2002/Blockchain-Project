import classNames from "classnames/bind"
import styles from './Dashboard.module.scss'
import images from "../../assets/images"

const cx = classNames.bind(styles);

function Dashboard(){
    return(
        <div className={cx('container')}>
            <div className={cx('img-contain')}>
                <img className={cx('logo-img')} src={images.logo_TDT} alt="Logo TDTU"/>
            </div>
            <div className={cx('choice-container')}>
                <div className={cx('title')}>Hệ thống quản lý thông tin</div>
                <div className={cx('choice')}>
                    <div onClick={() => {window.location = "/login-student"}} href="/" className={cx('student-choice')}></div>
                    <div className={cx('line')}></div>
                    <div onClick={() => {window.location = "/login-teacher"}} href="/" className={cx('teacher-choice')}></div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Dashboard
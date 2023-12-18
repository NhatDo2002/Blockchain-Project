import classNames from "classnames/bind"
import styles from './LoginTeacher.module.scss'
import images from "../../assets/images"

const cx = classNames.bind(styles)

function LoginTeacher(){
    return(
        <div className={cx('container')}>
            <div className={cx('login-container')}>
                <div className={cx('logo-side')}>
                    <img className={cx('logo-img')} src={images.logo_TDT} alt="Logo TDTU" />
                </div>
                <div className={cx('input-side')}>
                    <div className={cx('padding')}>
                        <p className={cx('header')}>Đăng nhập</p>
                        <p className={cx('side-header')}>Cổng thông tin giảng viên - viên chức</p>
                        <form className={cx('login-form')}>
                            <div className={cx('input-contain')}>
                                <label className={cx('title')}>Tên tài khoản<span style={{color: "red"}}>{"(*)"}</span></label>
                                <input className={cx('input')} type="text" placeholder="Nhập mã số..." />
                            </div>
                            <div className={cx('input-contain')}>
                                <label className={cx('title')}>Mật khẩu<span style={{color: "red"}}>{"(*)"}</span></label>
                                <input className={cx('input')} type="password" placeholder="Nhập mật khẩu..." />
                            </div>
                            <div className={cx('btn-contain')}>
                                <button className={cx('btn')}>Đăng nhập</button>
                            </div>
                        </form>
                        <div className={cx('img-contain')}>
                            <img className={cx('img-login')} src={images.cat} alt="Vịt vàng" />
                            <p className={cx('wish')}>Chúc quý thầy cô ngày mới vui vẻ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginTeacher
import classNames from "classnames/bind";
import styles from './Header.module.scss';
import images from "../../../assets/images";

const cx = classNames.bind(styles);

let logined = (sessionStorage.getItem("user"))
logined = JSON.parse(logined)
console.log(logined)

function Header(){
    return(
        <div className={cx('container')}>
            <div className={cx('logo-contain')}>
                <img className={cx('img-logo')} src={images.logo_TDT} alt="Logo TDTU"/>
            </div>
            <div className={cx('name-contain')}>
                <img className={cx('user-icon')} src={images.user} alt="User Icon"/>
                <p className={cx('name')}>{logined !== null ? logined.USERNAME : "Nguyễn Văn A"}</p>
            </div>
        </div>
    )
}

export default Header
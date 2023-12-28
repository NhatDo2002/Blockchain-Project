import classNames from "classnames/bind";
import styles from './Header.module.scss';
import images from "../../../assets/images";
import { useUserContext } from '../../../context/UserContext'
import PopperMenu from "../../../components/PopperMenu/PopperMenu";

const cx = classNames.bind(styles);

function Header(){

    const { user } = useUserContext()

    return(
        <div className={cx('container')}>
            <div className={cx('logo-contain')}>
                <img className={cx('img-logo')} src={images.logo_TDT} alt="Logo TDTU"/>
            </div>
            <PopperMenu>
                <div className={cx('name-contain')}>
                    <img className={cx('user-icon')} src={images.user} alt="User Icon"/>
                    <p className={cx('name')}>{user !== null ? user.HOVATEN : "Nguyễn Văn A"}</p>
                </div>
            </PopperMenu>
        </div>
    )
}

export default Header
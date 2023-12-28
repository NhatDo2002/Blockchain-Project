import classNames from "classnames/bind";
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import styles from "./PopperMenu.module.scss";
import { useUserContext } from '../../context/UserContext'

const cx = classNames.bind(styles);

function PopperMenu({ children }){
    const { logout } = useUserContext()

    return (
        <Tippy
            interactive
            offset={[10, -10]}
            render={attrs => (
                <div className={cx('box')} tabIndex="-1" {...attrs}>
                    <button className={cx('item-container')} onClick={() => {logout()}}>
                        <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon')}/>
                        <p className={cx('title')}>Đăng xuất</p>
                    </button>
                </div>
            )}
        >
            {children}
        </Tippy>
    )
}

export default PopperMenu
import classNames from "classnames/bind"
import styles from "./SidebarItem.module.scss"

const cx = classNames.bind(styles)

function SidebarItem({ title, leftIcon }){
    return (
        <div className={cx('container')}>
            <div className={cx('icon')}>{leftIcon}</div>
            <p className={cx('title')}>{title}</p>
        </div>
    )
}

export default SidebarItem
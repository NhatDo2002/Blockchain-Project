import classNames from "classnames/bind"
import styles from './ButtonAccount.module.scss'

const cx = classNames.bind(styles)

function ButtonAccount({ children, className, onClick, created = false, none = false }){
    const classes = cx('account-btn', {
        [className]: className,
        created,
        none
    })

    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    )
}

export default ButtonAccount
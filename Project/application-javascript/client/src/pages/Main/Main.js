import classNames from "classnames/bind"
import { useEffect, useState } from 'react'
import styles from './Main.module.scss'
import images from "../../assets/images"

const cx = classNames.bind(styles)

const ROLE = 0

function Main(){
    const [test, setTest] = useState("")

    return (
        <div className={cx('content-container')}>
            {ROLE === 1 ? 
                (
                   <div className={cx('content')}>
                        <h1 className={cx('header')}>Cổng thông tin sinh viên</h1>
                        <div className={cx('annoucement')}>
                            <h3 className={cx('title')}>Đây là trang thông tin của sinh viên</h3>
                            <p className={cx('text')}>Sinh viên sẽ xem thông tin cá nhân của mình cũng như cập nhật lại thông tin cá nhân của mình tại trang này</p>
                            <p className={cx('text')}>Sinh viên muốn sử dụng các chức năng của trang thì chọn các ô ở bên trái màn hình với mỗi chức năng tương ứng</p>
                        </div>
                        <div className={cx('annoucement')}>
                            <h3 className={cx('title')}>Cảnh cáo giả mạo</h3>
                            <p className={cx('text')}>Sinh viên không nên chia sẻ lung tung tài khoản email của mình cho người khách</p>
                            <p className={cx('text')}>Điều này có thể dẫn tới bị giả mạo vào những mục đích không đúng đắn của những kẻ xấu</p>
                        </div>
                    </div>
                )
            :
                (<div className={cx('content')}>
                    <h1 className={cx('header')}>Trang quản lý sinh viên</h1>
                    <div className={cx('annoucement')}>
                        <h3 className={cx('title')}>Chào mừng các thầy cô</h3>
                        <p className={cx('text')}>Các thầy cô vui lòng cập nhật các thông tin về sinh viên tại trang quản lý sinh viên này</p>
                        <p className={cx('text')}>Các thầy cô khi muốn sử dụng các chức năng của trang thì chọn các ô ở bên trái màn hình với mỗi chức năng tương ứng</p>
                    </div>
                    <div className={cx('annoucement')}>
                        <h3 className={cx('title')}>Các thầy cô lưu ý</h3>
                        <p className={cx('text')}>Tránh trường hợp nhập sai thông tin dẫn đến những hiểu lầm không mong muốn đối với sinh viên</p>
                        <p className={cx('text')}>Các chức năng đã được cung cấp đầy đủ và đã được phát triển tốt nhất nên các thầy cô cứ yên tâm sử dụng</p>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Main
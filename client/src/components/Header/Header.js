import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.svg';
import avatar from '../../assets/images/student-photo.png';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/" className={cx('logo-link')}>
                        <img src={logo} alt="HUIT E-Learn" className={cx('logo-image')} />
                        <div className={cx('logo-text')}>
                            <span className={cx('logo-huit')}>HUIT</span>
                            <span className={cx('logo-elearn')}>E-Learn</span>
                        </div>
                    </Link>
                </div>

                <div className={cx('actions')}>
                    <Link to="/materials" className={cx('action-item')}>
                        Tải lên tài liệu
                    </Link>
                    <Link to="/materials" className={cx('action-item')}>
                        Tạo bài kiểm tra ngẫu nhiên
                    </Link>
                    <Link to="/exams" className={cx('action-item')}>
                        Trắc nghiệm
                    </Link>
                    <Link to="/news" className={cx('action-item')}>
                        Tin tức
                    </Link>
                    <div className={cx('notification')}>
                        <img className={cx('notification-icon')} src="/images/Bell.svg" alt="" />
                        <span className={cx('notification-count')}>2</span>
                    </div>
                    <div className={cx('user-avatar')}>
                        <img src={avatar} alt="User Avatar" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

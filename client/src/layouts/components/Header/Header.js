import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Thêm dòng này

import logo from '../../../assets/images/logo.svg';
import avatar from '../../../assets/images/student-photo.png';

const cx = classNames.bind(styles);

function Header() {
    // Lấy trạng thái đăng nhập từ Redux store
    const { isLoggedIn } = useSelector((state) => state.auth);
    const currentUser = isLoggedIn;

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
                    <NavLink to="/upload" className={({ isActive }) => cx('action-item', { active: isActive })}>
                        Tải lên tài liệu
                    </NavLink>
                    <NavLink to="/createtest" className={({ isActive }) => cx('action-item', { active: isActive })}>
                        Tạo bài kiểm tra
                    </NavLink>
                    <NavLink to="/exams" className={({ isActive }) => cx('action-item', { active: isActive })}>
                        Trắc nghiệm
                    </NavLink>
                    <NavLink to="/news" className={({ isActive }) => cx('action-item', { active: isActive })}>
                        Tin tức
                    </NavLink>
                    <div className={cx('notification')}>
                        <img className={cx('notification-icon')} src="/images/Bell.svg" alt="" />
                        <span className={cx('notification-count')}>2</span>
                    </div>
                    <div className={cx('user-avatar')}>
                        {currentUser ? (
                            <img className={cx('true')} src={avatar} alt=" " />
                        ) : (
                            <img className={cx('false')} src="/images/user-icon.svg" alt="" />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

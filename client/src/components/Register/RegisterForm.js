import React from 'react';
import styles from './RegisterForm.module.scss';
import classNames from 'classnames/bind';
import InputField from '../InputField/InputField';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const RegisterForm = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('link')}>
                <Link to="/">Trang chủ</Link> / <Link to="/account">Tài khoản</Link> / <span>Đăng ký</span>
            </div>
            <form className={cx('login-from')}>
                <div className={cx('form-banner')} style={{ backgroundImage: "url('/images/bialogin.jpg')" }}>
                    <p className={cx('title')}>
                        Tìm kiếm và tạo bài kiểm tra dễ dàng tại <span>HUIT E-LEARN</span>
                    </p>
                </div>

                <div className={cx('form-content')}>
                    <p>Chào mừng bạn đến với HUIT E-LEARN !</p>
                    <h4>Tạo tài khoản mới</h4>

                    <div className={cx('input-gr')}>
                        <div className={cx('input-email')}>
                            <InputField label="Email" placeholder="Vui lòng nhập email của bạn" required />
                        </div>
                    </div>

                    <div className={cx('form-btn')}>
                        <button type="submit" className={cx('btn-login')}>
                            Tiếp tục
                        </button>
                        <p>hoặc tiếp tục với</p>
                        <Link to="/login" className={cx('btn-new')}>
                            <img src="/images/login-icon.svg" alt="" />
                            <span>Đăng nhập tài khoản</span>
                        </Link>
                        <button className={cx('btn-google')}>
                            <img src="/images/google-icon.svg" alt="" />
                            <span>Đăng nhập với Google</span>
                        </button>
                        <button className={cx('btn-facebook')}>
                            <img src="/images/facebook-icon.svg" alt="" />
                            <span>Đăng nhập với Facebook</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;

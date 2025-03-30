import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
import { login } from '../../redux/slices/authSlide';
import InputField from '../InputField/InputField';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Xử lý sự kiện thay đổi email
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Xử lý sự kiện thay đổi mật khẩu
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Xử lý sự kiện đăng nhập
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password })); // Dispatch action login với email và password
        navigate('/'); // Chuyển hướng về trang chủ sau khi đăng nhập
        // alert('Đăng nhập thành công!');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('link')}>
                <Link to="/">Trang chủ</Link> / <Link to="/account">Tài khoản</Link> / <span>Đăng nhập</span>
            </div>
            <form className={cx('login-from')} onSubmit={handleSubmit}>
                <div className={cx('form-banner')} style={{ backgroundImage: "url('/images/bialogin.jpg')" }}>
                    <p className={cx('title')}>
                        Tìm kiếm và tạo bài kiểm tra dễ dàng tại <span>HUIT E-LEARN</span>
                    </p>
                </div>

                <div className={cx('form-content')}>
                    <p>Xin chào bạn !</p>
                    <h4>Đăng nhập tài khoản</h4>

                    <div className={cx('input-gr')}>
                        <div className={cx('input-email')}>
                            <InputField
                                label="Email"
                                placeholder="Nhập Email của bạn"
                                required
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className={cx('input-password')}>
                            <InputField
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu của bạn"
                                required
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </div>

                    <div className={cx('info')}>
                        <label className={cx('checkbox-label')}>
                            <input type="checkbox" className={cx('checkbox-input')} />
                            <span>Lưu đăng nhập</span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/images/Help.svg" alt="" />
                            <Link to="/forgot-password">Quên mật khẩu</Link>
                        </label>
                    </div>

                    <div className={cx('form-btn')}>
                        <button type="submit" className={cx('btn-login')}>
                            Đăng nhập
                        </button>
                        <p>hoặc tiếp tục với</p>
                        <Link to="/register" className={cx('btn-new')}>
                            <img src="/images/user-add-icon.svg" alt="" />
                            <span>Tạo tài khoản mới</span>
                        </Link>
                        <button type="button" className={cx('btn-google')}>
                            <img src="/images/google-icon.svg" alt="" />
                            <span>Đăng nhập với Google</span>
                        </button>
                        <button type="button" className={cx('btn-facebook')}>
                            <img src="/images/facebook-icon.svg" alt="" />
                            <span>Đăng nhập với Facebook</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default LoginForm;

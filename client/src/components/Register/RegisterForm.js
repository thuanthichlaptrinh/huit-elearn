import React, { useState } from 'react';
import styles from './RegisterForm.module.scss';
import classNames from 'classnames/bind';
import InputField from '../InputField/InputField';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const RegisterForm = () => {
    // State to track registration steps
    const [step, setStep] = useState(1); // 1: Email entry, 2: OTP verification, 3: Password setup
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Thêm state để kiểm soát hiển thị mật khẩu

    // Handle email submission
    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage('Vui lòng nhập email của bạn');
            return;
        }
        // Here you would normally call an API to send OTP
        console.log('Sending OTP to:', email);
        setStep(2);
        setErrorMessage('');
    };

    // Handle OTP verification
    const handleOtpSubmit = (e) => {
        e.preventDefault();
        if (!otp) {
            setErrorMessage('Vui lòng nhập mã OTP');
            return;
        }
        // Here you would normally verify OTP with an API
        console.log('Verifying OTP:', otp);
        setStep(3);
        setErrorMessage('');
    };

    // Handle password setup
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (!password) {
            setErrorMessage('Vui lòng nhập mật khẩu');
            return;
        }

        // if (password !== confirmPassword) {
        //     setErrorMessage('Mật khẩu không khớp');
        //     return;
        // }

        // Here you would normally create account with an API
        console.log('Creating account with email:', email, 'and password:', password);
        // Redirect to login page or dashboard
        setErrorMessage('');
    };

    // Resend OTP functionality
    const handleResendOtp = () => {
        console.log('Resending OTP to:', email);
        // Here you would call API to resend OTP
    };

    // Hàm để chuyển đổi hiển thị mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Render different form content based on current step
    const renderFormContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <p className={cx('wellcome')}>Chào mừng bạn đến với HUIT E-LEARN !</p>
                        <h4>Tạo tài khoản mới</h4>

                        <div className={cx('input-gr')}>
                            <div className={cx('input-email')}>
                                <InputField
                                    label="Email"
                                    placeholder="Vui lòng nhập email của bạn"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}
                        </div>

                        <div className={cx('form-btn')}>
                            <button type="submit" className={cx('btn-login')} onClick={handleEmailSubmit}>
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
                    </>
                );
            case 2:
                return (
                    <>
                        <p className={cx('wellcome')}>Chào mừng bạn đến với HUIT E-LEARN !</p>
                        <h4>Tạo tài khoản mới</h4>
                        <p className={cx('otp-message')}>
                            Mã OTP được gửi qua Email <span style={{ color: 'var(--primary)' }}>{email}</span> của bạn.
                            Vui lòng xem hộp thư.
                        </p>

                        <div className={cx('input-gr')}>
                            <div className={cx('input-otp')}>
                                <InputField
                                    label="Mã OTP"
                                    placeholder="Nhập mã OTP"
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <button className={cx('resend-otp')} onClick={handleResendOtp} type="button">
                                    <FontAwesomeIcon icon={faPhone} />
                                    <span>Gửi lại mã OTP</span>
                                </button>
                            </div>
                            {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}
                        </div>

                        <div className={cx('form-btn')}>
                            <button type="submit" className={cx('btn-login')} onClick={handleOtpSubmit}>
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
                    </>
                );
            case 3:
                return (
                    <>
                        <p className={cx('wellcome')}>Chào mừng bạn đến với HUIT E-LEARN !</p>
                        <h4>Tạo tài khoản mới</h4>
                        <p className={cx('password-requirements')}>
                            Mật khẩu bao gồm:
                            <ul>
                                <li>Ít từ chữ viết hoa trở lên</li>
                                <li>Ít tự đặc biệt trở lên</li>
                                <li>Độ dài từ 6 ký tự trở lên</li>
                            </ul>
                        </p>

                        <div className={cx('input-gr')}>
                            <div className={cx('input-email')}>
                                <InputField label="Email" value={email} disabled />
                            </div>
                            <div className={cx('input-password')}>
                                <div className={cx('password-field-container')}>
                                    <InputField
                                        label="Nhập mật khẩu"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Nhập mật khẩu của bạn"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className={cx('toggle-password')}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {password.length > 0 && (
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEyeSlash : faEye}
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{ cursor: 'pointer' }}
                                                className={cx('show-password')}
                                                // title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                                            />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}
                        </div>

                        <div className={cx('form-btn')}>
                            <button type="submit" className={cx('btn-login')} onClick={handlePasswordSubmit}>
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
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('link')}>
                <Link to="/">Trang chủ</Link> / <Link to="/account">Tài khoản</Link> / <span>Đăng ký</span>
            </div>
            <form className={cx('login-from')}>
                <div className={cx('form-banner')} style={{ backgroundImage: "url('/images/bialogin.jpg')" }}>
                    <p className={cx('title')}>
                        TÌM KIẾM VÀ TẠO BÀI KIỂM TRA DỄ DÀNG TẠI <span>HUIT E-LEARN</span>
                    </p>
                </div>

                <div className={cx('form-content')}>{renderFormContent()}</div>
            </form>
        </div>
    );
};

export default RegisterForm;

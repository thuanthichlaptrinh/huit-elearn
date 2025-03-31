import React, { useState, useEffect } from 'react';
import styles from './RegisterForm.module.scss';
import classNames from 'classnames/bind';
import InputField from '../InputField/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPhone } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const RegisterForm = () => {
    // State to track registration steps
    const [step, setStep] = useState(1); // 1: Email entry, 2: OTP verification, 3: Password setup
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Thêm state để kiểm soát hiển thị mật khẩu
    const navigate = useNavigate();

    // Quay về trang login sau khi tạo tk thành công
    useEffect(() => {
        if (step === 4) {
            const redirectTimer = setTimeout(() => {
                navigate('/login');
            }, 1000); // 1,5s

            return () => clearTimeout(redirectTimer);
        }
    }, [step, navigate]);

    // Handle email submission
    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage('Vui lòng nhập email của bạn');
            return;
        }
        // Gọi API để gửi OTP
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

        // Gọi API để gửi OTP
        console.log('Creating account with email:', email, 'and password:', password);

        // Chuyển hướng đến trang xác nhận đăng ký thành công
        setStep(4);
        setErrorMessage('');
    };

    // Chức năng gửi lại OTP
    const handleResendOtp = () => {
        console.log('Resending OTP to:', email);
    };

    // Hàm để chuyển đổi hiển thị mật khẩu
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
            case 4:
                return (
                    <>
                        <p className={cx('wellcome')}>Chào mừng bạn đến với HUIT E-LEARN !</p>
                        <h4>Tạo tài khoản mới</h4>

                        <div className={cx('success-create')}>
                            <img src="/images/success-icon.svg" alt="" />
                            <p>Tạo tài khoản thành công, vui lòng đợi vài giây !</p>
                        </div>

                        <div className={cx('form-btn')}>
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

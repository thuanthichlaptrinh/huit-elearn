import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
import { login } from '../../redux/slices/authSlide';
import InputField from '../InputField/InputField';
import { Link } from 'react-router-dom';
import { auth, googleProvider, facebookProvider } from '../../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const cx = classNames.bind(styles);

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Đăng nhập bằng Email và Password
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const idToken = await user.getIdToken(); // Lấy ID token
            dispatch(login({ email: user.email, uid: user.uid, token: idToken })); // Lưu token vào Redux
            localStorage.setItem('accessToken', idToken); // Lưu token vào localStorage
            navigate('/');
        } catch (error) {
            setErrorMessage('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
            console.error('Lỗi đăng nhập:', error);
        }
    };

    // Đăng nhập bằng Google
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const idToken = await user.getIdToken(); // Lấy ID token
            dispatch(login({ email: user.email, uid: user.uid, token: idToken })); // Lưu token vào Redux
            localStorage.setItem('accessToken', idToken); // Lưu token vào localStorage
            console.log('Token: ' + idToken);
            navigate('/');
        } catch (error) {
            let message = 'Đăng nhập bằng Google thất bại. Vui lòng thử lại.';
            if (error.code === 'auth/popup-closed-by-user') {
                message = 'Bạn đã đóng cửa sổ đăng nhập. Vui lòng thử lại.';
            } else if (error.code === 'auth/unauthorized-domain') {
                message = 'Domain không được phép. Vui lòng kiểm tra cấu hình Firebase.';
            } else if (error.code === 'auth/network-request-failed') {
                message = 'Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.';
            }
            setErrorMessage(message);
            console.error('Lỗi đăng nhập Google:', error);
        }
    };

    // Đăng nhập bằng Facebook
    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            const idToken = await user.getIdToken(); // Lấy ID token
            dispatch(login({ email: user.email, uid: user.uid, token: idToken })); // Lưu token vào Redux
            localStorage.setItem('accessToken', idToken); // Lưu token vào localStorage
            console.log('Token: ' + idToken);
            navigate('/');
        } catch (error) {
            setErrorMessage('Đăng nhập bằng Facebook thất bại. Vui lòng thử lại.');
            console.error('Lỗi đăng nhập Facebook:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('link')}>
                <Link to="/">Trang chủ</Link> / <Link to="/account">Tài khoản</Link> / <span>Đăng nhập</span>
            </div>
            <form className={cx('login-from')} onSubmit={handleEmailLogin}>
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
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={cx('input-password')}>
                            <InputField
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu của bạn"
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {errorMessage && <p className={cx('error-message')}>{errorMessage}</p>}
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
                        <button type="button" className={cx('btn-google')} onClick={handleGoogleLogin}>
                            <img src="/images/google-icon.svg" alt="" />
                            <span>Đăng nhập với Google</span>
                        </button>
                        <button type="button" className={cx('btn-facebook')} onClick={handleFacebookLogin}>
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

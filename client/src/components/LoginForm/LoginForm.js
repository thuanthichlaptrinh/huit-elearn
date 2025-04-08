import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
import { login } from '../../redux/slices/authSlice';
import InputField from '../InputField/InputField';
import { Link } from 'react-router-dom';
import { googleProvider, facebookProvider, db } from '../../firebase/config';
import { signInWithPopup, getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const cx = classNames.bind(styles);

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Đăng nhập bằng Email và Password từ Firestore
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Xóa thông báo lỗi cũ

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Email không hợp lệ. Vui lòng nhập email đầy đủ (ví dụ: example@gmail.com).');
            return;
        }

        try {
            // Truy vấn Firestore để tìm người dùng với email
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('Email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setErrorMessage('Tài khoản không tồn tại. Vui lòng kiểm tra email hoặc đăng ký tài khoản mới.');
                return;
            }

            // Lấy thông tin người dùng từ Firestore
            let userData = null;
            let userId = null;
            querySnapshot.forEach((doc) => {
                userData = doc.data();
                userId = doc.id;
            });

            // Kiểm tra mật khẩu
            if (userData.MatKhau !== password) {
                setErrorMessage('Mật khẩu không đúng. Vui lòng thử lại.');
                return;
            }

            // Tạo thông tin người dùng để lưu vào Redux
            const userInfo = {
                email: userData.Email,
                uid: userId, // Sử dụng ID của tài liệu trong Firestore làm uid
                AnhDaiDien: userData.AnhDaiDien || '',
                GioiTinh: userData.GioiTinh || '',
                MaNguoiDung: userData.MaNguoiDung || '',
                NgaySinh: userData.NgaySinh || '',
                Sdt: userData.Sdt || '',
                TenNguoiDung: userData.TenNguoiDung || '',
                VaiTro: userData.VaiTro || '',
                token: 'custom-token-' + userId, // Tạo token giả để tương thích với hệ thống hiện tại
            };

            // Dispatch action login với thông tin người dùng
            dispatch(login(userInfo));
            localStorage.setItem('accessToken', userInfo.token); // Lưu token giả vào localStorage
            navigate('/');
        } catch (error) {
            setErrorMessage('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.');
            console.error('Lỗi đăng nhập:', error);
        }
    };

    // Đăng nhập bằng Google
    const handleGoogleLogin = async () => {
        try {
            const auth = getAuth();
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const idToken = await user.getIdToken();

            // Lấy thông tin người dùng từ Firestore
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('Email', '==', user.email));
            const querySnapshot = await getDocs(q);

            let userInfo = { email: user.email, uid: user.uid, token: idToken };
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    userInfo = {
                        ...userInfo,
                        AnhDaiDien: userData.AnhDaiDien || '',
                        GioiTinh: userData.GioiTinh || '',
                        MaNguoiDung: userData.MaNguoiDung || '',
                        NgaySinh: userData.NgaySinh || '',
                        Sdt: userData.Sdt || '',
                        TenNguoiDung: userData.TenNguoiDung || '',
                        VaiTro: userData.VaiTro || '',
                    };
                });
            }

            dispatch(login(userInfo));
            localStorage.setItem('accessToken', idToken);
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
            const auth = getAuth();
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            const idToken = await user.getIdToken();

            // Lấy thông tin người dùng từ Firestore
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('Email', '==', user.email));
            const querySnapshot = await getDocs(q);

            let userInfo = { email: user.email, uid: user.uid, token: idToken };
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    userInfo = {
                        ...userInfo,
                        AnhDaiDien: userData.AnhDaiDien || '',
                        GioiTinh: userData.GioiTinh || '',
                        MaNguoiDung: userData.MaNguoiDung || '',
                        NgaySinh: userData.NgaySinh || '',
                        Sdt: userData.Sdt || '',
                        TenNguoiDung: userData.TenNguoiDung || '',
                        VaiTro: userData.VaiTro || '',
                    };
                });
            }

            dispatch(login(userInfo));
            localStorage.setItem('accessToken', idToken);
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

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/slices/authSlide';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const AuthListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Người dùng đã đăng nhập
                dispatch(login({ email: user.email, uid: user.uid }));
            } else {
                // Người dùng đã đăng xuất
                dispatch(logout());
            }
        });

        // Hủy lắng nghe khi component unmount
        return () => unsubscribe();
    }, [dispatch]);

    return null; // Component này không cần render gì
};

export default AuthListener;

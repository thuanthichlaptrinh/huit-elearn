import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: null,
        email: '',
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.user = {
                email: action.payload.email,
                // Các thông tin người dùng khác có thể được thêm vào đây
            };
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.email = '';
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

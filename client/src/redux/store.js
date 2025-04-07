import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlide';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

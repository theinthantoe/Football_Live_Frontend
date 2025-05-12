import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { authApi } from './authApi';

const initialState = {
    token: Cookies.get('token') || null, // Initialize from cookie if available
    device_id: null, // Only store device_id if needed
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            Cookies.set('token', action.payload); // Save token to cookies
        },
        setCredentials: (state, action) => {
            const { token, device_id } = action.payload;
            state.token = token;
            state.device_id = device_id; // Update device_id if provided
            Cookies.set('token', token); // Save token to cookies
        },
        logoutAccount: (state) => {
            state.token = null;
            state.device_id = null;
            Cookies.remove('token'); // Remove token from cookies
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.loginAccount.matchFulfilled,
            (state, action) => {
                const token = action.payload?.access_token; // Access token only
                if (token) {
                    state.token = token;
                    Cookies.set('token', token); // Save token to cookies on login
                }
            }
        );
    },
});

export const { setToken, setCredentials, logoutAccount } = authSlice.actions;
export default authSlice.reducer;

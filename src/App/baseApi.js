import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {logoutAccount, setCredentials} from "../pages/Auth/authSlice.js";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://13.213.77.244',
    credentials : "include",
    prepareHeaders :(headers, {getState}) => {
        const  token = getState().auth.token;
        if(token){
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth =async (args,api,extraOptions)=>{
    let result = await baseQuery(args,api,extraOptions);
    if(result.error){
        console.log("Api Errors",result.error)
    }
    if(result.error?.originalStatus === 403){
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        if (refreshResult?.data) {
            const { user } = api.getState().auth; // Access the correct slice
            api.dispatch(setCredentials({ token: refreshResult.data.token, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logoutAccount()); // Log out if refresh fails
        }
    }
    return result;
}
export const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    reducerPath: "baseApi",
    tagTypes: ["Auth","SplashBanners","Admins","Customers","Memberships","Versions"],
    endpoints: () => ({}),
});
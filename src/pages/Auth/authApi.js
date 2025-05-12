import {baseApi} from "../../App/baseApi.js";

const endpoints = '/auth';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        loginAccount: builder.mutation({
            query: (credentials) => ({
                url: `${endpoints}/admin/sign-in`,
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags:["Auth"]
        }),
    })
})

export const { useLoginAccountMutation } = authApi;
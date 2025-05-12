import { baseApi } from "../../App/baseApi.js";

// const endpoints = '/users';

export const customerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: (phoneNumber = '') =>
                phoneNumber.length === 11
                    ? `/users/list?phoneNumber=${phoneNumber}`
                    : '/users/list',
            providesTags: ["Customers"],
        }),

        changeCustomerPassword: builder.mutation({
            query: ({ id, newPassword, confirmPassword }) => ({
                url: `/users/change-password/${id}`,
                method: "PATCH",
                body: { newPassword, confirmPassword },
            }),
            invalidatesTags: ["Customers"],
        }),
    }),
});


export const {
    useGetCustomersQuery,
    useChangeCustomerPasswordMutation,
} = customerApi;

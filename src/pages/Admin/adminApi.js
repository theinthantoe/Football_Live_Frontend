import { baseApi } from "../../App/baseApi";

const endpoints = "/admin";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdmins: builder.query({
            query: () => `${endpoints}/list`,
            providesTags: ["Admins"],
        }),
        createAdmin: builder.mutation({
            query: (body) => ({
                url: `${endpoints}/create`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Admins"],
        }),
        updateAdmin: builder.mutation({
            query: ({ id, body }) => ({
                url: `${endpoints}/update/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Admins"],
        }),

        changePwd: builder.mutation({
            query: ({ id, body }) => ({
                url: `${endpoints}/change-password/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Admins"],
        }),
        deleteAdmin: builder.mutation({
            query: (id) => ({
                url: `${endpoints}/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Admins"],
        }),
        getAdminById: builder.query({
            query: (id) => `${endpoints}/get/${id}`,
            providesTags: ["Admins"],
        }),
    }),
});

export const {
    useGetAdminsQuery,
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
    useGetAdminByIdQuery,
    useChangePwdMutation,
} = adminApi;

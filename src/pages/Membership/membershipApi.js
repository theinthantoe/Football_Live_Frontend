// membershipApi.js
import { baseApi } from "../../App/baseApi.js";

const endpoints = '/membership';

export const membershipApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createMembership: builder.mutation({
            query: (body) => ({
                url: `${endpoints}/create`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Memberships"],
        }),
        updateMembership: builder.mutation({
            query: ({ id, formData }) => ({
                url: `${endpoints}/update/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Memberships"],
        }),
        getMemberships: builder.query({
            query: () => `${endpoints}/list`,
            providesTags: ["Memberships"],
        }),
    }),
});

export const {
    useCreateMembershipMutation,
    useUpdateMembershipMutation,
    useGetMembershipsQuery
} = membershipApi;

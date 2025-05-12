import { baseApi } from "../../App/baseApi.js";

const endpoints = "/version-control";

export const versionControlApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createVersion: builder.mutation({
            query: (body) => ({
                url: `${endpoints}/create`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Versions"],
        }),
        updateVersion: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `${endpoints}/update/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Versions"],
        }),
        getVersions: builder.query({
            query: () => `${endpoints}/list`,
            providesTags: ["Versions"],
        }),
    }),
});

export const {
    useCreateVersionMutation,
    useUpdateVersionMutation,
    useGetVersionsQuery,
} = versionControlApi;

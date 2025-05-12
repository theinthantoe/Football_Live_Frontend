// splashBannerApi.js
import { baseApi } from "../../App/baseApi.js";

const endpoints = '/splash-banners';

export const splashBannerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSplashBanner: builder.mutation({
            query: (body) => ({
                url: `${endpoints}/create`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["SplashBanners"],
        }),
        updateSplashBanner: builder.mutation({
            query: ({ id, formData }) => ({
                url: `${endpoints}/update/${id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["SplashBanners"],
        }),

        // Optional: Only add if backend supports it
        getSplashBanners: builder.query({
            query: () => `${endpoints}/list`,
            providesTags: ["SplashBanners"],
        }),
        deleteSplashBanner: builder.mutation({
            query: (id) => ({
                url: `${endpoints}/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["SplashBanners"],
        }),
    }),
});

export const {
    useCreateSplashBannerMutation,
    useUpdateSplashBannerMutation,
    useGetSplashBannersQuery, // only use if GET is available
    useDeleteSplashBannerMutation,
} = splashBannerApi;

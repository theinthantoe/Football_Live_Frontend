import {
    useGetSplashBannersQuery,
    useDeleteSplashBannerMutation
} from "../Splash Banner/splashbannerApi.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SplashBannerList() {
    const { data, isLoading, error } = useGetSplashBannersQuery();
    const [deleteBanner] = useDeleteSplashBannerMutation();
    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState(null);


    const banners = data?.data || [];
    const handleDelete = async (id) => {
        try {
            setDeletingId(id);
            await deleteBanner(id).unwrap();
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setDeletingId(null);
        }
    };


    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-semibold">Splash Banners</h1>
                <button
                    onClick={() => navigate("/add-banner")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Add New Banner
                </button>
            </div>

            <table className="w-full bg-white shadow rounded dark:bg-slate-800 dark:text-white">
                <thead >
                <tr className="bg-gray-100 text-left dark:bg-slate-800 dark:text-white">
                    <th className="p-3">#</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Text</th>
                    <th className="p-3">Image</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? (
                    <tr>
                        <td className="p-4" colSpan="5">Loading...</td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td className="p-4 text-red-500" colSpan="5">Failed to load banners.</td>
                    </tr>
                ) : banners.length === 0 ? (
                    <tr>
                        <td className="p-4" colSpan="5">No banners found.</td>
                    </tr>
                ) : (
                    banners.map((banner, index) => (
                        <tr key={banner.id} className="border-t">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{banner.type}</td>
                            <td className="p-3">{banner.text}</td>
                            <td className="p-3 space-x-2">
                                {Array.isArray(banner.image) ? (
                                    banner.image.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`banner-${idx}`}
                                            className="inline-block w-5 h-5 object-cover rounded"
                                        />
                                    ))
                                ) : banner.image ? (
                                    <img
                                        src={banner.image}
                                        alt="banner"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                ) : (
                                    <span className="text-gray-400">No Image</span>
                                )}
                            </td>
                            <td className="p-3">{banner.duration}</td>
                            <td className="p-3">
                                <button
                                    onClick={() => navigate(`/edit-banner/${banner.id}`)}
                                    className="text-blue-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(banner.id)}
                                    className="text-red-500"
                                    disabled={deletingId === banner.id}
                                >
                                    {deletingId === banner.id ? "Deleting..." : "Delete"}
                                </button>

                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

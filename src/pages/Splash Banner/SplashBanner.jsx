import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateSplashBannerMutation,
    useUpdateSplashBannerMutation,
    useGetSplashBannersQuery
} from "../Splash Banner/splashbannerApi.js";

const types = ["splash_banner", "home_banner", "text_banner", "player_banner"];

export default function SplashBannerForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data } = useGetSplashBannersQuery();
    const banners = data?.data || [];
    const existing = banners?.find((b) => b.id === id);

    const [form, setForm] = useState({
        type: "splash_banner",
        text: "",
        duration: "",
        images: [],
    });

    const [createBanner, { isLoading: isCreating }] = useCreateSplashBannerMutation();
    const [updateBanner, { isLoading: isUpdating }] = useUpdateSplashBannerMutation();


    useEffect(() => {
        if (existing) {
            setForm({
                type: existing.type,
                text: existing.text,
                duration: existing.duration,
                images: [],
            });
        }
    }, [existing]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (index, file) => {
        const updated = [...form.images];
        updated[index] = file;
        setForm({ ...form, images: updated });
    };

    const handleAddImage = () => {
        setForm({ ...form, images: [...form.images, null] });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("type", form.type);
        formData.append("text", form.text);
        formData.append("duration", form.duration);

        if (id) {
            // 🔄 Update - only first image
            if (form.images[0]) {
                formData.append("image", form.images[0]); // single field name
            }
        } else {
            // ➕ Create - multiple images allowed
            form.images.forEach((file) => {
                if (file) formData.append("images", file); // consistent field name
            });
        }

        for (let pair of formData.entries()) {
            console.log(`${pair[0]}:`, pair[1]);
        }

        try {
            if (id) {
                await updateBanner({ id, formData }).unwrap();
            } else {
                await createBanner(formData).unwrap();
            }
            navigate("/");
        } catch (err) {
            console.error("Submit failed:", err);
        }
    };


    return (
        <div className="p-6 bg-white shadow rounded w-full max-w-2xl mx-auto dark:bg-slate-800 dark:text-white">
            <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Splash Banner</h2>
            <div className="grid grid-cols-1 gap-4">
                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="border p-2 rounded"
                >
                    {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="text"
                    placeholder="Text"
                    value={form.text}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    name="duration"
                    placeholder="Duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />
                <div>
                    <label className="block font-medium mb-1">Upload Images</label>
                    {form.images.map((_, index) => (
                        <input
                            key={index}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e.target.files[0])}
                            className="mb-2"
                        />
                    ))}
                    <button type="button" onClick={handleAddImage} className="text-blue-600 text-sm mt-2">
                        + Add Image
                    </button>
                </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => navigate("/")} className="bg-gray-200 px-4 py-2 rounded">
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={isCreating || isUpdating}
                >
                    {(isCreating || isUpdating)
                        ? (id ? "Updating" : "Adding")
                        : (id ? "Update" : "Add")} Banner
                </button>

            </div>
        </div>
    );
}

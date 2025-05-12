import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateVersionMutation,
    useUpdateVersionMutation,
    useGetVersionsQuery
} from "./versionControlApi.js";

export default function VersionControlForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useGetVersionsQuery();
    const versions = data?.data || [];
    const existing = versions.find(v => v.id === id);

    const [form, setForm] = useState({
        ios_title: "",
        ios_slogan: "",
        ios_version: "",
        ios_buildNumber: "",
        ios_appStoreLink: "",
        android_title: "",
        android_slogan: "",
        android_version: "",
        android_buildNumber: "",
        android_playStoreLink: "",
    });

    const [createVersion, { isLoading: isCreating }] = useCreateVersionMutation();
    const [updateVersion, { isLoading: isUpdating }] = useUpdateVersionMutation();

    useEffect(() => {
        if (existing) {
            setForm({
                ios_title: existing.ios?.title || "",
                ios_slogan: existing.ios?.slogan || "",
                ios_version: existing.ios?.version || "",
                ios_buildNumber: existing.ios?.buildNumber || "",
                ios_appStoreLink: existing.ios?.appStoreLink || "",
                android_title: existing.android?.title || "",
                android_slogan: existing.android?.slogan || "",
                android_version: existing.android?.version || "",
                android_buildNumber: existing.android?.buildNumber || "",
                android_playStoreLink: existing.android?.playStoreLink || "",
            });
        }
    }, [existing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // Prepare the payload data as JSON for both iOS and Android
        const payload = {
            ios: {
                title: form.ios_title,
                slogan: form.ios_slogan,
                version: form.ios_version,
                buildNumber: Number(form.ios_buildNumber),
                appStoreLink: form.ios_appStoreLink,
            },
            android: {
                title: form.android_title,
                slogan: form.android_slogan,
                version: form.android_version,
                buildNumber: Number(form.android_buildNumber),
                playStoreLink: form.android_playStoreLink,
            }
        };

        try {
            if (id) {
                // If `id` exists, update the version control data
                await updateVersion({ id, ...payload }).unwrap();
            } else {
                // If `id` does not exist, create new version control data
                await createVersion(payload).unwrap();
            }
            navigate("/version-control");  // Redirect to the home page or versions list after submission
        } catch (err) {
            console.error("Submit error:", err);
        }
    };

    return (
        <div className="p-6 bg-white shadow rounded max-w-xl mx-auto dark:bg-slate-800 dark:text-white">
            <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Version</h2>
            <div className="space-y-4 text-sm">
                <h3 className="font-semibold">iOS</h3>
                <input name="ios_title" value={form.ios_title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
                <input name="ios_slogan" value={form.ios_slogan} onChange={handleChange} placeholder="Slogan" className="w-full p-2 border rounded" />
                <input name="ios_version" value={form.ios_version} onChange={handleChange} placeholder="Version" className="w-full p-2 border rounded" />
                <input name="ios_buildNumber" value={form.ios_buildNumber} onChange={handleChange} placeholder="Build Number" type="number" className="w-full p-2 border rounded" />
                <input name="ios_appStoreLink" value={form.ios_appStoreLink} onChange={handleChange} placeholder="App Store Link" className="w-full p-2 border rounded" />

                <h3 className="font-semibold mt-4">Android</h3>
                <input name="android_title" value={form.android_title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
                <input name="android_slogan" value={form.android_slogan} onChange={handleChange} placeholder="Slogan" className="w-full p-2 border rounded" />
                <input name="android_version" value={form.android_version} onChange={handleChange} placeholder="Version" className="w-full p-2 border rounded" />
                <input name="android_buildNumber" value={form.android_buildNumber} onChange={handleChange} placeholder="Build Number" type="number" className="w-full p-2 border rounded" />
                <input name="android_playStoreLink" value={form.android_playStoreLink} onChange={handleChange} placeholder="Play Store Link" className="w-full p-2 border rounded" />
            </div>

            <div className="mt-4 flex justify-end gap-2 text-sm">
                <button onClick={() => navigate("/version-control")} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
                <button
                    onClick={handleSubmit}
                    disabled={isCreating || isUpdating}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {isCreating || isUpdating ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

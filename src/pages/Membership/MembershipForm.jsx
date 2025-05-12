import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateMembershipMutation,
    useUpdateMembershipMutation,
    useGetMembershipsQuery
} from "./membershipApi.js";

export default function MembershipForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useGetMembershipsQuery();
    const memberships = data?.data || [];
    const existing = memberships.find(m => m.id === id);

    const [form, setForm] = useState({
        title: "",
        slogan: "",
        telegram_link: "",
        viber_link: "",
    });

    const [telegramIcon, setTelegramIcon] = useState(null);
    const [viberIcon, setViberIcon] = useState(null);

    const [createMembership, { isLoading: isCreating }] = useCreateMembershipMutation();
    const [updateMembership, { isLoading: isUpdating }] = useUpdateMembershipMutation();

    useEffect(() => {
        if (existing) {
            setForm({
                title: existing.title,
                slogan: existing.slogan,
                telegram_link: existing.telegram?.link || "",
                viber_link: existing.viber?.link || "",
            });
        }
    }, [existing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("slogan", form.slogan);

        formData.append("telegram", JSON.stringify({ link: form.telegram_link }));
        formData.append("viber", JSON.stringify({ link: form.viber_link }));

        if (telegramIcon) formData.append("telegram.icon", telegramIcon);
        if (viberIcon) formData.append("viber.icon", viberIcon);

        try {
            if (id) {
                await updateMembership({ id, formData }).unwrap();
            } else {
                await createMembership(formData).unwrap();
            }
            navigate("/membership");
        } catch (err) {
            console.error("Submit error:", err);
        }
    };


    return (
        <div className="p-6 bg-white shadow rounded max-w-xl mx-auto dark:bg-slate-800 dark:text-white">
            <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Membership</h2>
            <div className="space-y-4 text-sm">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="slogan"
                    placeholder="Slogan"
                    value={form.slogan}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    name="telegram_link"
                    placeholder="Telegram Link"
                    value={form.telegram_link}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setTelegramIcon(e.target.files[0])}
                    className="w-full p-2 border rounded"
                />

                <input
                    type="text"
                    name="viber_link"
                    placeholder="Viber Link"
                    value={form.viber_link}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setViberIcon(e.target.files[0])}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mt-4 flex justify-end gap-2 text-sm">
                <button onClick={() => navigate("/membership")} className="bg-gray-200 px-4 py-2 rounded">Cancel</button>
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

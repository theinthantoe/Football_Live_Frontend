import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useGetAdminByIdQuery,
} from "./adminApi";

const roles = ["admin", "staff"];

export default function AdminForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "admin",
    });

    const { data } = useGetAdminByIdQuery(id, { skip: !id });
    const [createAdmin] = useCreateAdminMutation();
    const [updateAdmin] = useUpdateAdminMutation();

    useEffect(() => {
        if (data?.data) {
            const { name, email, role } = data.data;
            setForm({ name, email,  role });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (id) {
                await updateAdmin({ id, body: form }).unwrap();
            } else {
                await createAdmin(form).unwrap();
            }
            navigate("/admin");
        } catch (error) {
            console.error("Submission error:", error);
        }
    };

    return (
        <div className="p-6 bg-white rounded shadow max-w-xl mx-auto dark:bg-slate-800 dark:text-white">
            <h2 className="text-xl font-bold mb-4">{id ? "Edit" : "Add"} Admin</h2>
            <div className="space-y-4 text-sm">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full border p-2 rounded dark:bg-slate-800 dark:text-white"
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full border p-2 rounded dark:bg-slate-800 dark:text-white"
                />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full border p-2 rounded dark:bg-slate-800 dark:text-white"
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
            <div className="mt-4 flex justify-end gap-2 text-sm">
                <button onClick={() => navigate("/admin")} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">
                    {id ? "Update" : "Create"}
                </button>
            </div>
        </div>
    );
}

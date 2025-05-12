import { useNavigate } from "react-router-dom";
import {
    useGetAdminsQuery,
    useDeleteAdminMutation,
} from "./adminApi";
import { useState } from "react";

export default function AdminList() {
    const { data, isLoading } = useGetAdminsQuery();
    const [deleteAdmin] = useDeleteAdminMutation();
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();

    const admins = data?.data || [];

    const handleDelete = async (id) => {
        try {
            setDeletingId(id);
            await deleteAdmin(id).unwrap();
        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-semibold">Admins</h1>
                <button onClick={() => navigate("/add-admin")} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                    + Add Admin
                </button>
            </div>

            <table className="w-full bg-white shadow rounded">
                <thead>
                <tr className="bg-gray-100 text-left text-sm dark:bg-slate-800 dark:text-white" >
                    <th className="p-3">#</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody className={'text-sm dark:bg-slate-800 dark:text-white'}>
                {isLoading ? (
                    <tr>
                        <td colSpan="5" className="p-4">Loading...</td>
                    </tr>
                ) : admins.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="p-4">No admins found.</td>
                    </tr>
                ) : (
                    admins.map((admin, index) => (
                        <tr key={admin.id} className="border-t">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{admin.name}</td>
                            <td className="p-3">{admin.email}</td>
                            <td className="p-3">{admin.role}</td>
                            <td className="p-3">
                                <button onClick={() => navigate(`/edit-admin/${admin.id}`)} className="text-blue-600 mr-2">Edit</button>
                                <button
                                    onClick={() => handleDelete(admin.id)}
                                    className="text-red-500"
                                    disabled={deletingId === admin.id}
                                >
                                    {deletingId === admin.id ? "Deleting..." : "Delete"}
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

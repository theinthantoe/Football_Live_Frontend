import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Pencil, Eye, EyeOff } from "lucide-react";
import {
    useGetAdminByIdQuery,
    useUpdateAdminMutation,
    useChangePwdMutation,
} from "@/pages/Admin/adminApi.js";

export default function AccountSetting() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("profile");
    const { data } = useGetAdminByIdQuery(id, { skip: !id });
    const [updateAdmin] = useUpdateAdminMutation();
    const [changePwd] = useChangePwdMutation();
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [showPwd, setShowPwd] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [errors, setErrors] = useState({});

    const handleEditClick = () => {
        setEditMode(true);
        setFormData({
            name: data?.data?.name || "",
            email: data?.data?.email || "",
        });
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setFormData({ name: "", email: "" });
    };

    const handleSaveClick = async () => {
        try {
            await updateAdmin({ id, body: formData }).unwrap();
            setEditMode(false);
            navigate(`/account-setting/${id}`);
        } catch (error) {
            console.error("Failed to update admin", error);
        }
    };

    const handlePwdChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handlePwdSave = async () => {
        setErrors({});

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        try {
            await changePwd({
                id,
                body: {
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                    confirmPassword: passwordData.confirmPassword,
                },
            }).unwrap();


            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            navigate(`/account-setting/${id}`);
        } catch (error) {
            const backendErrors = error?.data?.message || [];
            const fieldErrors = {};
            backendErrors.forEach((msg) => {
                const [field, ...rest] = msg.split(" ");
                fieldErrors[field] = msg;
            });
            setErrors(fieldErrors);
        }
    };

    return (
        <>
            <button
                onClick={() => window.history.back()}
                className="text-sm text-blue-600 hover:underline"
            >
                ← Back
            </button>

            <h1 className="text-2xl font-bold">Account Setting</h1>
            <div className="flex flex-col p-6 md:flex-row gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-64">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`w-full px-4 py-2 mb-2 rounded font-medium text-left ${
                            activeTab === "profile"
                                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm"
                                : "bg-gray-100 dark:bg-slate-800 dark:text-white text-sm"
                        }`}
                    >
                        Profile Information
                    </button>
                    <button
                        onClick={() => setActiveTab("password")}
                        className={`w-full px-4 py-2 rounded font-medium text-left ${
                            activeTab === "password"
                                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm"
                                : "bg-gray-100 dark:bg-slate-800 dark:text-white text-sm"
                        }`}
                    >
                        Change Password
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-4">
                    {activeTab === "profile" ? (
                        <div className="relative rounded-xl bg-white p-6 shadow dark:bg-slate-800">
                            {editMode ? (
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button
                                        onClick={handleSaveClick}
                                        className="text-green-600 hover:text-green-800 text-sm"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelClick}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
                                    onClick={handleEditClick}
                                >
                                    <Pencil size={20} />
                                </button>
                            )}

                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                    <div>
                                        <label className="block text-sm text-gray-600 dark:text-gray-300">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={editMode ? formData.name : data?.data?.name}
                                            disabled={!editMode}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="mt-1 w-full rounded border text-sm border-gray-300 px-3 py-2 text-gray-700 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-600 dark:text-gray-300">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            value={editMode ? formData.email : data?.data?.email}
                                            disabled={!editMode}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="mt-1 w-full rounded text-sm border border-gray-300 px-3 py-2 text-gray-700 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl bg-white p-6 shadow dark:bg-slate-800">
                            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { label: "Current Password", name: "currentPassword", key: "current" },
                                    { label: "New Password", name: "newPassword", key: "new" },
                                    { label: "Confirm Password", name: "confirmPassword", key: "confirm" },
                                ].map((field) => (
                                    <div key={field.name} className="relative">
                                        <label className="block text-sm text-gray-600 dark:text-gray-300">
                                            {field.label}
                                        </label>
                                        <input
                                            type={showPwd[field.key] ? "text" : "password"}
                                            name={field.name}
                                            value={passwordData[field.name]}
                                            onChange={handlePwdChange}
                                            className={`mt-1 w-full rounded border text-sm px-3 py-2 pr-10 
                                                ${
                                                errors[field.name]
                                                    ? "border-red-500"
                                                    : "border-gray-300 dark:border-slate-600"
                                            } 
                                                dark:bg-slate-700 dark:text-white`}
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-9 right-3 text-gray-500"
                                            onClick={() =>
                                                setShowPwd((prev) => ({
                                                    ...prev,
                                                    [field.key]: !prev[field.key],
                                                }))
                                            }
                                        >
                                            {showPwd[field.key] ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                        {errors[field.name] && (
                                            <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handlePwdSave}
                                className="mt-6 px-6 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

import { useState } from "react";
import { useChangeCustomerPasswordMutation } from "./customerApi";
import { Eye, EyeOff } from "lucide-react"; // if using lucide-react

export function ChangePasswordButton({ customerId }) {
    const [showModal, setShowModal] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [changePassword, { isLoading }] = useChangeCustomerPasswordMutation();

    const handleSubmit = async () => {
        try {
            await changePassword({ id: customerId, newPassword, confirmPassword }).unwrap();
            alert("Password changed successfully");
            setShowModal(false);
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            alert("Failed to change password");
        }
    };

    return (
        <>
            <button onClick={() => setShowModal(true)} className="text-blue-600 text-sm">
                Change Password
            </button>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow w-full max-w-sm space-y-4 dark:bg-slate-800 dark:text-white">
                        <h3 className="text-lg font-bold">Change Password</h3>

                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border p-2 pr-10 rounded"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border p-2 pr-10 rounded"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                {isLoading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

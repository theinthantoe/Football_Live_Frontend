import { useState, useEffect } from "react";
import { useGetCustomersQuery } from "./customerApi";
import { ChangePasswordButton } from "@/pages/Customer/CustomerForm.jsx";

export default function CustomerList() {
    const [search, setSearch] = useState("");
    const [searchParam, setSearchParam] = useState("");

    // Handle phone number filter based on length
    useEffect(() => {
        if (search.length === 11) {
            setSearchParam(search); // filter
        } else {
            setSearchParam(""); // fetch all
        }
    }, [search]);

    const { data, isLoading } = useGetCustomersQuery(searchParam);
    const customers = data?.data || [];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4 ">
                <h2 className="text-xl font-semibold">Customers</h2>
                <input
                    type="text"
                    placeholder="Search by phone number"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded w-64 dark:bg-slate-800 dark:text-white text-sm"
                />
            </div>

            <table className="w-full bg-white shadow text-sm rounded dark:bg-slate-800 dark:text-white ">
                <thead className="bg-gray-100 text-left dark:bg-slate-800 dark:text-white text-sm">
                <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Phone Number</th>
                    <th className="p-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? (
                    <tr><td colSpan="4" className="p-4">Loading...</td></tr>
                ) : customers.length === 0 ? (
                    <tr><td colSpan="4" className="p-4">No customers found.</td></tr>
                ) : (
                    customers.map((c, i) => (
                        <tr key={c.id} className="border-t " >
                            <td className="p-3">{i + 1}</td>
                            <td className="p-3">{c.username}</td>
                            <td className="p-3">{c.phoneNumber}</td>
                            <td className="p-3">
                                <ChangePasswordButton customerId={c.id} />
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}

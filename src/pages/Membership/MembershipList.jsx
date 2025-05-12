import { useGetMembershipsQuery } from "./membershipApi.js";
import { useNavigate } from "react-router-dom";

export default function MembershipList() {
    const { data, isLoading, error } = useGetMembershipsQuery();
    const navigate = useNavigate();
    console.log(data);
    const memberships = data?.data || [];

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-between">
                <h1 className="text-2xl font-semibold">Memberships</h1>
                <button
                    onClick={() => navigate("/add-membership")}
                    className="rounded bg-blue-600 px-4 py-2 text-white text-sm"
                >
                    + Add New
                </button>
            </div>

            <table className="w-full rounded bg-white text-sm shadow">
                <thead>
                    <tr className="bg-gray-100 text-left dark:bg-slate-800 dark:text-white">
                        <th className="p-3">#</th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Slogan</th>
                        <th className="p-3">Telegram</th>
                        <th className="p-3">Viber</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm dark:bg-slate-800 dark:text-white">
                    {isLoading ? (
                        <tr>
                            <td
                                className="p-4"
                                colSpan="6"
                            >
                                Loading...
                            </td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td
                                className="p-4 text-red-500"
                                colSpan="6"
                            >
                                Failed to load.
                            </td>
                        </tr>
                    ) : memberships.length === 0 ? (
                        <tr>
                            <td
                                className="p-4"
                                colSpan="6"
                            >
                                No memberships found.
                            </td>
                        </tr>
                    ) : (
                        memberships.map((m, index) => (
                            <tr
                                key={m.id}
                                className="border-t"
                            >
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{m.title}</td>
                                <td className="p-3">{m.slogan}</td>

                                <td className="p-3">
                                    <a
                                        href={m.telegram.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={m.telegram.icon}
                                            alt="Telegram"
                                            className="mr-1 inline h-5 w-5"
                                        />
                                        <span>{m.telegram.link}</span>
                                    </a>
                                </td>

                                <td className="p-3">
                                    <a
                                        href={m.telegram.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            src={m.viber.icon}
                                            alt="Telegram"
                                            className="mr-1 inline h-5 w-5"
                                        />
                                        <span>{m.viber.link}</span>
                                    </a>
                                </td>

                                <td className="p-3">
                                    <button
                                        onClick={() => navigate(`/edit-membership/${m.id}`)}
                                        className="text-sm text-blue-600"
                                    >
                                        Edit
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

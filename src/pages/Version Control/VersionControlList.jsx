import { useGetVersionsQuery } from "./versionControlApi.js";
import { useNavigate } from "react-router-dom";

export default function VersionControlList() {
    const { data, isLoading, error } = useGetVersionsQuery();
    const navigate = useNavigate();
    const versions = data?.data || [];

    return (
        <div className="p-6">
            <div className="mb-4 flex justify-between">
                <h1 className="text-2xl font-semibold">Version Control</h1>
                <button
                    onClick={() => navigate("/add-version")}
                    className="rounded bg-blue-600 px-4 py-2 text-white text-sm"
                >
                    + Add New
                </button>
            </div>

            <div className="overflow-auto">
                <table className="min-w-full rounded bg-white text-sm shadow">
                    <thead>
                    <tr className="bg-gray-100 text-left dark:bg-slate-800 dark:text-white">
                        <th className="p-3">#</th>
                        <th className="p-3">iOS Title</th>
                        <th className="p-3">iOS Version</th>
                        <th className="p-3">iOS Build</th>
                        <th className="p-3">App Store Link</th>
                        <th className="p-3">Android Title</th>
                        <th className="p-3">Android Version</th>
                        <th className="p-3">Android Build</th>
                        <th className="p-3">Play Store Link</th>
                        <th className="p-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody className={"dark:bg-slate-800 dark:text-white"}>
                    {isLoading ? (
                        <tr><td className="p-4" colSpan="10">Loading...</td></tr>
                    ) : error ? (
                        <tr><td className="p-4 text-red-500" colSpan="10">Failed to load.</td></tr>
                    ) : versions.length === 0 ? (
                        <tr><td className="p-4" colSpan="10">No versions found.</td></tr>
                    ) : (
                        versions.map((v, index) => (
                            <tr key={v.id} className="border-t">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{v.ios?.title}</td>
                                <td className="p-3">{v.ios?.version}</td>
                                <td className="p-3">{v.ios?.buildNumber}</td>
                                <td className="p-3">
                                    <a
                                        href={v.ios?.appStoreLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        App Store
                                    </a>
                                </td>
                                <td className="p-3">{v.android?.title}</td>
                                <td className="p-3">{v.android?.version}</td>
                                <td className="p-3">{v.android?.buildNumber}</td>
                                <td className="p-3">
                                    <a
                                        href={v.android?.playStoreLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Play Store
                                    </a>
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => navigate(`/edit-version/${v.id}`)}
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
        </div>
    );
}

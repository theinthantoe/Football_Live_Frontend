import { useTheme } from "@/hooks/use-theme";
import { ChevronsLeft, Moon, Sun , Settings ,LogOut} from "lucide-react";
import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


export const Header = ({ collapsed, setCollapsed }) => {
    const { theme, setTheme } = useTheme();
    const [showAccount, setShowAccount] = useState(false);

    const navigate = useNavigate();

    const { userName, userId } = useMemo(() => {
        const token = Cookies.get("token");
        if (!token) return { userName: null, userId: null };
        try {
            const decoded = jwtDecode(token);
            return {
                userName: decoded?.name || "User",
                userId: decoded?.sub || null,
            };
        } catch (e) {
            console.error("Invalid token", e);
            return { userName: "User", userId: null };
        }
    }, []);

    return (
        <header className="relative z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900">
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed && "rotate-180"} />
                </button>
            </div>
            <div className="flex items-center gap-x-3">
                <button
                    className="btn-ghost size-10 border px-1"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    <Sun size={20} className="dark:hidden" />
                    <Moon size={20} className="hidden dark:block" />
                </button>

                {/* Show user name instead of profile image */}
                <button
                    className="rounded border px-3 py-1 font-medium text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                    onClick={() => setShowAccount(!showAccount)}
                >
                    {userName}
                </button>

                {showAccount && (
                    <div
                        className="w-48 absolute right-4 top-[60px] z-20 rounded bg-white p-2   shadow dark:bg-slate-800">
                        <h1 className={'text-md font-bold'}>My Account</h1>
                        <div
                            className="flex items-center gap-x-3 p-1 my-2 rounded cursor-pointer dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                            onClick={() => {
                                if (userId) {
                                    navigate(`/account-setting/${userId}`);
                                    setShowAccount(false);
                                }
                            }}
                        >
                            <Settings size={20} />
                            <h2>Setting</h2>
                        </div>

                        <div
                            className="flex items-center gap-x-3 p-1 my-2 rounded cursor-pointer dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                            onClick={() => {
                                Cookies.remove("token");
                                navigate("/login");
                            }}
                        >
                            <LogOut size={20} />
                            <h2>Logout</h2>
                        </div>

                    </div>
                )}
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
};

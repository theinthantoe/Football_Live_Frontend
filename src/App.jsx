// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import LoginForm from "@/pages/Auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import SplashBannerList from "@/pages/Splash Banner/SplashBannerList.jsx";
import SplashBannerForm from "@/pages/Splash Banner/SplashBanner.jsx";
import MembershipList from "@/pages/Membership/MembershipList.jsx";
import MembershipForm from "@/pages/Membership/MembershipForm.jsx";
import VersionControlList from "@/pages/Version Control/VersionControlList.jsx";
import VersionControlForm from "@/pages/Version Control/VersionControlForm.jsx";
import AdminList from "@/pages/Admin/AdminList.jsx";
import AdminForm from "@/pages/Admin/AdminForm.jsx";
import AccountSetting from "@/pages/Admin/AccountSetting.jsx";
import CustomerList from "@/pages/Customer/CustomerList.jsx";


const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginForm />,
    },
    {
        element: <ProtectedRoute />, // 🔐 Wrap all authenticated routes
        children: [
            {
                path: "/",
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <SplashBannerList/>, // dashboard
                    },

                    {
                        path: "/add-banner",
                        element:<SplashBannerForm />,
                    },
                    {
                        path: "/edit-banner/:id",
                        element: <SplashBannerForm />,
                    },
                    {
                        path: "membership",
                        element: <h1 className="title"><MembershipList/></h1>,
                    },
                    {
                        path: "/add-membership",
                        element: <h1 className="title"><MembershipForm/></h1>,
                    },
                    {
                        path: "/edit-membership/:id",
                        element: <h1 className="title"><MembershipForm/></h1>,
                    },
                    {
                        path: "customers",
                        element: <h1 className="title"><CustomerList/></h1>,
                    },
                    {
                        path: "admin",
                        element: <h1 className="title"><AdminList/></h1>,
                    },
                    {
                        path: "add-admin",
                        element: <h1 className="title"><AdminForm/></h1>,
                    },
                    {
                        path: "edit-admin/:id",
                        element: <h1 className="title"><AdminForm/></h1>,
                    },
                    {
                        path: "version-control",
                        element: <h1 className="title"><VersionControlList/></h1>,
                    },
                    {
                        path: "add-version",
                        element: <h1 className="title"><VersionControlForm/></h1>,
                    },
                    {
                        path: "/edit-version/:id",
                        element: <h1 className="title"><VersionControlForm/></h1>,
                    },
                    {
                        path: "/account-setting/:id",
                        element: <h1 className="title"><AccountSetting/></h1>,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;

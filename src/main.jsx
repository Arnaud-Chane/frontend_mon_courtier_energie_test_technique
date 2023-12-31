import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./main.scss";

import Layout from "./layout/Layout";

import UserInfoProvider from "./context/UserRoleContext";

import PrivateRoutes from "./utils/PrivateRoutes";
import userRoles from "./utils/constantRoles";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import TaskDetailPage from "./pages/TaskDetailPage";
import Page403 from "./pages/Page403";
import Page404 from "./pages/Page404";
import Page500 from "./pages/Page500";
import UserListPage from "./pages/admin/UserListPage";
import UserDetailPage from "./pages/admin/UserDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: (
          <PrivateRoutes expectedRoles={[userRoles.admin, userRoles.user]}>
            <HomePage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoutes expectedRoles={[userRoles.admin, userRoles.user]}>
            <ProfilePage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/task/:id",
        element: (
          <PrivateRoutes expectedRoles={[userRoles.admin, userRoles.user]}>
            <TaskDetailPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/no-access",
        element: <Page403 />,
      },
      {
        path: "/server-error",
        element: <Page500 />,
      },
      {
        path: "*",
        element: <Page404 />,
      },
      {
        path: "/admin",
        children: [
          {
            index: true,
            element: <Navigate to="/admin/user" replace />,
          },
          {
            path: "user",
            element: (
              <PrivateRoutes expectedRoles={[userRoles.admin]}>
                <UserListPage />
              </PrivateRoutes>
            ),
          },
          {
            path: "user/:id",
            element: (
              <PrivateRoutes expectedRoles={[userRoles.admin]}>
                <UserDetailPage />
              </PrivateRoutes>
            ),
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserInfoProvider>
      <RouterProvider router={router} />
    </UserInfoProvider>
  </React.StrictMode>
);

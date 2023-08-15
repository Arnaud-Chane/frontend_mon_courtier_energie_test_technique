import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./main.scss";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import TaskDetailPage from "./pages/TaskDetailPage";
import Page403 from "./pages/Page403";
import Page404 from "./pages/Page404";
import UserListPage from "./pages/admin/UserListPage";
import UserDetail from "./pages/admin/UserDetail";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <HomePage />,
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
        element: <ProfilePage />,
      },
      {
        path: "/task/:id",
        element: <TaskDetailPage />,
      },
      {
        path: "/no-access",
        element: <Page403 />,
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
            element: <UserListPage />,
          },
          {
            path: "user/:id",
            element: <UserDetail />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

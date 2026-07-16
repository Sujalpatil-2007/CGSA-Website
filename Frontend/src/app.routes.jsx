import { createBrowserRouter } from "react-router";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

import Protected from "./features/auth/components/Protected";

import Home from "./features/home/pages/Home";

import Articles from "./features/Article/pages/Articles";
import PublishArticles from "./features/Article/pages/PublishArticles";
import SingleArticlePage from "./features/Article/pages/SingleArticlePage";
import EditArticle from "./features/Article/pages/EditArticle";

import Timeline from "./features/timeline/page/Timeline";
import AboutUs from "./features/aboutUs/pages/AboutUs";
import Contact from "./features/Contact/page/Contact";

import AdminLayout from "./features/admin/layouts/AdminLayouts";
import Dashboard from "./features/admin/pages/Dashboard";
import AdminArticles from "./features/admin/pages/AdminArticles";
import ReviewArticle from "./features/admin/pages/ReviewArticle";
import AdminProtected from "./features/admin/components/AdminProtected";
import MyArticles from "./features/Article/pages/MyArticles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/articles",
    element: <Articles />,
  },

  {
    path: "/articles/:id",
    element: <SingleArticlePage />,
  },

  {
    path: "/publisharticles",
    element: (
      <Protected>
        <PublishArticles />
      </Protected>
    ),
  },

  {
    path: "/articles/edit/:id",
    element: (
      <Protected>
        <EditArticle />
      </Protected>
    ),
  },
  {
    path: "/my-articles",
    element: (
      <Protected>
        <MyArticles />
      </Protected>
    ),
  },

  {
    path: "/timeline",
    element: <Timeline />,
  },

  {
    path: "/aboutUs",
    element: <AboutUs />,
  },

  {
    path: "/contact",
    element: <Contact />,
  },

  // =========================
  // Admin Routes
  // =========================

  {
    path: "/admin",
    element: (
      <AdminProtected>
        <AdminLayout />
      </AdminProtected>
    ),

    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "articles",
        element: <AdminArticles />,
      },

      {
        path: "articles/:id",
        element: <ReviewArticle />,
      },
    ],
  },
]);

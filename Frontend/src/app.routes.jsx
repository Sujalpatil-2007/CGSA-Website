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
import AdminArticles from "./features/admin/pages/AdminArticles"
import AdminProtected from "./features/admin/components/AdminProtected";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
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
    path: "/articles",
    element: <Articles />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/articles/:id",
    element: <SingleArticlePage />,
  },
  {
    path: "/articles/edit/:id",
    element: <EditArticle />,
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

  // Admin Routes
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
}
])
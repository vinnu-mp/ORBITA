import ReactDOM from "react-dom/client";
import store from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "./components/index.js";

import {
  Home,
  Login,
  Signup,
  Profile,
  News,
  NewsLatest,
  NewsIndia,
  NewsAPOD,
  NewsLaunches,
  SpacePage,
  ExplorePage,
  AI,
  QuizPage,
} from "./pages/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/news",
        element: (
          <AuthLayout authentication>
            <News />
          </AuthLayout>
        ),
        children: [
          { index: true, element: <NewsLatest /> },
          { path: "latest", element: <NewsLatest /> },
          { path: "india", element: <NewsIndia /> },
          { path: "apod", element: <NewsAPOD /> },
          { path: "launches", element: <NewsLaunches /> },
        ],
      },
      {
        path: "/components",
        element: (
          <AuthLayout authentication>
            <SpacePage />
          </AuthLayout>
        ),
      },
      {
        path: "/3d-explore",
        element: (
          <AuthLayout authentication>
            <ExplorePage />
          </AuthLayout>
        ),
      },
      {
        path: "/ai",
        element: (
          <AuthLayout authentication>
            <AI />
          </AuthLayout>
        ),
      },
      {
        path: "/quiz",
        element: (
          <AuthLayout authentication>
            <QuizPage />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            {" "}
            <Profile />
          </AuthLayout>
        ),
      },
      // {
      //   path: "/my-posts",
      //   element: (
      //     <AuthLayout authentication>
      //       <MyPosts />
      //     </AuthLayout>
      //   ),
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);

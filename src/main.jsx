import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/slice/index.js";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import SignInPage from "../Pages/SignInPage.jsx";
import NetflixStartingPage from "../Pages/NetflixStartingPage.jsx";
import SignUpRegistrationPage from "../Pages/SignUpRegistrationPage.jsx";
import WhoWatching from "../Pages/WhoWatching.jsx";
import MyList from "../components/UserAllMoviePageComponent/MyList/MyList.jsx";
import Home from "../components/UserAllMoviePageComponent/Home/Home.jsx";
import { useEffect, useState } from "react";
import { auth } from "../components/firebase";
import { setUser } from "../store/slice/userSlice.js";
import HelpPage from "../components/SignInPageComponent/HelpPage.jsx";
import Loading from "../Pages/Loading.jsx";
import ComingSoon from "../components/UserAllMoviePageComponent/ComingSoon.jsx";

const ProtectedRoute = ({ children }) => {
  const [user, setLocalUser] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          })
        );
      }
      setLocalUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <Loading />;
  return user ? children : <Navigate to="/in/login" replace />;
};

const RedirectRoute = () => {
  const dispatch = useDispatch();
  const [user, setLocalUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          })
        );
      }
      setLocalUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <Loading />;
  return user ? <Navigate to="/browse" replace /> : <NetflixStartingPage />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <RedirectRoute /> },
      { path: "/in/login", element: <SignInPage /> },
      { path: "/in/loginHelp", element: <HelpPage /> },
      { path: "/signup/registration", element: <SignUpRegistrationPage /> },
      {
        path: "/browse",
        element: (
          <ProtectedRoute>
            <WhoWatching />
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <Home /> },
          { path: "my-list", element: <MyList /> },
          { path: "comingSoon", element: <ComingSoon /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

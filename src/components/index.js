import Home from "./Home/Home";
import Login from "./Login/Login";
import Questions from "./Questions/Questions";
import Reset from "./Reset/Reset";
import AuthProvider from "./contexts/AuthContext";
import useAuth from "./customHooks/useAuth";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "./Dashboard/Dashboard";


export {
    Home, Login, Questions,
    Reset, AuthProvider, useAuth,
    PrivateRoute,Dashboard,
}
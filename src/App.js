import "./App.css";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./pages/Products/Products";
import SelectedProduct from "./pages/SelectedProduct/SelectedProduct";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Cart from "./pages/Cart/Cart";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile/Profile";
import Checkout from "./pages/Checkout/Checkout";
import EditProduct from "./pages/Dashboard/ProductDashboard/EditProduct";
import CreateProduct from "./pages/Dashboard/ProductDashboard/CreateProduct";
import CreateCategory from "./pages/Dashboard/CategoryDashboard/CreateCategory";
import EditCategory from "./pages/Dashboard/CategoryDashboard/EditCategory";
import CreateUser from "./pages/Dashboard/UserDashboard/CreateUser";
import EditUser from "./pages/Dashboard/UserDashboard/EditUser";

function App() {
    const { user } = useSelector((store) => store.userStore);

    return (
        <div className="App">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/products" element={<Products />} />
                <Route
                    exact
                    path="/products/:id"
                    element={<SelectedProduct />}
                />
                {user.message === "Logged in Successfully" && user.userInfo.role === "user" ? (
                    <Route exact path="/cart" element={<Cart />} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}
                {user.message === "Logged in Successfully" && user.userInfo.role === "user" ? (
                    <Route exact path="/profile" element={<Profile />} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}
                {user.message === "Logged in Successfully" && user.userInfo.role === "user" ? (
                    <Route
                        exact
                        path="/update-profile"
                        element={<UpdateProfile />}
                    />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}
                {user.message === "Logged in Successfully" && user.userInfo.role === "user" ? (
                    <Route exact path="/checkout" element={<Checkout />} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}
                {user.message === "Logged in Successfully" &&
                    user.userInfo.role === "admin" ? (
                    <Route exact path="/dashboard" element={<Dashboard />} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}

                {user.message === "Logged in Successfully" &&
                    user.userInfo.role === "admin" ? (
                    <Route exact path="/dashboard/editProduct/:id" element={<EditProduct />} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}
                {user.message === "Logged in Successfully" &&
                    user.userInfo.role === "admin" ? (
                    <Route exact path="/dashboard/createProduct" element={<CreateProduct />} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}
                {user.message === "Logged in Successfully" &&
                    user.userInfo.role === "admin" ? (
                    <Route exact path="/dashboard/createCategory" element={<CreateCategory />} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}
                {user.message === "Logged in Successfully" &&
                    user.userInfo.role === "admin" ? (
                    <Route exact path="/dashboard/editCategory/:id" element={<EditCategory />} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}
                {user.message === "Logged in Successfully" &&
                    user.userInfo.role === "admin" ? (
                    <Route exact path="/dashboard/createUser" element={<CreateUser />} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}
                {user.message === "Logged in Successfully" &&
                    user.userInfo.role === "admin" ? (
                    <Route exact path="/dashboard/editUser/:id" element={<EditUser/>} />
                ) : (
                    <Route
                        exact
                        path="*"
                        element={<Navigate to="/404"></Navigate>}
                    />
                )}

                <Route exact path="/404" element={<PageNotFound />} />
                <Route
                    exact
                    path="*"
                    element={<Navigate to="/404"></Navigate>}
                />
            </Routes>
        </div>
    );
}

export default App;

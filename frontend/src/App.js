import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddAsset from "./pages/addAsset/AddAsset"; // Changed AddProduct to AddAsset
import AssetDetail from "./components/asset/AssetDetail/AssetDetail"; // Changed ProductDetail to AssetDetail
import EditAsset from "./pages/editasset/Editasset"; // Changed EditProduct to EditAsset
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";
import AssetAssignedList from "./components/asset/AssetStatus/AssetAssigned/AssetAssignedList";
import AssetLeaseList from "./components/asset/AssetStatus/AssetLease/AssetLeaseList";
import AssetLoanList from "./components/asset/AssetStatus/AssetLoan/AssetLoanList";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route path="/assetsAssigned" element={<Sidebar> <Layout><AssetAssignedList /></Layout></Sidebar>} />
        <Route path="/assetsLease" element={<Sidebar> <Layout><AssetLeaseList /></Layout></Sidebar>} />
        <Route path="/assetsLoan" element={<Sidebar> <Layout><AssetLoanList /></Layout></Sidebar>} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-asset" 
          element={
            <Sidebar>
              <Layout>
                <AddAsset />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/asset-detail/:id" 
          element={
            <Sidebar>
              <Layout>
                <AssetDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-asset/:id" 
          element={
            <Sidebar>
              <Layout>
                <EditAsset />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

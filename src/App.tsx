import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import Layout from "./layout/Layout";
import AdminCreateUpdate from "./pages/AdminCreateUpdate";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEditUpdate from "./pages/AdminEditUpdate";
import AdminUpdates from "./pages/AdminUpdates";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import CareersPage from "./pages/CareersPage";
import ImpressumPage from "./pages/ImpressumPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
          <Route
        path="/career"
        element={
          <Layout>
            <CareersPage />
          </Layout>
        }
      />
          <Route
        path="/impressum"
        element={
          <Layout>
            <ImpressumPage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <GuestOnlyRoute>
            <LoginPage />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <GuestOnlyRoute>
            <ForgotPasswordPage />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnlyRoute>
            <RegisterPage />
          </GuestOnlyRoute>
        }
      />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="updates" element={<AdminUpdates />} />
        <Route path="updates/create" element={<AdminCreateUpdate />} />
        <Route path="updates/edit/:id" element={<AdminEditUpdate />} />
      </Route>
    </Routes>
  );
}

export default App;

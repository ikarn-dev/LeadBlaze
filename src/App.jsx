import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, auth } from "./utils/firebase";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignUp from "./components/Authentication/SignUp";
import Login from "./components/Authentication/Login";
import ForgetPassword from "./components/Authentication/ForgetPassword";
import EmailVerification from "./components/Authentication/EmailVerification";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Reload user to get the latest email verification status
        await user.reload();
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked || loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route
            path="signup"
            element={
              user ? (
                user.emailVerified ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/auth/verify-email" replace />
                )
              ) : (
                <SignUp />
              )
            }
          />
          <Route
            path="login"
            element={
              user ? (
                user.emailVerified ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/auth/verify-email" replace />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="verify-email"
            element={
              !user ? (
                <Navigate to="/auth/login" replace />
              ) : user.emailVerified ? (
                <Navigate to="/" replace />
              ) : (
                <EmailVerification user={user} />
              )
            }
          />
          <Route
            path="forgot-password"
            element={user ? <Navigate to="/" replace /> : <ForgetPassword />}
          />
        </Route>

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            !user ? (
              <Navigate to="/auth/login" replace />
            ) : !user.emailVerified ? (
              <Navigate to="/auth/verify-email" replace />
            ) : (
              <MainLayout user={user} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
import { useState } from "react";
import { sendEmailVerification, signOut, auth } from "../../utils/firebase";
import { Loader2, MailIcon, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmailVerification = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      setError("");
      await sendEmailVerification(user);
      setSuccessMessage("Verification email has been resent. Please check your inbox.");
    } catch (error) {
      setError("Failed to resend verification email. Please try again.");
      console.error("Error sending verification email:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl text-white text-center">
      <MailIcon className="w-16 h-16 text-orange-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
      <p className="mb-4">
        We've sent a verification email to <strong>{user.email}</strong>
      </p>
      <p className="mb-6 text-white/80">
        Please check your inbox and click the verification link to complete your registration.
      </p>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <p className="text-sm text-green-400">{successMessage}</p>
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleResendVerification}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Resend Verification Email"
          )}
        </button>

        <button
          onClick={handleSignOut}
          className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-medium transition-all duration-200"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
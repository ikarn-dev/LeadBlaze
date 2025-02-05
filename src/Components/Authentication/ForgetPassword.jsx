import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { sendPasswordResetEmail, auth } from "../../utils/firebase"
import { Loader2, Flame, AlertCircle } from "lucide-react"

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError("")
    setSuccess("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError("Please enter your email address")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess("Password reset email sent! Please check your inbox.")
      // Optional: Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/auth/login")
      }, 3000)
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address format.")
          break
        case "auth/user-not-found":
          setError(
            <span>
              No account found with this email.{" "}
              <button
                type="button"
                onClick={() => navigate("/auth/signup")}
                className="text-orange-400 hover:text-orange-300 font-medium"
              >
                Sign up instead
              </button>
            </span>
          )
          break
        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.")
          break
        default:
          setError("An error occurred. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Flame className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold text-white">LEADBLAZE</h1>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Reset Your Password
      </h2>
      
      <p className="text-white/80 text-center mb-8">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none"
            placeholder="you@example.com"
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-400">{error}</div>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="text-sm text-green-400">{success}</div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-white/80">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
          >
            Back to Sign In
          </button>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
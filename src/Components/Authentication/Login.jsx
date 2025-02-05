import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  signInWithPopup,
  googleAuthProvider,
  signOut,
  auth 
} from "../../utils/firebase"
import { Loader2, Flame, AlertCircle, Eye, EyeOff } from "lucide-react"

const Login = ({ onSuccess }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [unverifiedEmail, setUnverifiedEmail] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
    setUnverifiedEmail(false)
  }

  const handleResendVerification = async () => {
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )
      await sendEmailVerification(userCredential.user)
      await signOut(auth)
      setError("Verification email resent. Please check your inbox.")
    } catch (err) {
      setError("Failed to resend verification email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      const result = await signInWithPopup(auth, googleAuthProvider)
      
      if (result.user) {
        if (onSuccess) {
          onSuccess(result.user)
        }
        navigate("/dashboard")
      }
    } catch (error) {
      console.error("Google Sign In Error:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setUnverifiedEmail(false)

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      await userCredential.user.reload()
      
      if (!userCredential.user.emailVerified) {
        await signOut(auth)
        setUnverifiedEmail(true)
        setError("Please verify your email before logging in.")
        setLoading(false)
        return
      }

      if (onSuccess) {
        onSuccess(userCredential.user)
      }
      navigate("/dashboard")
    } catch (err) {
      console.error(err)
      switch (err.code) {
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
        case "auth/wrong-password":
          setError(
            <span>
              Invalid password.{" "}
              <button
                type="button"
                onClick={() => navigate("/auth/forgot-password")}
                className="text-orange-400 hover:text-orange-300 font-medium"
              >
                Reset password
              </button>
            </span>
          )
          break
        case "auth/invalid-email":
          setError("Please enter a valid email address format.")
          break
        case "auth/invalid-credential":
          setError("Invalid credentials. Please check your email and password.")
          break
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.")
          break
        default:
          setError("An error occurred. Please try again.")
      }
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Flame className="w-8 h-8 text-orange-500" />
        <h1 className="text-3xl font-bold text-white">LEADBLAZE</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-white text-sm font-medium">Password</label>
            <button
              type="button"
              onClick={() => navigate("/auth/forgot-password")}
              className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-400">
              {error}
              {unverifiedEmail && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="ml-2 text-orange-400 hover:text-orange-300 font-medium"
                >
                  Resend verification email
                </button>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#1a1a1a] text-white/60">or</span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full mb-6 bg-white hover:bg-gray-100 text-gray-900 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
        Continue with Google
      </button>

      <div className="text-center">
        <p className="text-white/80">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/signup")}
            className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
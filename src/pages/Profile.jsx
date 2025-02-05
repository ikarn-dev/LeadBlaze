import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { auth, signOut, deleteUser } from "../utils/firebase"
import { LogOut, Trash2, User, AlertCircle, X } from "lucide-react"

function Profile() {
  const navigate = useNavigate()
  const canvasRef = useRef(null)
  const [profileData, setProfileData] = useState({
    displayName: auth.currentUser?.displayName || "",
    email: auth.currentUser?.email || "",
  })
  const [alert, setAlert] = useState({ show: false, message: "", type: "" })
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const bubbles = []
    const bubbleCount = 50

    class Bubble {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = "rgba(255, 165, 0, 0.1)" // Changed to orange
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      bubbles.forEach((bubble) => {
        bubble.update()
        bubble.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type })
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 5000)
  }

  const handleDeleteAccount = async () => {
    if (!auth.currentUser) {
      showAlert("You need to be logged in to delete your account.", "error")
      return
    }

    try {
      await deleteUser(auth.currentUser) // Delete the authenticated user
      showAlert("Your account has been deleted successfully.", "success")
      setTimeout(() => navigate("/auth/login"), 2000) // Redirect to login after successful deletion
    } catch (error) {
      // Handle specific Firebase error codes
      if (error.code === 'auth/requires-recent-login') {
        showAlert("Please re-authenticate before deleting your account.", "error")
      } else {
        showAlert(`Error deleting account: ${error.message}`, "error")
      }
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      showAlert("You have been logged out successfully.", "success")
      setTimeout(() => navigate("/auth/login"), 2000)
    } catch (error) {
      showAlert(`Error signing out: ${error.message}`, "error")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 bg-[#1c1c1c] backdrop-blur-lg border border-orange-500/20 shadow-2xl rounded-2xl p-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 text-center mb-8"
        >
          Profile
        </motion.h1>
        <AnimatePresence>
          {alert.show && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 p-4 rounded-lg flex items-center ${
                alert.type === "error" ? "bg-red-500/20 text-red-100" : "bg-green-500/20 text-green-100"
              }`}
            >
              <AlertCircle className="mr-2" />
              {alert.message}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-32 h-32 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-1"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#242424] flex items-center justify-center">
                {auth.currentUser?.photoURL ? (
                  <img
                    src={auth.currentUser.photoURL || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} className="text-orange-400" />
                )}
              </div>
            </motion.div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">{profileData.displayName || "User"}</h2>
            <p className="text-orange-400">{profileData.email}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col space-y-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            <LogOut size={20} className="mr-2" /> Logout
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDeleteWarning(true)}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            <Trash2 size={20} className="mr-2" /> Delete Account
          </motion.button>
        </motion.div>
        <AnimatePresence>
          {showDeleteWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 bg-orange-500/20 border border-orange-500 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-orange-100">Warning</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDeleteWarning(false)}
                  className="text-orange-100 hover:text-orange-200"
                >
                  <X size={20} />
                </motion.button>
              </div>
              <p className="text-orange-100 mb-4">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteWarning(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default Profile

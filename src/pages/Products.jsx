import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EmailGenerator from "../pages/EmailGen"
import { Menu, X, Mail, Clock } from "lucide-react"

const Products = () => {
  const [activeComponent, setActiveComponent] = useState("email")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const menuItems = [
    { id: "email", name: "Email Generator", icon: Mail, color: "orange" },
    { id: "coming-soon", name: "Coming Soon", icon: Clock, color: "orange" },
  ]

  const ComingSoon = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[calc(100vh-8rem)]"
    >
      <div className="text-center max-w-md mx-auto p-8 bg-[#1c1c1c]/80 rounded-2xl backdrop-blur-sm border border-orange-500/20 transform hover:scale-105 transition-transform duration-300 shadow-xl shadow-orange-500/10">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Clock className="w-10 h-10 text-orange-400" />
        </motion.div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-4">
          Coming Soon
        </h2>
        <p className="text-gray-300 text-base">We're working on something exciting! Stay tuned for updates.</p>
      </div>
    </motion.div>
  )

  const renderComponent = () => {
    switch (activeComponent) {
      case "email":
        return <EmailGenerator />
      case "coming-soon":
        return <ComingSoon />
      default:
        return <EmailGenerator />
    }
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] pt-16">
      {/* Mobile Sidebar Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-[4.5rem] left-4 z-50 p-2 bg-[#1c1c1c]/90 hover:bg-[#242424]/90 rounded-lg text-white backdrop-blur-sm border border-orange-500/20 transition-all duration-300 shadow-lg"
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 mt-16"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-[220px] bg-[#1c1c1c]/95 backdrop-blur-xl text-white h-[calc(100vh-4rem)] z-40 transform transition-all duration-300 ease-out mt-16
          ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
          border-r border-orange-500/20`}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            Products
          </h2>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeComponent === item.id
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveComponent(item.id)
                    setIsSidebarOpen(false)
                  }}
                  className={`w-full group flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300 ease-out
                    ${
                      isActive
                        ? `bg-orange-500/10 border border-orange-500/20 shadow-lg shadow-orange-500/10`
                        : "hover:bg-[#242424]/40 border border-transparent hover:border-orange-500/20"
                    }
                    transform hover:-translate-y-0.5`}
                >
                  <div
                    className={`p-1.5 rounded-md ${isActive ? `bg-orange-500/10` : "bg-[#242424]/50 group-hover:bg-[#2a2a2a]/50"}`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? `text-orange-400` : "text-gray-400 group-hover:text-orange-300"}`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium ${isActive ? "text-gray-100" : "text-gray-400 group-hover:text-orange-300"}`}
                  >
                    {item.name}
                  </span>
                </motion.button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full min-h-[calc(100vh-4rem)] p-4 lg:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeComponent}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderComponent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Products
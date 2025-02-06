import React from "react"
import { ChevronRight, Sparkles, Mail } from "lucide-react"
import { useNavigate } from 'react-router-dom'

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = React.useState("")
  const [isGlitching, setIsGlitching] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++

          if (Math.random() < 0.1) {
            setIsGlitching(true)
            setTimeout(() => setIsGlitching(false), 100)
          }
        } else {
          clearInterval(interval)
        }
      }, 50)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span className={`inline-block ${isGlitching ? "text-orange-400" : ""}`}>{displayText}</span>
}

const HeroSection = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/products')  // Make sure this matches your route path
  }

  const handleContactUs = () => {
    window.location.href = "mailto:ikarn.dev@gmail.com"
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-transparent opacity-30" />

      {/* Main content */}
      <div className="container mx-auto text-center relative z-10">
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
          <span className="text-orange-400 text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Next Generation AI Technology
          </span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white">
          <TypewriterText text="AI-Powered Email Outreach" delay={300} />
          <span className="block text-2xl md:text-3xl mt-4 bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text font-normal">
            Supercharge Your Communication
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-12 leading-relaxed">
          Transform your business communication with intelligent AI that generates personalized, high-converting email
          campaigns.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4">
          <button
            onClick={handleGetStarted}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity" />
            <span className="flex items-center justify-center gap-2">
              Get Started
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={handleContactUs}
            className="group relative px-8 py-4 rounded-xl border border-white/10 text-white font-semibold hover:border-orange-400/30 hover:bg-orange-400/5 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5 group-hover:text-orange-400 transition-colors" />
              Contact Us
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
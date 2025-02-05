import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Copy, Loader2, RefreshCw } from "lucide-react"
import Groq from "groq-sdk"

const groq = new Groq({ 
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

const EmailGen = () => {
  const [loading, setLoading] = useState(false)
  const [generatedEmail, setGeneratedEmail] = useState("")
  const [copied, setCopied] = useState(false)
  const [emailType, setEmailType] = useState("cold")
  const [industry, setIndustry] = useState("")
  const [keyPoints, setKeyPoints] = useState("")
  const [tone, setTone] = useState("professional")

  const handleGenerate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setGeneratedEmail("")

    try {
      const prompt = `Generate a ${tone} ${emailType} email for the ${industry} industry. 
      Include the following key points: ${keyPoints}

      Format the email professionally with appropriate salutation and closing.`

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert email copywriter who crafts precise, engaging emails."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        model: "llama-3.3-70b-versatile",
        max_tokens: 300,
        temperature: 0.7
      })

      const generatedContent = chatCompletion.choices[0]?.message?.content || 
        "Unable to generate email. Please try again."

      setGeneratedEmail(generatedContent)
    } catch (error) {
      console.error("Email generation error:", error)
      setGeneratedEmail("Error generating email. Please check your API key and try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedEmail)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-12 text-center">
          AI Email Generator
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-[#1c1c1c]/80 backdrop-blur-lg rounded-lg p-6 border border-orange-500/20"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Email Parameters</h2>

            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-white mb-2 font-medium">Email Type</label>
                <div className="relative">
                  <select
                    value={emailType}
                    onChange={(e) => setEmailType(e.target.value)}
                    className="w-full bg-[#242424]/90 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value="cold" className="bg-[#242424] text-white py-2">
                      Cold Outreach
                    </option>
                    <option value="follow" className="bg-[#242424] text-white py-2">
                      Follow Up
                    </option>
                    <option value="proposal" className="bg-[#242424] text-white py-2">
                      Proposal
                    </option>
                    <option value="introduction" className="bg-[#242424] text-white py-2">
                      Introduction
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Industry</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#242424]/90 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. Technology, Healthcare"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Key Points</label>
                <textarea
                  value={keyPoints}
                  onChange={(e) => setKeyPoints(e.target.value)}
                  className="w-full h-32 bg-[#242424]/90 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter the main points you want to include in the email"
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Tone</label>
                <div className="relative">
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full bg-[#242424]/90 border border-orange-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1em",
                    }}
                  >
                    <option value="professional" className="bg-[#242424] text-white py-2">
                      Professional
                    </option>
                    <option value="friendly" className="bg-[#242424] text-white py-2">
                      Friendly
                    </option>
                    <option value="formal" className="bg-[#242424] text-white py-2">
                      Formal
                    </option>
                    <option value="casual" className="bg-[#242424] text-white py-2">
                      Casual
                    </option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/20"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Email"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-[#1c1c1c]/80 backdrop-blur-lg rounded-lg p-6 border border-orange-500/20"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Generated Email</h2>
              <div className="flex space-x-2">
                {generatedEmail && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopy}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        copied ? "bg-green-500/20 text-green-500" : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                      title="Copy to Clipboard"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setGeneratedEmail("")}
                      className="text-orange-400 hover:text-orange-300 p-2 rounded-lg transition-colors duration-200"
                      title="Reset"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </motion.button>
                  </>
                )}
              </div>
            </div>

            <div className="bg-[#242424]/90 border border-orange-500/20 rounded-lg p-6 h-[calc(100%-88px)] overflow-hidden">
              <AnimatePresence mode="wait">
                {generatedEmail ? (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white/90 whitespace-pre-wrap font-sans max-h-full overflow-y-auto pr-2 text-wrap break-words"
                  >
                    {generatedEmail}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-orange-300/60 text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                      <Copy className="w-8 h-8" />
                    </div>
                    <p>Generated email will appear here</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default EmailGen
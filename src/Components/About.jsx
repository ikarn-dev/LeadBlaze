import { useSpring, animated } from "react-spring"
import { useInView } from "react-intersection-observer"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { duration: 1000 },
  })

  return (
    <section id="about" className="py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-400/5 to-transparent opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <animated.div ref={ref} style={fadeIn} className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            About Our Solution
          </h2>
          <p className="text-xl text-white/80 leading-relaxed mb-8">
            Our AI-powered platform revolutionizes email outreach by leveraging advanced machine learning algorithms. We
            analyze communication patterns, understand context, and generate highly personalized email content that
            resonates with your target audience.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full" />
        </animated.div>
      </div>
    </section>
  )
}

export default About


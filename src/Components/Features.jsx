import { useSpring, animated, config } from "react-spring"
import { useInView } from "react-intersection-observer"
import { MessageSquare, Mail, TrendingUp, Database, Zap, Target } from "lucide-react"

const FeatureCard = ({ Icon, title, desc, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "scale(1)" : "scale(0.8)",
    delay,
    config: config.wobbly,
  })

  return (
    <animated.div
      ref={ref}
      style={props}
      className="group relative bg-[#1c1c1c] p-8 rounded-2xl hover:bg-[#242424] transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-2"
    >
      <div className="mb-6 relative">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-xl flex items-center justify-center">
          <Icon className="text-orange-400 w-8 h-8" />
        </div>
        <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
      </div>
      <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors">{title}</h3>
      <p className="text-white/80 leading-relaxed text-lg">{desc}</p>
    </animated.div>
  )
}

function Features() {
  const features = [
    {
      Icon: MessageSquare,
      title: "AI-Generated Content",
      desc: "Create compelling, personalized email copy that drives engagement and converts leads into customers.",
    },
    {
      Icon: Mail,
      title: "Smart Email Sequencing",
      desc: "Automated follow-ups and intelligent communication strategies that nurture relationships effectively.",
    },
    {
      Icon: TrendingUp,
      title: "Performance Analytics",
      desc: "Comprehensive insights and metrics to optimize your outreach and maximize campaign success.",
    },
    {
      Icon: Database,
      title: "Lead Database",
      desc: "Powerful lead management and segmentation tools to organize and prioritize your prospects.",
    },
    {
      Icon: Zap,
      title: "Rapid Deployment",
      desc: "Quick setup and seamless integration with your existing workflows and tech stack.",
    },
    {
      Icon: Target,
      title: "Precision Targeting",
      desc: "Advanced algorithms for laser-focused campaigns that reach the right audience at the right time.",
    },
  ]

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const headerProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(-50px)",
    config: { duration: 1000 },
  })

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <animated.div ref={ref} style={headerProps} className="text-center mb-20">
          <span className="text-orange-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Why Choose Us
          </span>
          <h2 className="text-6xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
              Platform Features
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-white/80">
            Powerful features designed to transform your email outreach and lead generation strategy with cutting-edge
            AI technology.
          </p>
        </animated.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ Icon, title, desc }, index) => (
            <FeatureCard key={index} Icon={Icon} title={title} desc={desc} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features


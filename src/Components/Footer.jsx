import React from 'react';
import { Flame, Twitter, Linkedin, Heart, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1a1a1a]">
      {/* Blur overlay with animated gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-white">LEADBLAZE</span>
            </div>
            <p className="text-white/60 text-sm">
              Transform your customer relationships with our intelligent CRM solutions.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://x.com/iKK6600" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-orange-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/karan-kumar-487a8a260/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-orange-500 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/ikarn-dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/60 hover:text-orange-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto">
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Integration'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-orange-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-orange-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex justify-center items-center">
          <div className="text-white/60 text-sm flex items-center gap-2">
            © {currentYear} LeadBlaze. Made with <Heart className="h-4 w-4 text-orange-500 inline" /> by Karan
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
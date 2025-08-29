"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Brain, 
  Zap, 
  Heart,
  BookOpen,
  Users,
  Target,
  Shield,
  Globe,
  ArrowRight
} from "lucide-react";

// Custom hook to handle hydration
const useHydrated = () => {
  const [isHydrated, setIsHydrated] = React.useState(false);
  
  React.useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return isHydrated;
};

const socialLinks = [
  { icon: Github, href: "https://github.com/tekimax", label: "GitHub", color: "hover:text-gray-800" },
  { icon: Twitter, href: "https://twitter.com/tekimax", label: "Twitter", color: "hover:text-blue-500" },
  { icon: Linkedin, href: "https://linkedin.com/company/tekimax", label: "LinkedIn", color: "hover:text-blue-600" },
  { icon: Mail, href: "mailto:hello@tekimax.com", label: "Email", color: "hover:text-green-600" },
];

const footerSections = [
  {
    title: "Platform",
    icon: Brain,
    links: [
      { name: "Dashboard", href: "/dashboard" },
      { name: "AI Literacy", href: "/ai-literacy" },
      { name: "Defense", href: "/defense" },
      { name: "Open Source", href: "/open-source" },
    ]
  },
  {
    title: "Resources",
    icon: BookOpen,
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Research", href: "/research" },
      { name: "Blog", href: "/blog" },
      { name: "Videos", href: "/videos" },
    ]
  },
  {
    title: "Community",
    icon: Users,
    links: [
      { name: "Discord", href: "https://discord.gg/tekimax" },
      { name: "Forums", href: "/community" },
      { name: "Events", href: "/events" },
      { name: "Contributors", href: "/contributors" },
    ]
  },
  {
    title: "Company",
    icon: Target,
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy", href: "/privacy" },
    ]
  },
];

const floatingTechBadges = [
  { name: "React", color: "from-blue-400 to-blue-600", x: "20%", y: "10%" },
  { name: "TypeScript", color: "from-blue-500 to-indigo-600", x: "80%", y: "15%" },
  { name: "AI/ML", color: "from-purple-400 to-pink-500", x: "15%", y: "60%" },
  { name: "Next.js", color: "from-gray-700 to-gray-900", x: "85%", y: "70%" },
  { name: "TailwindCSS", color: "from-cyan-400 to-blue-500", x: "50%", y: "20%" },
  { name: "Neurodiversity", color: "from-green-400 to-emerald-500", x: "70%", y: "50%" },
];

const AnimatedTechBadge: React.FC<{ name: string; color: string; x: string; y: string; delay: number }> = ({ 
  name, color, x, y, delay 
}) => {
  const isHydrated = useHydrated();
  
  if (!isHydrated) {
    return (
      <div
        className={`absolute bg-gradient-to-r ${color} text-white text-sm px-4 py-2 rounded-full shadow-lg cursor-pointer select-none`}
        style={{ left: x, top: y }}
      >
        {name}
      </div>
    );
  }
  
  return (
    <motion.div
      className={`absolute bg-gradient-to-r ${color} text-white text-sm px-4 py-2 rounded-full shadow-lg cursor-pointer select-none`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        y: [0, -10, 0],
      }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut"
        }
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: 5,
        transition: { duration: 0.2 }
      }}
    >
      {name}
    </motion.div>
  );
};

const FooterSection: React.FC<{ section: typeof footerSections[0]; index: number }> = ({ section, index }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const IconComponent = section.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
          <IconComponent className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900">{section.title}</h3>
      </div>
      <ul className="space-y-3">
        {section.links.map((link, linkIndex) => (
          <motion.li 
            key={link.name}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: (index * 0.1) + (linkIndex * 0.05) }}
          >
            <Link 
              href={link.href}
              className="text-zinc-600 hover:text-blue-600 transition-colors duration-300 text-sm flex items-center group"
            >
              <span>{link.name}</span>
              <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 ml-1" />
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export function InteractiveFooter() {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });
  const isHydrated = useHydrated();

  return (
    <footer className="relative bg-gradient-to-br from-zinc-50 via-white to-blue-50 pt-20 pb-8 overflow-hidden">
      {/* Animated background tech badges */}
      <div className="absolute inset-0 pointer-events-none">
        {isHydrated && floatingTechBadges.map((badge, index) => (
          <AnimatedTechBadge
            key={badge.name}
            {...badge}
            delay={index * 0.2}
          />
        ))}
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand section */}
          <motion.div 
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/tekimax-logo.png"
                  alt="Tekimax"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-black tracking-tight text-zinc-900">Tekimax</span>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-zinc-600 leading-relaxed max-w-md"
            >
              Empowering neurodivergent minds with AI-driven solutions. Building inclusive technology that adapts to how you think, learn, and work.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-600 ${social.color} transition-all duration-300 hover:shadow-lg hover:scale-105`}
                    whileHover={{ rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
          
          {/* Footer sections */}
          {footerSections.map((section, index) => (
            <FooterSection key={section.title} section={section} index={index + 1} />
          ))}
        </div>
        
        {/* Newsletter signup */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-yellow-300 animate-pulse" />
              <h3 className="text-2xl font-bold text-white">Stay Connected</h3>
            </div>
            <p className="text-blue-100 mb-6">
              Get the latest updates on neurodiversity research, AI developments, and community insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Bottom bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <span>© 2024 Tekimax, Inc.</span>
            <Link href="/privacy" className="hover:text-zinc-700 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-700 transition-colors">Terms</Link>
            <Link href="/accessibility" className="hover:text-zinc-700 transition-colors">Accessibility</Link>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span>Built with neurodivergent minds in mind</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
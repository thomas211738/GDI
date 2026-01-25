
import { Github, Linkedin, Mail, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Top Centered Line */}
        <div className="text-center mb-10 text-sm text-gray-500">
          Created by <span className="font-semibold text-gray-900">Your Name</span> | v1.0.0 | <a href="#" className="hover:underline">Release Notes</a>
        </div>

        {/* Middle Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-10">
          
          {/* Left Column: Stay in Touch */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-gray-900 mb-4 tracking-tight">Stay in Touch</h3>
            <div className="flex gap-4">
              <SocialIcon href="https://github.com" icon={<Github className="w-5 h-5" />} label="GitHub" />
              <SocialIcon href="mailto:you@bu.edu" icon={<Mail className="w-5 h-5" />} label="Email" />
              <SocialIcon href="https://linkedin.com" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
              <SocialIcon href="https://instagram.com" icon={<Instagram className="w-5 h-5" />} label="Instagram" />
            </div>
          </div>

          {/* Right Column: Help Out */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-gray-900 mb-4 tracking-tight">Help Out</h3>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <FooterLink href="#">Suggestions</FooterLink>
              <FooterLink href="#">Report a Bug</FooterLink>
              <FooterLink href="#">Support this Project</FooterLink>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="text-center border-t border-gray-100 pt-8">
          <p className="text-xs text-gray-400 italic">
            This website uses publicly accessible data and is not affiliated with Boston University or FitRec.
          </p>
        </div>

      </div>
    </footer>
  );
}

// Helper Components for cleaner code
function SocialIcon({ href, icon, label }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-200"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <a 
      href={href} 
      className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors"
    >
      {children}
    </a>
  );
}
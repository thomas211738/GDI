
import { Github, Linkedin, Mail, BookOpen } from "lucide-react";

export function Footer() {
  return (
    // 1. Changed bg-white to bg-gray-100 for a softer look
    <footer className="w-full bg-gray-50 border-t border-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        
        {/* Top Centered Line */}
        <div className="text-center mb-10 text-sm text-gray-500">
          Developed and maintained by <span className="font-semibold text-gray-900">Thomas Yousef</span>  --  v1.0.1
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
          
          {/* Column 1: Connect */}
          {/* 2. Removed 'md:items-start' so it stays centered */}
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-gray-900 mb-4 tracking-tight">Connect</h3>
            <div className="flex gap-4">
              <SocialIcon href="https://github.com/thomas211738" icon={<Github className="w-5 h-5" />} label="GitHub" />
              <SocialIcon href="mailto:pharaoh@bu.edu" icon={<Mail className="w-5 h-5" />} label="Email" />
              <SocialIcon href="https://linkedin.com/in/thomasyousef21" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
            </div>
          </div>

          {/* Column 2: Resources */}
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-gray-900 mb-4 tracking-tight">Resources</h3>
            {/* Removed 'md:text-left' so text stays centered */}
            <div className="flex flex-col gap-3 text-center">
              <button 
                onClick={() => alert("Open Methodology Modal")} 
                className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors flex items-center justify-center gap-2"
              >
                Methodology
              </button>
              
              <a 
                href="https://github.com/thomas211738/GDI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors"
              >
                Source Code
              </a>
            </div>
          </div>

          {/* Column 3: Help Out */}
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-gray-900 mb-4 tracking-tight">Help Out</h3>
            <div className="flex flex-col gap-3 text-center">
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScI8Vw-d4EYxjXWfXNRicO-MNaVrdyDQJxRjLWienbpsKE3iA/viewform?usp=dialog" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 hover:underline text-sm transition-colors"
              >
                Submit Feedback
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="text-center border-t border-gray-200 pt-8">
          <p className="text-xs text-gray-400 italic">
            This website is not affiliated with Boston University or FitRec.
          </p>
        </div>

      </div>
    </footer>
  );
}

// Helper Component
function SocialIcon({ href, icon, label }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="p-2 bg-white rounded-full text-gray-600 shadow-sm border border-gray-200 hover:bg-gray-900 hover:text-white hover:border-transparent transition-all duration-200"
    >
      {icon}
    </a>
  );
}
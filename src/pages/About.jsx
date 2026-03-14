import React from 'react';
import Container from '../components/container/container';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Container>
        {/* Hero Section */}
        <div className="text-center py-12 px-4 sm:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Empowering Creativity through AI
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-full sm:max-w-3xl mx-auto leading-relaxed px-2">
            Transforming ideas into compelling content with the power of artificial intelligence
          </p>
        </div>

        {/* Three-Card Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Our Vision Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 sm:p-8 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                To bridge the gap between complex AI technology and creative storytelling, making professional blogging accessible to everyone. We believe that great ideas deserve great content, and AI should be the tool that amplifies human creativity, not replaces it.
              </p>
            </div>

            {/* The Innovation Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 sm:p-8 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">The Innovation</h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-4 sm:mb-6">
                Blogger.ai uses Google Gemini AI and Appwrite to reduce the content creation cycle by 80%, allowing users to focus on ideas rather than formatting. Our intelligent algorithms understand context, tone, and audience to deliver content that resonates.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400">Google Gemini AI</span>
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">Appwrite</span>
                <span className="px-2 py-1 sm:px-3 sm:py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">80% Faster</span>
              </div>
            </div>

            {/* Core Values Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 sm:p-8 hover:border-slate-600/50 transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">Core Values</h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Transparency</h3>
                    <p className="text-slate-400 text-xs sm:text-sm">Open communication about our AI processes and data usage</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">User Data Privacy</h3>
                    <p className="text-slate-400 text-xs sm:text-sm">GDPR compliant with enterprise-grade security measures</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Continuous Innovation</h3>
                    <p className="text-slate-400 text-xs sm:text-sm">Pioneering Web 3.0 and AI integration technologies</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Developer Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/50 p-6 sm:p-8 md:p-12">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Behind the Code
              </h2>
              <div className="w-16 sm:w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
              {/* Avatar Placeholder */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">YV</span>
                </div>
              </div>
              
              {/* Developer Info */}
              <div className="flex-1 w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Yashika Varshney</h3>
                <p className="text-blue-400 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Final Year Computer Science Student</p>
                <p className="text-slate-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  Vision Institute of Technology
                </p>
                <p className="text-slate-300 leading-relaxed mb-6 text-sm sm:text-base">
                  Passionate about building scalable Full-Stack applications and AI integration. 
                  Blogger.ai represents the culmination of expertise in modern web technologies, 
                  artificial intelligence, and user-centered design. Committed to creating tools that 
                  empower creators and democratize content creation through innovative AI solutions.
                </p>
                
                {/* Social Links */}
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                  <a 
                    href="https://www.linkedin.com/in/yashikavarshney1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/yashika7017" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-8 sm:py-12 px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Ready to Transform Your Content Creation?
          </h2>
          <p className="text-slate-300 mb-6 sm:mb-8 max-w-full sm:max-w-2xl mx-auto text-sm sm:text-base">
            Join thousands of creators who are already using Blogger.ai to amplify their ideas and streamline their workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-200 text-sm sm:text-base"
            >
              Get Started Now
            </Link>
            <Link 
              to="/features"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all duration-200 text-sm sm:text-base"
            >
              Explore Features
            </Link>
          </div>
        </div>

      </Container>
    </div>
  );
}

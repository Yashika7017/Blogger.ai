import React from 'react';
import { useNavigate } from 'react-router-dom';

function Features() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleViewDemo = () => {
    navigate('/');
  };

  return (
    <div className='py-6 sm:py-8 md:py-12 bg-[#0f172a] min-h-screen px-3 sm:px-4 md:px-6 lg:px-8'>
      <div className='text-center mb-8 sm:mb-10 md:mb-12'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2'>
          Powerful Features
        </h1>
        <p className='text-sm sm:text-base md:text-lg text-slate-300 max-w-full sm:max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed'>
          Discover what makes Blogger.ai the ultimate AI-powered blogging platform
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto'>
        <div className='bg-slate-800 rounded-xl p-4 sm:p-5 md:p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 cursor-pointer group'>
          <div className='text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300'>🤖</div>
          <h3 className='text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3'>AI Summarization</h3>
          <p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
            Condense blogs using advanced Gemini AI technology for quick insights and better content understanding.
          </p>
        </div>

        <div className='bg-slate-800 rounded-xl p-4 sm:p-5 md:p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 cursor-pointer group'>
          <div className='text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300'>🔐</div>
          <h3 className='text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3'>Secure Auth</h3>
          <p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
            Advanced user authentication via Appwrite with enterprise-grade security and seamless login experience.
          </p>
        </div>

        <div className='bg-slate-800 rounded-xl p-4 sm:p-5 md:p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 cursor-pointer group'>
          <div className='text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300'>✍️</div>
          <h3 className='text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3'>Rich Text Editor</h3>
          <p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
            Professional writing experience with TinyMCE editor featuring formatting tools and media support.
          </p>
        </div>

        <div className='bg-slate-800 rounded-xl p-4 sm:p-5 md:p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 cursor-pointer group'>
          <div className='text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300'>📱</div>
          <h3 className='text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3'>Responsive Design</h3>
          <p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
            Fully optimized for all screen sizes with mobile-first approach and adaptive layouts.
          </p>
        </div>

        <div className='bg-slate-800 rounded-xl p-4 sm:p-5 md:p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 cursor-pointer group'>
          <div className='text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300'>☁️</div>
          <h3 className='text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3'>Cloud Storage</h3>
          <p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
            Secure image hosting and management with fast CDN delivery and automatic optimization.
          </p>
        </div>

        <div className='bg-slate-800 rounded-xl p-4 sm:p-5 md:p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 cursor-pointer group'>
          <div className='text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300'>⚡</div>
          <h3 className='text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3'>State Management</h3>
          <p className='text-sm sm:text-base text-slate-300 leading-relaxed'>
            Fast data flow using Redux Toolkit for optimal performance and real-time updates.
          </p>
        </div>
      </div>

      <div className='text-center mt-10 sm:mt-12 md:mt-16 px-4 sm:px-0'>
        <div className='inline-flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto'>
          <button 
            onClick={handleGetStarted}
            className='w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 cursor-pointer text-sm sm:text-base'
          >
            Get Started Free
          </button>
          <button 
            onClick={handleViewDemo}
            className='w-full sm:w-auto px-6 sm:px-8 py-3 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:bg-slate-800 hover:border-blue-500 transition-all duration-300 cursor-pointer text-sm sm:text-base'
          >
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Features;

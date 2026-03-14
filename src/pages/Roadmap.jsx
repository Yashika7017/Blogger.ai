import React from 'react';
import Container from '../components/container/container';
import { Link } from 'react-router-dom';


export default function Roadmap() {
  const steps = [
    {
      phase: "Foundation",
      status: "Live",
      themeColor: "#22c55e", // Green-500
      desc: "Focusing on Beta Launch, Bug fixing, and User Feedback.",
      features: ["CRUD operations", "Appwrite Integration", "Basic AI Summary"]
    },
    {
      phase: "Intelligence",
      status: "In Development",
      themeColor: "#3b82f6", // Blue-500
      desc: "Enhancing writing experience with AI-driven insights.",
      features: ["Sentiment Analysis", "SEO Scoring", "AI Image Suggestions"]
    },
    {
      phase: "Brand & Scale",
      status: "Planned",
      themeColor: "#a855f7", // Purple-500
      desc: "Empowering creators with independent brand identity.",
      features: ["Custom Domain Mapping", "Premium Subscription Tiers", "Team Collaboration"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Container>
        {/* Header */}
        <div className="text-center py-12 px-4 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Product Roadmap</h1>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            The future of AI-driven blogging
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-3xl mx-auto px-4 pb-20">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 mb-12 items-start">
              
              {/* Number Circle */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shrink-0 mx-auto md:mx-0"
                style={{ backgroundColor: step.themeColor, boxShadow: `0 10px 15px -3px ${step.themeColor}40` }}
              >
                {index + 1}
              </div>

              {/* Card Content */}
              <div className="w-full bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white text-left">{step.phase}</h3>
                  <span 
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white w-fit"
                    style={{ backgroundColor: step.themeColor }}
                  >
                    {step.status}
                  </span>
                </div>
                
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 text-left">
                  {step.desc}
                </p>

                {/* Features List - No thick bars, just clean lines */}
                <ul className="space-y-0 border-t border-slate-700/50">
                  {step.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 py-3 border-b border-slate-700/30 last:border-0">
                      <div 
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: step.themeColor }}
                      ></div>
                      <span className="text-slate-300 text-sm font-medium text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-slate-700/50 bg-slate-800/20">
          <h2 className="text-2xl font-bold text-white mb-4">Have a feature request?</h2>
          <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105">
            Contact Us
          </Link>
        </div>
      </Container>
    </div>
  );
}
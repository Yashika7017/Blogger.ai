import React, { useState } from 'react'

function Help() {
  console.log("Help page loaded successfully!");
  
  const faqData = [
    {
      id: 'about',
      category: 'About Blogger.ai',
      question: 'What makes this platform unique?',
      answer: 'Blogger.ai stands out as a cutting-edge content creation platform powered by advanced Gemini AI integration. Our platform combines artificial intelligence with intuitive design to help users create high-quality, engaging blog content in seconds. Key features include: AI-powered content generation, customizable templates, real-time editing suggestions, SEO optimization, and seamless integration with popular publishing platforms. The Gemini AI ensures your content is not only well-written but also contextually relevant and tailored to your target audience.'
    },
    {
      id: 'getting-started',
      category: 'Getting Started',
      question: 'How can users generate their first blog using AI?',
      answer: 'Getting started with Blogger.ai is simple and intuitive! Follow these steps: 1) Sign up for a free account, 2) Navigate to Dashboard, 3) Click on "Generate New Blog", 4) Enter your topic or keywords, 5) Choose your desired tone and style, 6) Let Gemini AI work its magic, 7) Review and edit generated content, 8) Add images and formatting, 9) Publish or export your blog. Our AI assistant guides you through each step, making your first blog creation experience smooth and enjoyable.'
    },
    {
      id: 'ai-features',
      category: 'AI Features',
      question: 'What AI features are available?',
      answer: 'Blogger.ai offers powerful AI-driven features: • AI Content Generation with Gemini integration • Smart SEO optimization • Automated blog post creation • Intelligent content suggestions • Multiple writing styles (professional, casual, technical) • Keyword optimization • Image suggestions • Content enhancement • Real-time editing assistance • Multi-language support • Content scheduling • Analytics integration.'
    },
    {
      id: 'pricing',
      category: 'Pricing & Plans',
      question: 'What are the pricing plans?',
      answer: 'Blogger.ai offers flexible pricing plans: • Free Plan - 5 AI-generated posts per month, basic templates • Pro Plan - Unlimited AI posts, advanced templates, priority support • Enterprise Plan - Custom AI training, API access, dedicated support • All plans include core features • Annual billing available • 30-day money-back guarantee • Student discounts available.'
    },
    {
      id: 'templates',
      category: 'Templates & Design',
      question: 'What templates are available?',
      answer: 'Choose from our extensive template library: • Business & Professional templates • Personal blog templates • Technical writing templates • Creative & storytelling templates • News & journalism templates • Educational content templates • Custom template creation • Mobile-responsive designs • SEO-optimized structures • Industry-specific templates • Template customization tools.'
    },
    {
      id: 'security',
      category: 'Security & Privacy',
      question: 'How is user data protected?',
      answer: 'Your data security is our top priority: • End-to-end encryption for all data • Secure authentication with Appwrite • GDPR compliance • Regular security audits • Data backup and recovery • Privacy controls • Two-factor authentication • Secure API endpoints • No third-party data sharing • Transparent data policies.'
    },
    {
      id: 'integration',
      category: 'Integrations',
      question: 'What platforms can be integrated?',
      answer: 'Seamlessly integrate with popular platforms: • WordPress integration • Medium publishing • Ghost CMS • LinkedIn sharing • Twitter/X posting • Facebook sharing • Instagram integration • RSS feed generation • Mailchimp integration • Google Analytics • Zapier automation • Custom webhooks • API access for developers.'
    },
    {
      id: 'support',
      category: 'Support & Contact',
      question: 'How can users reach out for help?',
      answer: 'We\'re here to help you succeed! Blogger.ai offers multiple support channels: • 24/7 email support at vyashika715@gmail.com • Live chat support • Comprehensive FAQ section • Video tutorials and guides • Community forum • One-on-one demo sessions • Priority support for Pro users • API documentation • Bug reporting system • Feature request portal.'
    },
    {
      id: 'troubleshooting',
      category: 'Troubleshooting',
      question: 'Common issues and solutions?',
      answer: 'Quick solutions to common problems: • AI generation not working - Check API key and restart server • Content not saving - Verify Appwrite permissions • Login issues - Clear browser cache and cookies • Slow performance - Check internet connection • Images not uploading - Verify file format and size • Editor not loading - Disable browser extensions • Mobile responsiveness issues - Check device compatibility.'
    }
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItem, setExpandedItem] = useState(null)

  const filteredFAQ = faqData.filter(item => 
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleAccordion = (id) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  return (
    <div className='py-8 bg-[#0f172a] min-h-screen'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700'>
          <h1 className='text-4xl font-bold text-white mb-8 text-center'>
            Help Center
          </h1>
          
          <p className='text-slate-300 text-center mb-8'>
            Find answers to common questions about Blogger.ai
          </p>

          {/* Search Bar */}
          {/* Search Bar Container */}
<div className='mb-8 px-4'>
  <div className='relative max-w-2xl mx-auto'>
    
    {/* Search Icon - Forced to stay on left */}
    <div 
    style={{ 
      position: 'absolute', 
      left: '16px', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      zIndex: 10,
      display: 'flex',
      alignItems: 'center'
    }}
  >
      <svg
        className='w-5 h-5 text-slate-400'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    {/* Input Field - Using forced padding classes */}
    <input
      type='text'
      placeholder='Search for questions, keywords...'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      // !pl-14 ensures it overrides ANY other padding rule
      className='block w-full !pl-14 pr-4 py-4 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder:text-slate-400 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200'
      style={{ paddingLeft: '3.5rem' }} // Double confirmation
    />
  </div>
</div>

          {/* FAQ Accordion */}
          <div className='space-y-4 mb-12 md:space-y-4'>
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((item) => (
                <div
                  key={item.id}
                  className='bg-slate-700 border border-slate-600 rounded-xl overflow-hidden transition-all duration-200 w-[92%] mx-auto md:w-full md:mx-0'
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className='w-full px-4 py-3 md:px-6 md:py-4 text-left flex items-center justify-between hover:bg-slate-600 transition-colors'
                  >
                    <div className='flex-1 text-left'>
                      <span className='text-xs text-blue-400 font-medium mb-1 block uppercase tracking-wider'>
                        {item.category}
                      </span>
                      <h3 className='text-white font-semibold text-sm md:text-base'>
                        {item.question}
                      </h3>
                    </div>
                    <svg
                      className={`w-4 h-4 md:w-5 md:h-5 text-slate-400 transform transition-transform duration-300 flex-shrink-0 ml-3 ${
                        expandedItem === item.id ? 'rotate-180' : ''
                      }`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7' />
                    </svg>
                  </button>
                  {expandedItem === item.id && (
                    <div className='px-4 pb-3 md:px-6 md:pb-4 animate-in slide-in-from-top duration-200'>
                      <div className='pt-3 md:pt-4 border-t border-slate-600'>
                        <p className='text-slate-300 text-sm leading-relaxed text-left'>
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className='text-center py-12 w-[92%] mx-auto md:w-full md:mx-0'>
                <svg
                  className='w-12 h-12 md:w-16 md:h-16 text-slate-600 mx-auto mb-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                <p className='text-slate-400 text-base md:text-lg mb-2'>
                  No results found for "{searchTerm}"
                </p>
                <p className='text-slate-500 text-sm'>
                  Try searching with different keywords
                </p>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-center'>
            <h2 className='text-2xl font-bold text-white mb-4'>
              Still have questions?
            </h2>
            <p className='text-blue-100 mb-6 max-w-2xl mx-auto'>
              Can't find what you're looking for? Our support team is here to help you with any questions or concerns you might have.
            </p>
            <button
              onClick={() => window.location.href = '/contact'}
              className='inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200'
            >
              <svg
                className='w-5 h-5 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help

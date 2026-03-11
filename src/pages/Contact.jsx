import React, { useState } from 'react'
import { Container } from '../components'
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const templateParams = {
      name: formData.name,      
      email: formData.email,    
      title: formData.subject,  
      phone: formData.phone,
      message: formData.message,
    };

    try {
      await emailjs.send(
        'service_cpp1xsg',        // Aapki Service ID
        'template_hc7r64g',       // Aapki Template ID
        templateParams,           
        'AI9tCggXi27ursbls'         // Yahan apni Account se copy ki hui Public Key paste karein
      );

      setSubmitMessage('Success! Your mail has been successfully sent.. ✨');
      setFormData({ name: '', email: '', subject: '', message: '' }); 
      
    } catch (error) {
      setSubmitMessage('Error: IDs check karein ya internet connection.');
    } finally {
      setIsSubmitting(false);
    }
};

  return (
    <div className='py-8 bg-[#0f172a] min-h-screen'>
      <Container>
        <div className='max-w-2xl mx-auto'>
          <div className='bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-700'>
            <h1 className='text-3xl font-bold text-white mb-8 text-center'>
              Contact Us
            </h1>
            
            <p className='text-slate-300 text-center mb-8'>
              Have questions, feedback, or need help? We'd love to hear from you!
            </p>

            {submitMessage && (
              <div className='bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-lg mb-6 text-center'>
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <label htmlFor='name' className='block text-sm font-medium text-slate-300 mb-2'>
                    Name *
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    placeholder='Your Name'
                  />
                </div>

                <div>
                  <label htmlFor='email' className='block text-sm font-medium text-slate-300 mb-2'>
                    Email *
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    placeholder='your.email@example.com'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='subject' className='block text-sm font-medium text-slate-300 mb-2'>
                  Subject *
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  placeholder='What is this about?'
                />
              </div>

              <div>
                <label htmlFor='message' className='block text-sm font-medium text-slate-300 mb-2'>
                  Message *
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows='6'
                  className='w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
                  placeholder='Tell us more about your inquiry...'
                />
              </div>

              <div className='flex justify-center'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>

            <div className='mt-12 pt-8 border-t border-slate-700'>
              <div className='grid md:grid-cols-3 gap-8 text-center'>
                <div>
                  <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                  </div>
                  <h3 className='text-white font-semibold mb-2'>Email</h3>
                  <p className='text-slate-400'>vyashika715@gmail.com</p>
                </div>

                <div>
                  <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13 2.257a1 1 0 001.21.502l4.493 1.498a1 1 0 00.684-.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13 2.257a1 1 0 001.21.502l4.493 1.498a1 1 0 00.684-.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                    </svg>
                  </div>
                  <h3 className='text-white font-semibold mb-2'>Phone</h3>
                  <p className='text-slate-400'>+91 XXXXX XXXXX</p>
                </div>

                <div>
                  <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  </div>
                  <h3 className='text-white font-semibold mb-2'>Location</h3>
                  <p className='text-slate-400'>India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Contact

import React from 'react';
import Container from '../components/container/Container';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Container>
        {/* Header */}
        <div className="text-center py-12 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 md:p-12">
            
            {/* Scrollable Content Area */}
            <div className="max-h-[80vh] overflow-y-auto pr-4 space-y-8 custom-scrollbar">
              
              {/* Introduction */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  Introduction
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    At Blogger.ai, we are committed to protecting your privacy and ensuring the security of your personal information. 
                    This Privacy Policy explains how we collect, use, and protect your data when you use our AI-powered content creation platform.
                  </p>
                  <p>
                    By using Blogger.ai, you agree to the collection and use of information in accordance with this policy. 
                    We are dedicated to maintaining transparency about our data practices and giving you control over your information.
                  </p>
                </div>
              </section>

              {/* 1. Information We Collect */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  1. Information We Collect
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    We collect several types of information to provide and improve our services:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Name and email address during registration</li>
                        <li>Profile information you choose to provide</li>
                        <li>Authentication credentials (encrypted)</li>
                        <li>Communication preferences</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Content Data</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Blog posts and content you create</li>
                        <li>Drafts and saved content</li>
                        <li>AI-generated content and prompts</li>
                        <li>Editing history and preferences</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Usage Information</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Pages visited and time spent on platform</li>
                        <li>Features used and interaction patterns</li>
                        <li>Device information and browser type</li>
                        <li>IP address and general location</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. How We Use Data */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  2. How We Use Data
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    We use your information for the following purposes:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Service Provision</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>To provide and maintain our AI content generation services</li>
                        <li>To process and store your blog content securely</li>
                        <li>To personalize your user experience</li>
                        <li>To enable account management and authentication</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">AI Improvement</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>To train and improve our AI models</li>
                        <li>To analyze content patterns for better suggestions</li>
                        <li>To develop new features and capabilities</li>
                        <li>To ensure content quality and relevance</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Communication</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>To send important account notifications</li>
                        <li>To respond to your inquiries and support requests</li>
                        <li>To share updates about new features and services</li>
                        <li>To provide customer support and assistance</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Analytics and Improvement</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>To analyze platform usage and performance</li>
                        <li>To identify and fix technical issues</li>
                        <li>To optimize user experience and interface</li>
                        <li>To make data-driven business decisions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Third-Party Services */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  3. Third-Party Services
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    We integrate with trusted third-party services to enhance our platform functionality:
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Appwrite - Database & Authentication
                      </h3>
                      <p className="mb-3">
                        We use Appwrite for secure data storage and user authentication:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>Secure user authentication and session management</li>
                        <li>Encrypted database storage for your content</li>
                        <li>File storage for images and media</li>
                        <li>Real-time data synchronization</li>
                      </ul>
                      <p className="text-xs text-slate-400 mt-3">
                        Appwrite complies with GDPR and SOC 2 standards. Learn more at{' '}
                        <a href="https://appwrite.io/privacy" target="_blank" rel="noopener noreferrer" 
                           className="text-blue-400 hover:text-blue-300 underline">
                          appwrite.io/privacy
                        </a>
                      </p>
                    </div>
                    
                    <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Gemini AI - Content Generation
                      </h3>
                      <p className="mb-3">
                        We utilize Google's Gemini AI for intelligent content generation:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                        <li>AI-powered content creation and suggestions</li>
                        <li>Natural language processing and understanding</li>
                        <li>Content optimization and enhancement</li>
                        <li>Smart editing and improvement recommendations</li>
                      </ul>
                      <p className="text-xs text-slate-400 mt-3">
                        Gemini AI processes your content securely and does not store your personal data. 
                        Review Google's AI privacy policy at{' '}
                        <a href="https://ai.googleprivacy.com" target="_blank" rel="noopener noreferrer" 
                           className="text-blue-400 hover:text-blue-300 underline">
                          ai.googleprivacy.com
                        </a>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Other Services</h3>
                      <p className="text-sm">
                        We may use additional services for analytics, monitoring, and customer support. 
                        All third-party services are carefully vetted for security and privacy compliance.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. Data Security */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  4. Data Security
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    We implement comprehensive security measures to protect your information:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Encryption & Protection</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>End-to-end encryption for data transmission (HTTPS/TLS)</li>
                        <li>Encryption at rest for all stored data</li>
                        <li>Secure password hashing and authentication</li>
                        <li>Regular security audits and penetration testing</li>
                        <li>Firewall protection and intrusion detection</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Access Control</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Strict access controls and authentication requirements</li>
                        <li>Principle of least privilege for employee access</li>
                        <li>Regular access reviews and permissions audits</li>
                        <li>Multi-factor authentication for administrative access</li>
                        <li>Comprehensive logging and monitoring systems</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Compliance & Standards</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>GDPR compliance for European users</li>
                        <li>Regular security training for all team members</li>
                        <li>Incident response procedures and protocols</li>
                        <li>Business continuity and disaster recovery planning</li>
                        <li>Third-party security certifications and validations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 5. User Rights */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  5. User Rights
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    You have the following rights regarding your personal information:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-slate-700/30 rounded-lg p-4 border-l-4 border-blue-500">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        🔒 Right to Delete
                      </h3>
                      <p className="mb-3">
                        You have the right to request deletion of your personal information and content:
                      </p>
                      <ul className="list-disc list-inside space-y-2 ml-4 text-sm">
                        <li>Delete your account and all associated data permanently</li>
                        <li>Remove specific blog posts or content pieces</li>
                        <li>Request deletion of personal information while preserving content</li>
                        <li>Export your data before deletion for your records</li>
                      </ul>
                      <p className="text-xs text-slate-400 mt-3">
                        To exercise your right to delete, contact us at vyashika715@gmail.com
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Additional Rights</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                        <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
                        <li><strong className="text-white">Portability:</strong> Transfer your data to other services</li>
                        <li><strong className="text-white">Objection:</strong> Object to certain data processing activities</li>
                        <li><strong className="text-white">Restriction:</strong> Limit processing of your personal information</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Data Retention</h3>
                      <p className="text-sm">
                        We retain your information only as long as necessary to provide our services and comply with legal obligations. 
                        When you delete your account, we remove your personal information from our active systems within 30 days, 
                        though some data may be retained in backup systems for security purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Additional Sections */}
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  6. Cookies and Tracking
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    We use cookies and similar technologies to enhance your experience:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Essential cookies for platform functionality</li>
                    <li>Authentication and session management</li>
                    <li>User preferences and settings storage</li>
                    <li>Analytics and performance monitoring</li>
                    <li>You can control cookies through your browser settings</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  7. Children's Privacy
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    Blogger.ai is not intended for children under 13 years of age. 
                    We do not knowingly collect personal information from children under 13. 
                    If we become aware that we have collected such information, we will take steps to delete it promptly.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  8. International Data Transfers
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    Your information may be transferred to and processed in countries other than your own. 
                    We ensure appropriate safeguards are in place for international data transfers, 
                    including standard contractual clauses and compliance with applicable data protection laws.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  9. Changes to This Policy
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Posting the updated policy on our website</li>
                    <li>Sending email notifications for significant changes</li>
                    <li>Displaying prominent notices in our application</li>
                    <li>Updating the "Last updated" date at the top of this policy</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2">
                  10. Contact Information
                </h2>
                <div className="text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    If you have any questions about this Privacy Policy or want to exercise your rights, please contact us:
                  </p>
                  <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                    <p className="text-white">Email: vyashika715@gmail.com</p>
                    <p className="text-white">Platform: Blogger.ai</p>
                    <p className="text-white">Response Time: Within 48 hours</p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="text-center py-8 space-y-4">
          <p className="text-slate-400 text-sm">
            Your privacy is important to us. We are committed to protecting your personal information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="inline-flex items-center px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200"
            >
              ← Back to Home
            </Link>
            <Link 
              to="/terms"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              View Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
}

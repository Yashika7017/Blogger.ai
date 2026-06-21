import React, { useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { GoogleGenerativeAI } from "@google/generative-ai";

function PostCard({ $id, Title, featuredImage, content, authorName, userId }) { 
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  
  const generateFallbackSummary = (title, content) => {
        let textContent = content || '';
        if (textContent.includes('<')) {
            textContent = textContent.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
        }
        const firstSentence = textContent.split('.')[0] + '.';
        const truncated = firstSentence.length > 150 ? firstSentence.substring(0, 150) + '...' : firstSentence;
        return `${title}: ${truncated}`;
  };

  const generateSummary = async () => {
        if (!content || isSummarizing) return;
        setIsSummarizing(true);
        try {
            let textContent = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            const limitedContent = textContent.substring(0, 1500);
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `Write a 2-sentence summary for this blog titled "${Title}": ${limitedContent}`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            setSummary(response.text());
        } catch (error) {
            console.error('Error generating summary:', error);
            setSummary(generateFallbackSummary(Title, content));
        } finally {
            setIsSummarizing(false);
        }
  };

  const fallbackImg = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPg==';

  const getImageUrl = () => {
    if (!featuredImage) return fallbackImg;
    try {
      return appwriteService.getFileView(featuredImage);
    } catch (error) {
      return fallbackImg;
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded-xl p-3 sm:p-4 pr-4 sm:pr-6 lg:pr-8 border border-gray-700 transition-all duration-300 ease-in-out md:hover:scale-105 hover:shadow-2xl cursor-pointer post-card flex flex-col h-full overflow-hidden hover:bg-slate-800/80 hover:bg-gray-700/50 hover:shadow-blue-500/20">
        
        <Link to={`/post/${$id}`} className="block shrink-0">
            <div className="w-full h-40 sm:h-52 mb-3 sm:mb-4 overflow-hidden rounded-xl bg-gray-200 shrink-0">
                <img 
                    src={getImageUrl()} 
                    alt={Title || 'Post image'} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => { e.target.src = fallbackImg; }}
                />
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 shrink-0">
                {Title || 'Untitled'}
            </h2>
        </Link>
        
        <div className="mb-3 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200 shrink-0">
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-2 gap-2">
                <h3 className="text-xs sm:text-sm font-semibold text-blue-700">🤖 AI Summary</h3>
                <button
                    onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation();
                        generateSummary();
                    }}
                    disabled={isSummarizing}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] sm:text-xs rounded-md shrink-0"
                >
                    {isSummarizing ? '...' : summary ? '✨ Regenerate' : '✨ Generate'}
                </button>
            </div>
            
            {summary && !showFullContent && (
                <div className="text-[11px] sm:text-sm text-gray-700 leading-tight sm:leading-relaxed">
                    <div className="max-h-12 sm:max-h-16 overflow-y-auto">
                        {summary.split('\n').map((line, index) => (
                            <p key={index} className="mb-1">{line}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {content && (!summary || showFullContent) && (
            <div className="text-gray-700 text-xs sm:text-sm flex-grow overflow-hidden min-h-0">
                <div className="max-h-24 sm:max-h-32 overflow-y-auto browser-css">
                    {content ? parse(String(content)) : "Loading..."}
                </div>
            </div>
        )}
    </div>
  );
};

export default PostCard;
import React, { useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { GoogleGenerativeAI } from "@google/generative-ai";

function PostCard({ $id, Title, featuredImage, content }) { 
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const generateFallbackSummary = (title, content) => {
        let textContent = content;
        if (content.includes('<')) {
            textContent = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
        }
        
        const firstSentence = textContent.split('.')[0] + '.';
        const truncated = firstSentence.length > 150 ? firstSentence.substring(0, 150) + '...' : firstSentence;
        
        return `${title}: ${truncated}\nA comprehensive guide covering key concepts and practical applications.`;
    };

    const generateSummary = async () => {
        if (!content || isSummarizing) return;
        
        setIsSummarizing(true);
        
        try {
            console.log("Generating summary for:", Title);
            
            // HTML to Text clean up
            let textContent = content.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
            const limitedContent = textContent.substring(0, 1500);
    
            // --- Gemini Integration ---
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Stable model
    
            const prompt = `Write a 2-sentence summary for this blog titled "${Title}": ${limitedContent}`;
    
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
    
            setSummary(text);
            console.log("AI Summary Success:", text);
        } catch (error) {
            console.error('Error generating summary:', error);
            const fallbackSummary = generateFallbackSummary(Title, content);
            setSummary(fallbackSummary);
        } finally {
            setIsSummarizing(false);
        }
    };

  const getImageUrl = () => {
    if (!featuredImage) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA2MEgxMjVWMTAwSDc1VjYwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNODcuNSA3NUgxMTIuNVY4NUg4Ny41Vjc1WiIgZmlsbD0iI0YzRjRGNiIvPgo8L3N2Zz4K';
    try {
      return appwriteService.getFileView(featuredImage);
    } catch (error) {
      console.error('Error getting image view:', error);
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA2MEgxMjVWMTAwSDc1VjYwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNODcuNSA3NUgxMTIuNVY4NUg4Ny41Vjc1WiIgZmlsbD0iI0YzRjRGNiIvPgo8L3N2Zz4K';
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded-xl p-4 sm:p-5 border border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-50-500/20 hover:bg-gray-700/50 cursor-pointer post-card flex flex-col h-full overflow-hidden">
        <Link to={`/post/${$id}`} className="block flex-shrink-0">
            <div className="w-full h-48 sm:h-52 mb-4 overflow-hidden rounded-xl bg-gray-200 flex-shrink-0">
                <img 
                    src={getImageUrl()} 
                    alt={Title || 'Post image'} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                        console.error('Image failed to load:', featuredImage);
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA2MEgxMjVWMTAwSDc1VjYwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNODcuNSA3NUgxMTIuNVY4NUg4Ny41Vjc1WiIgZmlsbD0iI0YzRjRGNiIvPgo8L3N2Zz4K';
                    }}
                />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 transition-colors duration-300 hover:text-blue-400 mb-3 line-clamp-2 flex-shrink-0">{Title || 'Untitled'}</h2>
        </Link>
        
        {/* AI Summary Section */}
        {content && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex-shrink-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                    <h3 className="text-sm font-semibold text-blue-700">🤖 AI Summary</h3>
                    <button
                        onClick={generateSummary}
                        disabled={isSummarizing}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs rounded-md hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                        {isSummarizing ? (
                            <>
                                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                                Summarizing...
                            </>
                        ) : (
                            <>
                                ✨ {summary ? 'Regenerate' : 'Generate'} Summary
                            </>
                        )}
                    </button>
                </div>
                
                {summary && !showFullContent && (
                    <div className="text-sm text-gray-700 leading-relaxed overflow-hidden">
                        <div className="max-h-16 overflow-y-auto">
                            {summary.split('\n').map((line, index) => (
                                <p key={index} className="mb-1">{line}</p>
                            ))}
                        </div>
                    </div>
                )}
                
                {summary && (
                    <button
                        onClick={() => setShowFullContent(!showFullContent)}
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200 mt-2 flex-shrink-0"
                    >
                        {showFullContent ? '📖 Show Less' : '📝 Show Full Content'}
                    </button>
                )}
            </div>
        )}

        {/* Full Content Section */}
        {content && (!summary || showFullContent) && (
            <div className="text-gray-700 leading-relaxed text-sm flex-grow overflow-hidden min-h-0">
                <div className="max-h-32 overflow-y-auto browser-css">
                    {content ? parse(String(content)) : "Loading content..."}
                </div>
            </div>
        )}
    </div>
  )
}

export default PostCard
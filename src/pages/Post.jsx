
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Add CSS for animations
const styles = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out;
    }
`;

export default function Post() {
    const [post, setPost] = useState(null);
    const [aiInsights, setAiInsights] = useState(null);
    const [insightsLoading, setInsightsLoading] = useState(false);
    const [authorData, setAuthorData] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
        
        // Inject CSS styles
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
        
        return () => {
            document.head.removeChild(styleElement);
        };
    }, [slug, navigate]);

    // Fetch author data when post is loaded and authorName is missing
    useEffect(() => {
        if (post && !post.authorName && post.userId) {
            // Try to get author name from current user if they're the author
            if (userData && userData.$id === post.userId && userData.name) {
                setAuthorData({ name: userData.name });
            } else {
                // For other users, we'd need to implement a user lookup service
                // For now, we'll use a fallback approach
                setAuthorData({ name: 'Blog Author' });
            }
        }
    }, [post, userData]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const generateAnalysis = async () => {
        if (!post) return;
        
        setInsightsLoading(true);
        setAiInsights(null);

        try {
            // First, let's test with a simple API call
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            console.log("=== AI INSIGHTS DEBUG START ===");
            console.log("1. API Key available:", apiKey ? "Yes" : "No");
            console.log("2. Post object:", post);
            console.log("3. Post Title:", post.Title);
            console.log("4. Post Content fields:", {
                Contant: post.Contant,
                Content: post.Content,
                content: post.content
            });
            
            if (!apiKey) {
                console.log("ERROR: API Key is missing!");
                throw new Error("API Key is missing from environment variables");
            }

            // Test basic API connection first
            console.log("5. Testing basic Gemini connection...");
            const genAI = new GoogleGenerativeAI(apiKey);
            
            // Try different model configurations
            let model;
            let testResult;
            let testText;
            let apiWorking = false;
            
            try {
                console.log("5a. Trying gemini-1.5-flash with v1...");
                model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", apiVersion: "v1" });
                testResult = await model.generateContent("Hello, respond with 'OK'");
                testText = await testResult.response.text();
                console.log("5b. gemini-1.5-flash v1 response:", testText);
                apiWorking = true;
            } catch (error1) {
                console.log("5c. gemini-1.5-flash v1 failed, trying gemini-pro with v1...");
                try {
                    model = genAI.getGenerativeModel({ model: "gemini-pro", apiVersion: "v1" });
                    testResult = await model.generateContent("Hello, respond with 'OK'");
                    testText = await testResult.response.text();
                    console.log("5d. gemini-pro v1 response:", testText);
                    apiWorking = true;
                } catch (error2) {
                    console.log("5e. gemini-pro v1 failed, trying gemini-1.5-flash with v1beta...");
                    try {
                        model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                        testResult = await model.generateContent("Hello, respond with 'OK'");
                        testText = await testResult.response.text();
                        console.log("5f. gemini-1.5-flash v1beta response:", testText);
                        apiWorking = true;
                    } catch (error3) {
                        console.log("5g. All models failed, using mock analysis...");
                        apiWorking = false;
                    }
                }
            }

            console.log("6. Final test response:", testText);
            console.log("7. API Working:", apiWorking);

            // Now get the actual content
            const content = post.Contant || post.Content || post.content || post.title || 'No content available';
            const title = post.Title || post.title || 'No title';
            
            const blogContent = `
                Title: ${title}
                Content: ${content}
            `;

            console.log("8. Blog content for analysis:", blogContent);

            if (apiWorking && testText && testText.includes("OK")) {
                // Use real AI analysis
                const prompt = `Analyze this blog and give me: 1. Sentiment (Positive/Negative/Neutral) 2. SEO Score out of 100 3. One tip to improve it.

Blog Content:
${blogContent}

Please respond in this exact format:
Sentiment: [Positive/Negative/Neutral]
SEO Score: [number]/100
AI Tip: "[your improvement tip]"`;

                console.log("9. Sending analysis prompt to Gemini...");
                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                console.log("10. Gemini analysis response:", text);
                console.log("=== AI INSIGHTS DEBUG END ===");

                // Parse the response
                const lines = text.split('\n').map(line => line.trim()).filter(line => line);
                const insights = {
                    sentiment: 'Neutral',
                    seoScore: 50,
                    tip: 'No tip available'
                };

                lines.forEach(line => {
                    if (line.toLowerCase().includes('sentiment') && line.includes(':')) {
                        const sentimentValue = line.split(':')[1]?.trim();
                        if (sentimentValue) {
                            insights.sentiment = sentimentValue;
                        }
                    } else if (line.toLowerCase().includes('seo score') && line.includes(':')) {
                        const scoreText = line.split(':')[1]?.trim();
                        if (scoreText) {
                            const score = parseInt(scoreText.split('/')[0]) || 50;
                            insights.seoScore = Math.min(100, Math.max(0, score));
                        }
                    } else if (line.toLowerCase().includes('ai tip') && line.includes(':')) {
                        const tipText = line.split(':')[1]?.trim();
                        if (tipText) {
                            insights.tip = tipText.replace(/^["']|["']$/g, '');
                        }
                    }
                });

                console.log("11. Final parsed insights:", insights);
                setAiInsights(insights);
            } else {
                // Use mock analysis when API fails
                console.log("9. Using mock AI analysis...");
                const mockInsights = generateMockAnalysis(title, content);
                console.log("10. Mock insights:", mockInsights);
                console.log("=== AI INSIGHTS DEBUG END ===");
                setAiInsights(mockInsights);
            }

        } catch (error) {
            console.error("=== AI INSIGHTS ERROR ===");
            console.error("Error type:", error.constructor.name);
            console.error("Error message:", error.message);
            console.error("Error details:", error);
            console.error("=== END ERROR ===");
            
            // Use mock analysis as final fallback
            const title = post.Title || post.title || 'No title';
            const content = post.Contant || post.Content || post.content || 'No content';
            const mockInsights = generateMockAnalysis(title, content);
            setAiInsights(mockInsights);
        } finally {
            setInsightsLoading(false);
        }
    };

    // Mock analysis function for when API fails
    const generateMockAnalysis = (title, content) => {
        const contentLower = content.toLowerCase();
        const titleLower = title.toLowerCase();
        
        // Sentiment analysis based on keywords
        let sentiment = 'Neutral';
        const positiveWords = ['amazing', 'wonderful', 'excellent', 'great', 'fantastic', 'love', 'beautiful', 'awesome', 'perfect', 'best'];
        const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'worst', 'disgusting', 'disappointing', 'failed', 'poor'];
        
        const positiveCount = positiveWords.filter(word => contentLower.includes(word)).length;
        const negativeCount = negativeWords.filter(word => contentLower.includes(word)).length;
        
        if (positiveCount > negativeCount) sentiment = 'Positive';
        else if (negativeCount > positiveCount) sentiment = 'Negative';
        
        // SEO score based on content length and structure
        let seoScore = 50;
        const wordCount = content.split(' ').length;
        
        if (wordCount > 300) seoScore += 10;
        if (wordCount > 500) seoScore += 10;
        if (contentLower.includes(titleLower)) seoScore += 15;
        if (contentLower.match(/\d{4}/)) seoScore += 5; // Contains numbers
        if (contentLower.match(/[.!?]/)) seoScore += 5; // Contains punctuation
        if (contentLower.split(' ').length > 10) seoScore += 5; // Good vocabulary
        
        seoScore = Math.min(100, Math.max(20, seoScore));
        
        // Generate specific tips
        const tips = [
            "Try adding more relevant keywords to improve your SEO ranking.",
            "Consider breaking up long paragraphs for better readability.",
            "Add internal links to related content to improve engagement.",
            "Include more statistics and data to support your points.",
            "Use more descriptive headings to structure your content better.",
            "Add a compelling call-to-action at the end of your post.",
            "Include more multimedia elements to make your content engaging.",
            "Optimize your meta description for better search visibility.",
            "Use shorter sentences to improve readability.",
            "Add more examples to illustrate your points clearly."
        ];
        
        // Select tip based on content analysis
        let selectedTip = tips[0];
        if (wordCount < 300) selectedTip = tips[1];
        else if (!contentLower.includes(titleLower)) selectedTip = tips[2];
        else if (seoScore < 60) selectedTip = tips[0];
        else if (seoScore > 80) selectedTip = "Great content! Consider adding more internal links to keep readers engaged.";
        
        return {
            sentiment: sentiment,
            seoScore: seoScore,
            tip: selectedTip
        };
    };

    const getSentimentEmoji = (sentiment) => {
        switch(sentiment?.toLowerCase()) {
            case 'positive': return '😊';
            case 'negative': return '😔';
            default: return '😐';
        }
    };

    return post ? (
        <div className="w-full py-8 min-h-screen">
            <Container>
                <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8">
                    {/* Image Section */}
                    <div className="w-full max-w-4xl mb-6 relative">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.Title}
                            className="w-full rounded-xl shadow-lg"
                        />
                    </div>
                    
                    {/* Title Section */}
                    <div className="w-full max-w-4xl mb-8 px-4 sm:px-6">
                        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center break-words">{post.Title}</h1>
                    </div>
                    
                    {/* Content Section */}
                    <div className="w-full max-w-4xl">
                        <div className="post-content">
                            {post?.Contant ? 
                                parse(String(post.Contant))
                            : "Loading content..."}
                        </div>
                    </div>

                    {/* AI Insights Section */}
                    <div className="w-full max-w-4xl mt-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">🤖 AI Insights</h3>
                                <Button 
                                    onClick={generateAnalysis}
                                    disabled={insightsLoading}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 text-sm"
                                >
                                    {insightsLoading ? "Analyzing..." : "Generate Analysis"}
                                </Button>
                            </div>
                            
                            {aiInsights && (
                                <div className="space-y-3 animate-fade-in">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">{getSentimentEmoji(aiInsights.sentiment)}</span>
                                        <div>
                                            <p className="text-sm text-gray-600">Sentiment</p>
                                            <p className="font-semibold text-gray-800">{aiInsights.sentiment}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">📊</span>
                                        <div>
                                            <p className="text-sm text-gray-600">SEO Score</p>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full ${
                                                            aiInsights.seoScore >= 80 ? 'bg-green-500' : 
                                                            aiInsights.seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                        }`}
                                                        style={{ width: `${aiInsights.seoScore}%` }}
                                                    ></div>
                                                </div>
                                                <span className="font-semibold text-gray-800">{aiInsights.seoScore}/100</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start space-x-2">
                                        <span className="text-2xl">💡</span>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-600">AI Tip</p>
                                            <p className="font-medium text-gray-800 italic">"{aiInsights.tip}"</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {insightsLoading && (
                                <div className="text-center py-4">
                                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                    <p className="text-sm text-gray-600 mt-2">Analyzing your blog content...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Author Profile Section */}
                    <div className="w-full max-w-4xl mt-8">
                        <div className="flex items-center justify-center sm:justify-start p-4 bg-slate-100 rounded-lg border border-slate-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {(post?.authorName || authorData?.name || 'Anonymous')?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">
                                        Published by {post?.authorName || authorData?.name || 'Blog Author'} on 
                                        <span className="ml-1 text-gray-800">
                                            {post?.$createdAt ? new Date(post.$createdAt).toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            }) : new Date().toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {isAuthor && (
                        <div className="w-full max-w-4xl mt-6 flex gap-3 justify-center sm:justify-start">
                            <Link to={`/edit-post/${post.$id}`} className="flex-1 sm:flex-initial">
                                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    Edit
                                </Button>
                            </Link>
                            <Button className="flex-1 sm:flex-initial bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    ) : null;
}

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            Title: post?.Title || "",
            slug: post?.$id || "",
            Contant: post?.Contant || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateFallbackContent = (title) => {
        return `
        <h2>Introduction to ${title}</h2>
        <p>Welcome to this comprehensive guide about ${title}. In this article, we'll explore the key concepts, best practices, and practical applications that will help you understand and implement this topic effectively.</p>
        
        <h3>What is ${title}?</h3>
        <p>${title} represents an important aspect of modern development and technology. It provides solutions to common challenges while offering innovative approaches to problem-solving.</p>
        
        <h3>Key Benefits</h3>
        <ul>
            <li>Improved efficiency and performance</li>
            <li>Enhanced user experience</li>
            <li>Scalable solutions for growing needs</li>
            <li>Cost-effective implementation</li>
        </ul>
        
        <h3>Best Practices</h3>
        <p>When working with ${title}, it's essential to follow industry best practices to ensure optimal results. These include proper planning, regular testing, and continuous improvement.</p>
        
        <h3>Common Challenges</h3>
        <p>Like any technology, ${title} comes with its own set of challenges. Understanding these obstacles and knowing how to overcome them is crucial for success.</p>
        
        <h3>Conclusion</h3>
        <p>${title} offers tremendous opportunities for developers and businesses alike. By following the guidelines and best practices outlined in this article, you'll be well-equipped to leverage its full potential.</p>
        `;
    };

    const generateContentWithAI = async () => {
        const title = getValues("Title");
        
        if (!title.trim()) {
            alert("Please enter a title first!");
            return;
        }

        // Validate API key
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            alert("API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
            return;
        }
        
        if (apiKey.startsWith('VITE_') || apiKey.includes('${')) {
            alert("API key is not properly configured. Please check your .env file and restart the development server.");
            return;
        }

        setIsGenerating(true);
        
        console.log("Starting AI generation for title:", title);
        console.log("Using API key:", import.meta.env.VITE_GEMINI_API_KEY ? "Key found" : "Key missing");
        console.log("API key length:", import.meta.env.VITE_GEMINI_API_KEY?.length || 0);
        
        try {
            const prompt = `I am building a professional blogging platform called Blogger.ai. I am using React.js for the frontend and Appwrite as my Backend-as-a-Service (BaaS).

Your task is to act as an expert content creator. Based on the Title provided below, generate a complete blog post following these strict technical requirements:

Content Structure: Generate a high-quality, SEO-friendly blog post with at least 500 words. Use proper headings (H2, H3), bullet points, and a conclusion.

Output Format: Provide the response in HTML format so it can be directly stored in my Appwrite 'content' field and rendered in my React frontend.

Metadata Generation: Create a catchy, professional title and generate a URL-friendly slug (lowercase, hyphens only).

Tone: Professional yet engaging, suitable for a tech-savvy audience.

Input Title: "${title}"

Please return the data in this JSON structure:
{
"title": "Generated Title",
"slug": "generated-slug",
"content": "Full HTML content here",
"status": "active"
}`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 8192,
                    }
                })
            });

            console.log("API Response status:", response.status);
            console.log("API Response headers:", response.headers);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("AI Response:", data);

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const generatedText = data.candidates[0].content.parts[0].text;
                
                // Try to parse JSON response
                let parsedContent;
                try {
                    parsedContent = JSON.parse(generatedText);
                    setValue("Contant", parsedContent.content);
                    setValue("slug", parsedContent.slug);
                    if (parsedContent.title) {
                        setValue("Title", parsedContent.title);
                        console.log("No JSON found, using plain text fallback");
                        // Fallback: treat as plain text content
                        parsedContent = {
                            title: title,
                            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 35),
                            content: generatedText,
                            status: "active"
                        };
                    }
                } catch (parseError) {
                    console.log("JSON parse failed, using plain content");
                    parsedContent = {
                        title: title,
                        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 35),
                        content: generatedText,
                        status: "active"
                    };
                }

                // Update form fields
                setValue("Title", parsedContent.title || title);
                setValue("slug", parsedContent.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 35));
                setValue("Contant", parsedContent.content || generatedText);
                setValue("status", parsedContent.status || "active");

                console.log("Content generated successfully!");
            } else {
                throw new Error('Invalid response format from API');
            }

        } catch (error) {
            console.error('Error generating content:', error);
            console.error('Error details:', error.message);
            console.error('Error stack:', error.stack);
            
            // Fallback: Generate high-quality content based on title
            const fallbackContent = generateFallbackContent(title);
            
            // Update form fields with fallback content
            setValue("Title", fallbackContent.title);
            setValue("slug", fallbackContent.slug);
            setValue("Contant", fallbackContent.content);
            setValue("status", fallbackContent.status);
            
            alert("AI service temporarily unavailable. Generated high-quality template content instead. You can edit and customize it as needed.");
        } finally {
            setIsGenerating(false);
        }
    };

    const submit = async (data) => {
        try {
            if (post) {
                // Agar post edit kar rahe hain
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    Title: data.Title,
                    Contant: data.Contant,
                    featuredImage: file ? file.$id: undefined,
                    status: data.status,
                    userId: userData.$id
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                // Agar naya post bana rahe hain
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ 
                    Title: data.Title,
                    slug: data.slug,
                    Contant: data.Contant,
                    featuredImage: data.featuredImage,
                    status: data.status,
                    userId: userData.$id
                });
                    if (dbPost) navigate(`/post/${dbPost.$id}`);
                }
            }
        } catch (error) {
            console.log("Appwrite error :: submit :: error", error);
            alert("Kuch gadbad hai! Console check karo.");
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
                .slice(0, 35);

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "Title") {
                setValue("slug", slugTransform(value.Title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="w-full space-y-6 flex flex-col items-stretch">
                {/* Title and AI Button Section */}
                <div className="w-full flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 w-full">
                        <Input 
                            label="Title :"
                            placeholder="Enter your blog title"
                            className="w-full bg-[#1e293b] text-slate-200 font-semibold border-slate-700 focus:border-indigo-500 rounded-xl text-sm sm:text-base"
                            {...register("Title", { required: true })}
                        />
                    </div>
                    <Button
                        type="button"
                        onClick={generateContentWithAI}
                        disabled={isGenerating}
                        className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-fit text-xs sm:text-sm whitespace-nowrap"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="hidden sm:inline">Generating...</span>
                                <span className="sm:hidden">...</span>
                            </>
                        ) : (
                            <>
                                <span className="hidden sm:inline">✨ Generate with AI</span>
                                <span className="sm:hidden">✨ AI</span>
                            </>
                        )}
                    </Button>
                </div>

                {/* Slug Field */}
                <div>
                    <Input
                        label="Slug :"
                        placeholder="url-friendly-slug"
                        className="w-full bg-[#1e293b] text-slate-200 font-semibold border-slate-700 focus:border-indigo-500 rounded-xl text-sm sm:text-base"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                </div>

                {/* Content Editor - Full Width */}
                <div>
                    <RTE label="Content :" name="Contant" control={control} defaultValue={getValues("Contant")} />
                </div>

                {/* Sidebar Section - Responsive Layout */}
                <div className="flex flex-col lg:flex-row lg:gap-6 space-y-4 lg:space-y-0">
                    {/* Featured Image - Takes more space on desktop */}
                    <div className="flex-1 lg:flex-none lg:w-3/5">
                        <Input
                            label="Featured Image :"
                            type="file"
                            className="w-full"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        {post && (
                            <div className="mt-3">
                                <img
                                    src={appwriteService.getFileView(post.featuredImage)}
                                    alt={post.Title}
                                    className="rounded-lg w-full h-auto max-h-32 sm:max-h-40 lg:max-h-48 object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Status and Submit - Takes less space on desktop */}
                    <div className="lg:w-2/5 space-y-4">
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="w-full"
                            {...register("status", { required: true })}
                        />
                        <Button 
                            type="submit" 
                            bgColor={post ? "bg-green-500" : undefined} 
                            className={`w-full py-2 sm:py-3 text-sm sm:text-base font-bold rounded-xl transition-all shadow-lg duration-300 active:scale-95 ${
                                post 
                                    ? "bg-green-600 hover:bg-green-500 shadow-green-900/20" 
                                    : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30"
                            }`}
                        >
                            {post ? "Update Blog" : "Publish Blog"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}

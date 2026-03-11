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

    const generateContentWithAI = async () => {
        const title = getValues("Title");
        
        if (!title.trim()) {
            alert("Please enter a title first!");
            return;
        }

        // Validate API key
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey || apiKey.length < 10) {
            alert("API key is missing or invalid. Please check your .env file and ensure VITE_GEMINI_API_KEY is set correctly.");
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
                        maxOutputTokens: 2048,
                    }
                })
            });

            console.log("API Response status:", response.status);
            console.log("API Response headers:", response.headers);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("API Error Response:", errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            console.log("AI Response:", data);
            console.log("Response structure:", JSON.stringify(data, null, 2));
            
            // Handle different response structures
            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                const candidate = data.candidates[0];
                const generatedText = candidate.content.parts?.[0]?.text?.trim() || candidate.content?.text?.trim() || '';
                console.log("Generated content:", generatedText);
                console.log("Content length:", generatedText.length);
                
                // Try to parse JSON response
                let parsedContent;
                try {
                    // Look for JSON in the response
                    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
                    if (jsonMatch && jsonMatch[0]) {
                        parsedContent = JSON.parse(jsonMatch[0]);
                        console.log("Successfully parsed JSON:", parsedContent);
                    } else {
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

    const generateFallbackContent = (title) => {
        const slug = title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/\s+/g, '-')
            .slice(0, 35);

        const content = `<h2>Understanding ${title}: A Comprehensive Guide</h2>
<p>Welcome to our in-depth exploration of ${title}. In today's rapidly evolving digital landscape, understanding this concept has become essential for professionals and enthusiasts alike. This comprehensive guide will walk you through everything you need to know, from fundamental principles to advanced applications.</p>

<h3>What Makes ${title} So Important?</h3>
<p>${title} represents a significant breakthrough in how we approach modern challenges. Its unique combination of innovative features and practical applications makes it an invaluable tool for anyone looking to stay ahead in their field. Whether you're a beginner or an experienced professional, mastering ${title} can open doors to new opportunities and insights.</p>

<h3>Key Benefits and Advantages</h3>
<ul>
<li><strong>Enhanced Efficiency:</strong> Streamlines processes and reduces time complexity by up to 60%</li>
<li><strong>Cost-Effective Solutions:</strong> Minimizes resource requirements while maximizing output quality</li>
<li><strong>Scalable Architecture:</strong> Adapts seamlessly to growing demands and changing requirements</li>
<li><strong>User-Friendly Interface:</strong> Intuitive design ensures smooth adoption and minimal learning curve</li>
<li><strong>Future-Proof Technology:</strong> Built with scalability and long-term sustainability in mind</li>
</ul>

<h3>Getting Started: A Step-by-Step Approach</h3>
<p>Embarking on your ${title} journey doesn't have to be overwhelming. We recommend starting with the fundamentals and gradually building your expertise. Begin by understanding the core concepts, then move on to practical implementation. Remember, mastery comes through consistent practice and continuous learning.</p>

<h3>Best Practices for Success</h3>
<p>To achieve optimal results with ${title}, it's crucial to follow established best practices. These include proper planning, regular performance monitoring, and staying updated with the latest developments. Additionally, building a strong foundation of knowledge and seeking guidance from experienced practitioners can significantly accelerate your learning curve.</p>

<h3>Common Challenges and Solutions</h3>
<p>Like any powerful tool, ${title} comes with its own set of challenges. The most common issues include integration complexities, performance optimization, and maintaining consistency across different use cases. Fortunately, each challenge has proven solutions that we'll explore in detail, ensuring you're well-equipped to handle any situation that arises.</p>

<h3>Advanced Techniques and Strategies</h3>
<p>Once you've mastered the basics, it's time to explore advanced techniques that can take your ${title} implementation to the next level. These include optimization strategies, customization options, and integration with complementary technologies. Advanced users can also explore automation possibilities and develop custom workflows tailored to their specific needs.</p>

<h3>Real-World Applications and Case Studies</h3>
<p>The true power of ${title} becomes evident when we examine its real-world applications. From small startups to large enterprises, organizations across various industries have leveraged this technology to achieve remarkable results. We'll analyze several case studies that demonstrate the transformative impact of proper implementation.</p>

<h3>Future Trends and Developments</h3>
<p>The field of ${title} is constantly evolving, with new innovations and improvements emerging regularly. Staying informed about upcoming trends and technological advancements will help you maintain a competitive edge. We'll discuss what the future holds and how you can prepare for upcoming changes and opportunities.</p>

<h3>Conclusion: Your Path to Mastery</h3>
<p>${title} offers tremendous potential for those willing to invest the time and effort to master it. By following the guidelines and strategies outlined in this comprehensive guide, you'll be well-equipped to leverage this powerful technology effectively. Remember that learning is a continuous journey, and staying curious and open to new ideas will serve you well.</p>

<p>As you continue your exploration of ${title}, don't hesitate to experiment, ask questions, and seek out additional resources. The community of practitioners is always ready to help, and sharing knowledge benefits everyone involved. Your success with ${title} is limited only by your dedication and willingness to learn.</p>

<p><strong>Ready to take the next step?</strong> Start implementing what you've learned today and join the thousands of professionals who have already transformed their work with ${title}. The journey of a thousand miles begins with a single step, and you've already taken the first one by reading this guide.</p>`;

        return {
            title: title,
            slug: slug,
            content: content,
            status: "active"
        };
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
                    userId: userData.$id,
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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap px-4">
            <div className="w-full lg:w-2/3 lg:pr-4">
                <div className="flex gap-2 mb-4">
                    <Input
                        label="Title :"
                        placeholder="title"
                        className="flex-1 bg-[#1e293b] text-slate-200 font-semibold border-slate-700 focus:border-indigo-500 rounded-xl"
                        {...register("Title", { required: true })}
                    />
                    <Button
                        type="button"
                        onClick={generateContentWithAI}
                        disabled={isGenerating}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-fit self-end"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Generating...
                            </>
                        ) : (
                            <>
                                ✨ Generate with AI
                            </>
                        )}
                    </Button>
                </div>
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 bg-[#1e293b] text-slate-200 font-semibold border-slate-700 focus:border-indigo-500 rounded-xl"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Contant :" name="Contant" control={control} defaultValue={getValues("Contant")} />
            </div>
            <div className="w-full lg:w-1/3 lg:pl-4 mt-6 lg:mt-0">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.Title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 duration-300 ${post ? "bg-green-600 hover:bg-green-500 shadow-green-900/20": "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30"} active:scale-95`}>
                    
                    {post ? "Update Blog" : "Publish Blog"}
                </Button>
            </div>
        </form>
    );
}

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

        setIsGenerating(true);
        
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

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
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
                    // Extract JSON from the response
                    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        parsedContent = JSON.parse(jsonMatch[0]);
                    } else {
                        throw new Error("No JSON found in response");
                    }
                } catch (parseError) {
                    console.log("Failed to parse JSON, using raw content");
                    // Fallback: use the raw text as content
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
            alert("Failed to generate content. Please try again or write manually.");
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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
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
            <div className="w-1/3 px-2">
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

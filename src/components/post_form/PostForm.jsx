import React, { useCallback } from "react";
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
                <Input
                    label="Title :"
                    placeholder="title"
                    className="mb-4 bg-[#1e293b] text-slate-200 font-semibold border-slate-700 focus:border-indigo-500 rounded-xl"
                    {...register("Title", { required: true })}
                />
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
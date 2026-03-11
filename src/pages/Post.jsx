
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
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
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
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
                    <div className="w-full max-w-4xl mb-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center">{post.Title}</h1>
                    </div>
                    
                    {/* Content Section */}
                    <div className="w-full max-w-4xl">
                        <div className="post-content">
                            {post?.Contant ? 
                                parse(String(post.Contant))
                            : "Loading content..."}
                        </div>
                    </div>

                    {/* Author Profile Section */}
                    <div className="w-full max-w-4xl mt-8">
                        <div className="flex items-center justify-center sm:justify-start p-4 bg-slate-100 rounded-lg border border-slate-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {post?.authorName?.charAt(0).toUpperCase() || userData?.name?.charAt(0).toUpperCase() || 'A'}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">
                                        Published by {post?.authorName || userData?.name || 'Anonymous'} on 
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

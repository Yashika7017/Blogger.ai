import { Container, PostCard } from '../components'
import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { Query } from "appwrite";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (userData) {
            console.log('Current user data:', userData);
            console.log('Current user ID:', userData.$id);
            
            // Get only current user's posts
            appwriteService.getPosts([
                Query.equal("userId", userData.$id)
            ]).then((posts) => {
                if (posts) {
                    console.log('Fetched posts:', posts.documents);
                    console.log('Post user IDs:', posts.documents.map(p => ({ id: p.$id, userId: p.userId, title: p.Title })));
                    
                    // Filter out test posts
                    const filteredPosts = posts.documents.filter(post => 
                        !post.Title.includes("Blogger.ai Test") && 
                        !post.Title.includes("Check AI responce") &&
                        !post.Title.includes("Check AI response")
                    );
                    console.log('Filtered posts:', filteredPosts);
                    setPosts(filteredPosts)
                }
            })
        }
    }, [userData])

    if (!userData) {
        return (
            <div className='w-full py-8 min-h-screen px-2 sm:px-4 md:px-6 lg:px-8'>
                <Container>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
                        <p className="text-gray-600">You need to be logged in to view your posts.</p>
                    </div>
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 min-h-screen px-2 sm:px-4 md:px-6 lg:px-8'>
                <Container>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800 mb-4">No Posts Yet</h1>
                        <p className="text-gray-600 mb-6">You haven't created any posts yet. Start writing your first blog post!</p>
                        <a 
                            href="/add-post" 
                            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-200"
                        >
                            Create Your First Post
                        </a>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8 min-h-screen px-2 sm:px-4 md:px-6 lg:px-8'>
            <div className="mb-8">
                <Container>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">My Posts</h1>
                    <p className="text-gray-600">Manage and view all your blog posts</p>
                </Container>
            </div>
            
            {/* Mobile: Vertical Layout */}
            <div className='flex flex-col space-y-4 sm:hidden'>
                {posts.map((post) => (
                    <PostCard 
                        key={post.$id} 
                        {...post} 
                        content={post.Contant}
                        authorName={post.authorName}
                        userId={post.userId}
                    />
                ))}
            </div>
            
            {/* Desktop: Grid Layout */}
            <div className='hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {posts.map((post) => (
                    <PostCard 
                        key={post.$id} 
                        {...post} 
                        content={post.Contant}
                        authorName={post.authorName}
                        userId={post.userId}
                    />
                ))}
            </div>
        </div>
    )
}

export default AllPosts
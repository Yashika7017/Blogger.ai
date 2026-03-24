import { Container, PostCard } from '../components'
import React, {useState, useEffect} from 'react'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                // Filter out test posts
                const filteredPosts = posts.documents.filter(post => 
                    !post.Title.includes("Blogger.ai Test") && 
                    !post.Title.includes("Check AI responce") &&
                    !post.Title.includes("Check AI response")
                );
                setPosts(filteredPosts)
            }
        })
    }, [])
  return (
    <div className='w-full py-8 min-h-screen px-4 sm:px-6 lg:px-8'>
        {/* Mobile: Vertical Layout with proper padding */}
        <div className='flex flex-col space-y-4 sm:hidden px-2'>
            {posts.map((post) => (
                <div key={post.$id} className='w-full'>
                    <PostCard {...post} content={post.Contant} />
                </div>
            ))}
        </div>
        
        {/* Desktop: Grid Layout */}
        <div className='hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {posts.map((post) => (
                <PostCard key={post.$id} {...post} content={post.Contant} />
            ))}
        </div>
    </div>
  )
}

export default AllPosts
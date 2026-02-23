import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap gap-6 justify-center'>
                {/* {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))} */}

                {posts.map((post) => (
                <PostCard key={post.$id} {...post} />))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts
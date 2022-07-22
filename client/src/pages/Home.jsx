import React from "react";
import { useEffect, useState } from 'react';
import PostDetails from "../components/PostDetails";

function Home() {

    const [posts, setPosts] = useState(null);

    useEffect(()=> {
        const fetchPosts = async()=> {
            const response = await fetch('/api/posts/');
            const json = await response.json();
            if(response.ok) {
                setPosts(json);
                console.log(posts);
            }
        }

        fetchPosts();
    }, [])

    return(
        <div className="home">
            <div className="posts">
                {posts && posts.map((post)=> (
                    <PostDetails key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Home;
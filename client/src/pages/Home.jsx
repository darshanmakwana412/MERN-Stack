import React from "react";
import { useEffect, useState } from 'react';
import PostDetails from "../components/PostDetails";
import PostForm from "../components/PostForm";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {

    const {posts, dispatch} = usePostsContext();
    const { user } = useAuthContext();

    useEffect(()=> {
        const fetchPosts = async()=> {
            const response = await fetch('/api/posts/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();


            if(response.ok) {
                dispatch({type: "SET_POSTS", payload: json})
            }
        }

        if(user) {
            console.log("1");
            fetchPosts();
            console.log("2");
        }

    }, [dispatch, user])

    return(
        <div className="home">
            <div className="posts">
                {posts && posts.map((post)=> (
                    <PostDetails key={post._id} post={post} />
                ))}
            </div>
            <PostForm />
        </div>
    )
}

export default Home;
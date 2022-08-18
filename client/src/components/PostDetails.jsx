import React from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function PostDetails(props) {

    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();

    const handleClick = async ()=> {

        if(!user) {
            return
        }

        const response = await fetch('/api/posts/'+props.post._id, {
            method:"DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if(response.ok){
            dispatch({type:"DELETE_POST", payload: json})
        }
    }

    return(
        <div className="post-details">
            <h4>{props.post.title}</h4>
            <p><strong>{props.post.content}</strong></p>
            <p><strong>{props.post.author}</strong></p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
}

export default PostDetails;
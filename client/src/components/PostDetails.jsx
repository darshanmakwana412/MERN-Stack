import React from "react";

function PostDetails(props) {
    return(
        <div>
            <h4>{props.post.title}</h4>
            <p><strong>{props.post.content}</strong></p>
            <p><strong>{props.post.author}</strong></p>
        </div>
    )
}

export default PostDetails;
import React from "react";
import { useState } from "react";

function PostForm(props) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e)=> {
        e.preventDefault()
        const Post = {title, content, author}

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(Post),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setTitle('')
            setContent('')
            setAuthor('')
            setError(null)
            console.log("New Post Added", json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Post</h3>
            <label>Post Title</label>
            <input
                type="text"
                onChange={(e)=> {setTitle(e.target.value)}}
                value={title}
            />
            <label>Post Content</label>
            <input
                type="text"
                onChange={(e)=> {setContent(e.target.value)}}
                value={content}
            />
            <label>Post Author</label>
            <input
                type="text"
                onChange={(e)=> {setAuthor(e.target.value)}}
                value={author}
            />
            <button>Add Post</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PostForm;
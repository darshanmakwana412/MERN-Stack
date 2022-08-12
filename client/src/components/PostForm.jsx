import React from "react";
import { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";

function PostForm(props) {

    const { dispatch } = usePostsContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

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
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setTitle('')
            setContent('')
            setAuthor('')
            setError(null)
            setEmptyFields([])
            console.log("New Post Added", json)
            dispatch({type: 'CREATE_POSTS', payload: json})
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
                className={emptyFields.includes('title')?'error':''}
            />
            <label>Post Content</label>
            <input
                type="text"
                onChange={(e)=> {setContent(e.target.value)}}
                value={content}
                className={emptyFields.includes('content')?'error':''}
            />
            <label>Post Author</label>
            <input
                type="text"
                onChange={(e)=> {setAuthor(e.target.value)}}
                value={author}
                className={emptyFields.includes('author')?'error':''}
            />
            <button>Add Post</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PostForm;
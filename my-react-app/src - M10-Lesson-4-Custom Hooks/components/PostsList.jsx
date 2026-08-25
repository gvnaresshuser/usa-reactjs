import React from 'react';
import useFetch from '../hooks/useFetch';

function PostsList() {
    const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts');

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Posts</h2>
            <button onClick={refetch}>🔄 Refresh</button>
            <ul>
                {data.slice(0, 15).map(post => (
                    <li key={post.id}>
                        <strong>{post.title}</strong><br />
                        {post.body}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostsList;

import { useParams } from "react-router-dom";
import { fetchResource, addResource, updateResource, deleteResource } from "./DBAPI";
import { useState, useEffect, useContext } from "react";
import Post from "./Post";
import { userContext } from "./App";

function Forum() {
    const { forumId } = useParams();
    const [forumInfo, setForumInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostContent, setNewPostContent] = useState("");
    const [selectedPostId, setSelectedPostId] = useState(null);
    const { contextUser } = useContext(userContext);

    const fetchForumData = async () => {
        if (forumId) {
            try {
                const forum = await fetchResource(`forums/${forumId}`);
                setForumInfo(forum);
            } catch (err) {
                console.error("Error fetching forum info:", err);
            }
        }
    };

    const fetchPosts = async () => {
        if (forumId) {
            try {
                const postsData = await fetchResource("posts", { forumId });
                setPosts(postsData || []);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        }
    };

    const handleAddPost = async () => {
        if (!contextUser) {
            alert("Please log in to add a post.");
            return;
        }
        if (!newPostTitle.trim() || !newPostContent.trim()) {
            alert("Please provide both a title and content for the post.");
            return;
        }
        try {
            const newPost = {
                title: newPostTitle,
                content: newPostContent,
                forumId: Number(forumId),
                userId: contextUser.id,
            };
            await addResource("posts", newPost);
            setNewPostTitle("");
            setNewPostContent("");
            fetchPosts();
        } catch (err) {
            console.error("Error adding post:", err);
        }
    };

    const handlePostUpdated = async (id, updatedData) => {
        try {
            await updateResource("posts", id, updatedData);
            fetchPosts();
        } catch (err) {
            console.error("Error updating post:", err);
        }
    };

    const handlePostDeleted = async (id) => {
        try {
            await deleteResource("posts", id);
            fetchPosts();
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };

    const handleSelectPost = (id) => {
        setSelectedPostId(prev => (prev === id ? null : id));
    };

    useEffect(() => {
        fetchForumData();
        fetchPosts();
    }, [forumId]);

    return (
        <div>
            {forumInfo && (
                <>
                    <h1>{forumInfo.title}</h1>
                    <p>{forumInfo.description}</p>
                </>
            )}

            <h2>Posts</h2>
            
            {contextUser && (
                <div>
                    <h3>Add New Post</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <br />
                    <textarea
                        placeholder="Content"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    />
                    <br />
                    <button onClick={handleAddPost}>Add Post</button>
                </div>
            )}

            {posts.map(post => (
                <Post
                    key={post.id}
                    post={post}
                    WhosPosts="forumPosts"
                    onPostUpdated={handlePostUpdated}
                    onPostDeleted={handlePostDeleted}
                    isSelected={post.id === selectedPostId}
                    onSelect={() => handleSelectPost(post.id)}
                />
            ))}
        </div>
    );
}

export default Forum;

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchResource, addResource, updateResource, deleteResource } from "./DBAPI";
import { userContext } from "./App";
import Post from "./Post";


export default function Posts() {
  const { userId } = useParams();
  const { contextUser } = useContext(userContext);

  const [posts, setPosts] = useState<PostData>([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const fetchPosts = async () => {
    try {
      const data = await fetchResource("posts", { userId });
      setPosts(data || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleAddPost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert("Please provide both title and content for the post.");
      return;
    }

    const newPost = {
      userId: Number(userId),
      title: newPostTitle,
      content: newPostContent,
      forumId: 1  // לדוגמה. תרצי להתאים לפורום הנוכחי
    };

    try {
      await addResource("posts", newPost);
      setNewPostTitle("");
      setNewPostContent("");
      fetchPosts();
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  const handlePostUpdated = async (id: number, updatedData: Partial<PostData>) => {
    try {
      await updateResource("posts", id, updatedData);
      fetchPosts();
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const handlePostDeleted = async (id: number) => {
    try {
      await deleteResource("posts", id);
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userId]);

  return (
    <div>
      <h1>Posts for {contextUser?.name || `User ${userId}`}</h1>

      <div>
        <h2>Add New Post</h2>
        <input
          type="text"
          placeholder="Enter Post title..."
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Post content..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>

      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onPostUpdated={handlePostUpdated}
            onPostDeleted={handlePostDeleted}
            isSelected={post.id === selectedPostId}
            onSelect={() => setSelectedPostId(post.id === selectedPostId ? null : post.id)}
          />
        ))}
      </div>
    </div>
  );
}

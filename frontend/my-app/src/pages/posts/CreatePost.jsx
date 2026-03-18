import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/Axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const CreatePost = () => {
  const navigate = useNavigate();
  // const posts = usePostStore((state) => state.posts);import it first

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formData = {
    title,
    content,
  };

  const addPost = async (postData) => {
    setLoading(true);
    setError("");

    try {
      /*const resp =*/ await API.post("/api/posts", postData);
      // localStorage.setItem("token", resp.data.token);
    } catch (error) {
      console.error(error);
      setError(
        `${error.response?.status === 401 ? "you have to Create account to post" : error.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await addPost(formData);

    if (success) {
      setTitle("");
      setContent("");
      navigate("/");
    }
  };
  return (
    <div className="px-5">
      <Navbar />
      <h2 className="text-center font-bold my-3">Create a post</h2>
      {error && (
        <p className=" mb-3 font-bold bg-red-100 p-2 rounded border border-red-400">
          Error: <span className="text-red-500 font-normal">{error}</span>
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="border p-3 rounded max-w-3xl mx-auto"
      >
        <div>
          <label className="font-semibold">Post Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Post title.."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded border-gray-300 p-1 mb-2 block"
          />
        </div>
        <div>
          <label className="font-semibold">Post Content:</label>
          <textarea
            name="content"
            id="content"
            placeholder="Type your content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border rounded border-gray-300 h-20 block"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-200 border border-gray-400 rounded px-4 py-1 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300 mt-2"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default CreatePost;

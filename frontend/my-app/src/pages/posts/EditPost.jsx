import React, { useState } from "react";

const EditPost = ({ post }) => {
  const [editData, setEditData] = useState({
    title: post.title || "",
    content: post.content || "",
    category: post.category || "",
    tags: post.tags.splite(", "),
  });
  const CATEGORIES = ["education", "tech", "entertainment"];
  const handleSave = "";
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const addTag = () => {
    console.log("add multiple tags for this post");
  };

  return (
    <div>
      <h2>Edit Post</h2>

      <form onSubmit={handleSave}>
        <div>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="post title"
            value={editData.title}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {/* content editor */}
        <div>
          <textarea
            name="content"
            id="content"
            placeholder="write your idea..."
            value={editData.content}
            onChange={handleChange}
            className="min-h-30 p-2 border border-gray-300 rounded"
          />

          <h2>2 characters</h2>
        </div>

        {/* category */}
        <div>
          <select name="category" id="category">
            {CATEGORIES.map((cat) => (
              <option value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* tags */}
        <div>
          <input type="text" name="tags" id="tags" />
          <button onClick={addTag} className="px-4 py-1 bg-black text-white">
            Add Tag
          </button>

          <div className="p-2 border border-gray-400 rounded mt-2">
            {post.tags.map((tag) => (
              <p>{tag}</p>
            ))}
          </div>
        </div>

        <div>
          <input type="file" name="image" id="image" />
        </div>
      </form>
    </div>
  );
};

export default EditPost;

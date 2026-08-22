import React, { useEffect, useState } from "react";
import { Bookmark, CircleUserRound, Ellipsis, MessageCircle, Share2, Megaphone, MessageSquare, Pin } from "lucide-react";
import { API } from "../api/Axios";
import { Link } from "react-router-dom";
import { ExploreSkeleton } from "../components/Loaders/Homepage.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const resp = await API.get("/api/posts");
        setPosts(resp.data.posts);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch posts");
        console.log("MSG: ", error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filterPosts = (tab) => {
    if (tab === "all") return posts;
    if (tab === "announcements") return posts.filter((post) => post.isAnnouncement || post.user?.role === "teacher" || post.user?.role === "admin");
    if (tab === "discussions") return posts.filter((post) => !post.isAnnouncement && post.user?.role !== "teacher" && post.user?.role !== "admin");
    return posts;
  };

  const filteredPosts = filterPosts(activeTab);

  // Separate pinned posts
  const pinnedPosts = filteredPosts.filter((post) => post.isPinned);
  const regularPosts = filteredPosts.filter((post) => !post.isPinned);

  const activeTabStyle = "border-b-2 border-primary text-primary";

  return (
    <div className="max-w-3xl pt-2 mx-auto mt-5 text-foreground">
      <main className="px-4">
        {/* HEADER */}
        <header className="mb-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Campus Feed</h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/create-post"
                className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
              >
                ✏️ Write a Post
              </Link>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-6 mb-6 text-sm font-medium border-b border-gray-200 dark:border-gray-900">
            <button
              className={`pb-2 ${activeTab === "all" ? activeTabStyle : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("all")}
            >
              All Posts
            </button>
            <button
              className={`pb-2 ${activeTab === "announcements" ? activeTabStyle : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("announcements")}
            >
              📢 Announcements
            </button>
            <button
              className={`pb-2 ${activeTab === "discussions" ? activeTabStyle : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("discussions")}
            >
              💬 Discussions
            </button>
          </div>
        </header>

        {/* LOADING STATE */}
        {loading ? (
          <ExploreSkeleton />
        ) : error ? (
          <div className="p-6 text-center rounded-lg bg-red-50">
            <p className="text-red-600">{error}</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-8 text-center rounded-lg bg-gray-50">
            <p className="text-gray-500">No posts yet.</p>
            <p className="text-sm text-gray-400">Be the first to share something with your campus!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* PINNED POSTS */}
            {pinnedPosts.length > 0 && (
              <>
                {pinnedPosts.map((p, i) => (
                  <PostCard key={`pinned-${i}`} post={p} isPinned={true} />
                ))}
              </>
            )}

            {/* REGULAR POSTS */}
            {regularPosts.map((p, i) => (
              <PostCard key={i} post={p} isPinned={false} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// POST CARD COMPONENT
const PostCard = ({ post, isPinned }) => {
  // const isAnnouncement = post.isAnnouncement || post.user?.role === "teacher" || post.user?.role === "admin";
  return (
    <article className="p-5 transition-all duration-200 border rounded-lg shadow-sm border-border bg-background hover:shadow-md">
      <div className="space-y-3">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="">
              {post.user?.profile_img?.url ? (
                <div className="w-10 h-10 rounded-full">
                  <img src={post.user.profile_img.url} alt={post.user?.name} />
                </div>
              ) : (
                <div className="flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full dark:bg-gray-800">
                  <CircleUserRound className="text-gray-500 dark:text-gray-200" size={20} />
                </div>
              )}
            </div>

            {/* Author Info */}
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{post.user?.name || "Unknown User"}</p>
                {post.user?.role && <span className="text-xs">• {post.user.role}</span>}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Recent"}
                </span>

                {/* Badge
                {isAnnouncement ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                    <Megaphone size={12} />
                    Announcement
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    <MessageSquare size={12} />
                    Discussion
                  </span>
                )} */}

                {isPinned && (
                  <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-amber-700 bg-amber-100 rounded-full">
                    <Pin size={12} />
                    Pinned
                  </span>
                )}
              </div>
            </div>
          </div>

          <Ellipsis className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>

        {/* CONTENT */}
        <div>
          <Link to={`/posts/${post._id}`}>
            <h2 className="mb-2 text-xl font-semibold transition-colors hover:underline line-clamp-2">{post.title || "Untitled Post"}</h2>
          </Link>

          <Link to={`/posts/${post._id}`} className="flex gap-3 gap-4"></Link>
        </div>

        {/* READ MORE & ACTIONS */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-900">
          <Link to={`/posts/${post._id}`} className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-800">
            Read More →
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <MessageCircle size={16} />
              <span>{post.num_comments || 0}</span>
            </button>

            <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Bookmark size={16} />
              <span>Save</span>
            </button>

            <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Home;

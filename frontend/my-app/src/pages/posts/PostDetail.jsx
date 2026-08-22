import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../api/Axios";
import {
  Clock3,
  CalendarDays,
  Loader2,
  Bookmark,
  MessageSquare,
  Share2,
  HeartPlus,
  EllipsisVertical,
  ArrowLeft,
  User,
  Tag,
  Eye,
  ThumbsUp,
  Share,
  BookOpen,
  MessageCircle,
  Heart,
} from "lucide-react";
import DotLoader from "@/components/Loaders/DotLoader";
import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "@/components/Navbar";
import LikeBtn from "@/components/LikeBtn";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logged_in_User } = useAuthStore();

  const [post, setPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch post
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/api/posts/${id}`);
        setPost(res.data);
        setLikeCount(res.data.num_likes?.length || 0);
        setIsBookmarked(res.data.bookmarks?.includes(logged_in_User?._id) || false);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, logged_in_User?._id]);

  const authorId = post?.user?._id;

  // Fetch user posts
  useEffect(() => {
    if (!authorId) return;

    const fetchUserPosts = async () => {
      try {
        const res = await API.get(`/api/posts/users/${authorId}`);
        setUserPosts(res.data.posts || []);
      } catch (err) {
        console.error("Failed to fetch author posts:", err);
        setUserPosts([]);
      }
    };

    fetchUserPosts();
  }, [authorId]);

  // Comment Controller
  const [commentContent, setCommentContent] = useState("");
  const [commentType, setCommentType] = useState("");
  const [fetchingComments, setFetchingComments] = useState(false);
  const [sendingComment, setSendingComment] = useState(false);
  const [comments, setComments] = useState([]);

  const submitComment = async (e) => {
    e.preventDefault();
    setSendingComment(true);

    try {
      const res = await API.post(`/api/comments`, {
        postId: post._id,
        user: post.user?._id || post.user,
        content: commentContent,
        type: commentType ? commentType : "comment",
      });

      console.log("RES DATA: ", res.data);
      fetchComments();
      setCommentContent("");
      setCommentType("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to post comment");
    } finally {
      setSendingComment(false);
    }
  };

  const fetchComments = useCallback(async () => {
    setFetchingComments(true);
    try {
      const res = await API.get(`/api/comments/${post?._id}`);
      console.log("Comments API response:", res.data);
      setComments(res.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setFetchingComments(false);
    }
  }, [post?._id]);

  useEffect(() => {
    if (!post?._id) return;
    fetchComments();
  }, [fetchComments, post?._id]);

  // Handle bookmark
  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await API.delete(`/api/posts/${post._id}/bookmark`);
      } else {
        await API.post(`/api/posts/${post._id}/bookmark`);
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Check out this post: ${post.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate read time (rough estimate)
  const getReadTime = (content) => {
    if (!content) return "1 min read";
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DotLoader />
      </div>
    );
  }

  if (!post || Object.keys(post).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Post not found</h2>
          <Link to="/" className="inline-block mt-4 text-emerald-600 hover:underline">
            Return to feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="relative flex justify-center gap-8 px-4 mx-auto max-w-7xl">
        {/* Main Content */}
        <div className="flex-1 max-w-3xl pt-5 mx-auto mb-1 max-sm:px-3">
          <main className="justify-end flex-1">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 mb-5 transition-colors border rounded-lg dark:border-gray-700 hover:bg-muted"
              >
                <ArrowLeft size={18} /> Back
              </button>
            </div>

            {/* Header */}
            <div className="pb-5 mb-5 border-b border-border">
              {/* Author info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-blue-400 rounded-full">
                  {post.user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="font-semibold">{post.user?.name || "Anonymous"}</h3>
                  <p className="text-sm text-muted-foreground">@{post.user?.email || "user"}</p>
                </div>
              </div>

              <h1 className="pb-5 text-3xl font-bold capitalize leading-15 lg:text-5xl max-sm:mb-2">{post.title || "Untitled Post"}</h1>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose max-w-none dark:prose-invert [&_h2]:text-lg [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:p-1 [&_blockquote]:rounded [&_blockquote]:bg-muted [&_blockquote]:italic">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6 py-6 mt-6 border-t border-border">
              <LikeBtn postId={post._id} initialLikeCount={post.num_likes} />

              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isBookmarked ? "text-blue-500 bg-blue-50 dark:bg-blue-950/20" : "hover:bg-muted"
                }`}
              >
                <Bookmark size={20} className={isBookmarked ? "fill-blue-500" : ""} />
                <span className="max-sm:hidden">Save</span>
              </button>

              <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 transition-colors rounded-lg hover:bg-muted">
                <Share2 size={20} />
                <span className="max-sm:hidden">Share</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 transition-colors rounded-lg hover:bg-muted">
                <MessageSquare size={20} />
                <span>
                  {comments.length} <span className="max-sm:hidden">comments</span>
                </span>
              </button>
            </div>

            {/* Comment Section */}
            <div className="mt-8">
              <section className="pb-5">
                <h2 className="mb-5 text-lg font-medium">Responses ({comments.length})</h2>
                {fetchingComments ? (
                  <div className="flex flex-col gap-1">
                    <p className="w-full h-6 max-w-100 bg-muted animate-shimmer"></p>
                    <p className="w-[70%] max-w-70 h-3 bg-muted animate-shimmer"></p>
                    <p className="w-[50%] max-w-70 h-3 bg-muted animate-shimmer"></p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.length === 0 ? (
                      <p className="italic text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                    ) : (
                      comments.slice(0, 5).map((comment) => (
                        <div key={comment._id} className="p-4 border rounded-lg border-border">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-blue-400 rounded-full">
                              {comment.user?.name?.charAt(0) || "U"}
                            </div>
                            <h2 className="text-sm font-medium">{comment.user?.name || "Anonymous"}</h2>
                            <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="pl-10 text-sm italic">{comment.content}</p>
                        </div>
                      ))
                    )}

                    {comments.length > 5 && (
                      <button className="mt-2 text-sm text-blue-500 hover:underline">See all {comments.length} comments</button>
                    )}
                  </div>
                )}
              </section>

              {/* Write comment */}
              <section className="pt-6 border-t border-border">
                <h2 className="mb-3 text-xl italic font-medium">Leave your comment</h2>

                <form onSubmit={submitComment} className="space-y-3">
                  <textarea
                    type="text"
                    name="comment"
                    id="comment"
                    placeholder="What is your opinion..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="w-full h-32 p-3 transition-all border rounded-lg outline-none border-border"
                  />
                  <button
                    disabled={sendingComment || !commentContent.trim()}
                    className={`block bg-linear-to-b ${sendingComment || !commentContent.trim() ? "bg-muted dark:bg-gray-900 text-gray-700 cursor-not-allowed" : "bg-blue-500 hover:shadow-lg text-white"} px-4 py-3 w-full rounded-lg transition-all`}
                  >
                    {sendingComment ? (
                      <div className="flex items-center justify-center gap-1">
                        <Loader2 size={14} className="animate-spin" />
                        Posting...
                      </div>
                    ) : (
                      "Send Comment"
                    )}
                  </button>
                </form>
              </section>
            </div>

            {/* More by this user */}
            {userPosts.length > 1 && (
              <div className="px-2 pt-10 pb-5 mt-8 border-t border-border">
                <h2 className="flex items-center gap-1 mb-4 text-2xl font-bold">
                  More by <span className="">{post.user?.name?.split(" ")[0]}</span>
                </h2>

                <div className="space-y-2">
                  {userPosts
                    .filter((p) => p._id !== id)
                    .slice(0, 3)
                    .map((p) => (
                      <div className="p-4 border rounded-lg border-border bg-card dark:border-gray-800">
                        <Link to={`/posts/${p._id}`} className="block">
                          <h3 className="text-lg font-bold transition line-clamp-2">{p.title}</h3>
                          <p className="mt-2 text-gray-500 line-clamp-3">{p.content?.replace(/<[^>]*>/g, "")}</p>
                        </Link>

                        {/* Post Meta */}
                        <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-100 dark:border-gray-900">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Heart size={14} className="text-red-400" />
                              {p.num_likes || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle size={14} className="text-blue-400" />
                              {p.num_comments || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye size={14} className="text-purple-400" />
                              {p.views || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {userPosts.length > 3 && (
                  <div className="mt-3 text-center">
                    <Link to={`/users/${post.user._id}`} className="text-blue-500 underline">
                      see all {userPosts.length} posts
                    </Link>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>

        {/* Right Sidebar */}
        <aside className="hidden lg:block w-80 pt-7 h-fit">
          <div className="space-y-6">
            {/* About the Post Card */}
            <div className="p-5 border rounded-xl border-border bg-card">
              <h3 className="flex items-center gap-2 mb-4 text-lg font-bold">
                <BookOpen size={20} className="text-blue-500" />
                About this post
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Author</span>
                  <span className="font-medium">{post.user?.name || "Anonymous"}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Published</span>
                  <span className="font-medium">{formatDate(post.createdAt)}</span>
                </div>

                {post.updatedAt !== post.createdAt && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last updated</span>
                    <span className="font-medium">{formatDate(post.updatedAt)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Read time</span>
                  <span className="font-medium">{getReadTime(post.content)}</span>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-muted">#{post.category || "general"}</span>
                    {post.tags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded-full bg-muted">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-5 border rounded-xl border-border bg-card">
              <h4 className="mb-3 text-sm font-semibold tracking-wider uppercase text-muted-foreground">Post Statistics</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 text-center rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">{post.views || 0}</p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">{likeCount}</p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">{comments.length}</p>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
                <div className="p-3 text-center rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">{userPosts.length}</p>
                  <p className="text-xs text-muted-foreground">Posts by author</p>
                </div>
              </div>
            </div>

            {/* Author Card */}
            <div className="p-5 border rounded-xl border-border bg-card">
              <h4 className="mb-3 text-sm font-semibold tracking-wider uppercase text-muted-foreground">About the Author</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-black rounded-full">
                  {post.user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-semibold">{post.user?.name || "Anonymous"}</p>
                  <p className="text-xs text-muted-foreground">@{post.user?.username || "user"}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.user?.bio || "Passionate writer sharing insights and stories."}</p>
              <Link to={`/users/${post.user?._id}`} className="block w-full mt-3 text-sm text-center text-blue-500 hover:underline">
                View Profile →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default PostDetail;

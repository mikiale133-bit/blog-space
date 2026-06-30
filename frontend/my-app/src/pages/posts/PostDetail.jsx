import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../api/Axios";
import {
  MapPin,
  User,
  Mail,
  ShieldCheck,
  ExternalLink,
  SquaresIntersect,
  CornerDownRightIcon,
  Dot,
  Menu,
  Clock3,
  CalendarDays,
  Loader2,
} from "lucide-react";
import Footer from "../../components/Footer";
import DotLoader from "@/components/Loaders/DotLoader";
import { useAuthStore } from "@/store/useAuthStore";

const PostDetail = () => {
  const { id } = useParams();
  const { logged_in_User } = useAuthStore();

  const [user, setUser] = useState(null);

  const [post, setPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // the post and recent posts
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        // const [postResp, recentResp] = await Promise.all([
        //   API.get(`/api/posts/${id}`),
        //   API.get("/api/posts/recents"),
        // ]);
        const postResp = await API.get(`/api/posts/${id}`);
        const recentResp = await API.get("/api/posts/recents");

        setPost(postResp.data);
        setRecentPosts(recentResp.data || []);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const authorId = post?.user?._id;
  // user posts
  useEffect(() => {
    // GUARD: Don't do anything if authorId isn't loaded
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

  // fetch user
  useEffect(() => {
    if (!authorId) return;
    const fetchUser = async () => {
      try {
        const res = await API.get(`/api/users/${authorId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      }
    };

    if (authorId) {
      fetchUser();
    }
  }, [authorId]);
  console.log("loged_in: ", logged_in_User);

  // Comment Contoller
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
      alert(error.response.data.message);
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

  console.log("comments: ", comments);
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <DotLoader />
      </div>
    );
  }

  // If loading is finished and post is still null, show error
  if (!post || Object.keys(post).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Post not found</h2>
          <Link to="/" className="text-emerald-600 hover:underline mt-4 inline-block">
            Return to feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] text-foreground bg-slate-50 post-details pt-10">
      <main className="mx-auto px-1 md:flex justify-between items-start gap-2 max-w-6xl">
        {/* Header / left sidebar */}

        {/* Middle - Main Content */}
        <main className="flex-1 max-w-200 justify-end">
          <div className="grid grid-cols-1 gap-0 rounded-lg overflow-hidden md:px-8">
            <section className="px-2 py-5 mb-5">
              <div className="flex gap-2 italic items-center">
                <div className="w-5 h-5 bg-yellow-500 rounded-full">
                  <img src={post.user.profile_img.url} />
                </div>
                <h2>{post.user.name}</h2>
              </div>

              <h1 className="text-2xl lg:text-5x font-extrabold max-sm:mb-2 pb-5 leading-10 capitalize italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi modi
              </h1>

              {post.image?.url && (
                <div className="mb-5 rounded-xl overflow-hidden aspect-square max-h-70 w-full bg-gray-300">
                  <img src={post.image.url} alt="Post content" className="w-full h-auto object-cover" />
                </div>
              )}

              {/* Stats */}
              <div className="ml-3 flex gap-4 items-center my-3 font-serif text-gray-900">
                <div className="flex gap-0.5 items-center">
                  <p className="w-5 h-5 -mr-4 rounded-full bg-blue-500"></p>
                  <p className="w-5 h-5 rounded-full bg-yellow-500"></p>
                  <p className="w-5 h-5 -ml-4 rounded-full bg-green-500"></p>
                  <p className="text-xs">4 people</p>
                </div>

                <div className="text-xs text-gray-400">|</div>

                <div className="flex gap-1 items-center">
                  <CalendarDays className={"text-blue-500"} size={15} />
                  <p className="text-sm">Jun 14, 2026</p>
                </div>

                <div className="text-xs text-gray-400">|</div>

                <div className="flex gap-1 items-center">
                  <Clock3 className={"text-blue-500"} size={15} />
                  <p className="text-sm ">
                    <span className=" font-bold">5</span> min read
                  </p>
                </div>
              </div>

              <div
                className="prose max-w-none dark:prose-invert [&_h2]:text-lg [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:p-1 [&_blockquote]:rounded [&_blockquote]:bg-muted [&_blockquote]:italic"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </section>
          </div>

          <div className="p-5 mt-3 text-lg rounded-xl mb-10 leading-10">
            <p className="text-lg leading-10">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure nemo incidunt, ducimus et exercitationem atque quisquam nesciunt error,
              ex quod nisi hic est dolores consequatur aspernatur qui maxime. Ullam, recusandae? Lorem ipsum dolor sit, amet consectetur adipisicing
              elit. Iure nemo incidunt, ducimus et exercitationem atque quisquam nesciunt error, ex quod nisi hic est dolores consequatur aspernatur
              qui maxime. Ullam, recusandae?
            </p>
            <br />
            <h2 className="font-bold text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, itaque?</h2>
            <br />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure nemo incidunt, ducimus et exercitationem atque quisquam nesciunt error, ex
            quod nisi hic est dolores consequatur aspernatur qui maxime. Ullam, recusandae?
            <br /> <br />
            <h2 className="font-bold text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, itaque?</h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea unde cupiditate quis consequuntur molestias earum odit velit veniam, eveniet
            <p>
              quod! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam provident omnis inventore soluta! Odio ullam repellendus
              delectus. Enim, cupiditate itaque!
            </p>
          </div>

          {/* comments Section */}
          <section className="pb-5 pt-15 ml-3 p-2 bg-white">
            <h2 className="font-medium text-lg mb-5">Comments</h2>
            {fetchingComments ? (
              <div className="flex flex-col gap-1">
                <p className="w-full max-w-100 h-6 bg-gray-200 animate-shimmer"></p>
                <p className="w-[70%] max-w-70 h-3 bg-gray-200 animate-shimmer"></p>
                <p className="w-[50%] max-w-70 h-3 bg-gray-200 animate-shimmer"></p>
              </div>
            ) : (
              <div className="space-y-2">
                {comments?.map((comment) => (
                  <div key={comment._id} className="relative rounded-lg">
                    <div className="flex gap-2 items-center">
                      <Link to={`/users/${comment.user._id}`}>
                        <img src={comment.user.profile_img.url} alt="" className="w-5 h-5 rounded-full mt-" />
                      </Link>
                      <h2 className="text-gray-700 text-sm">{comment.user.name}</h2>
                    </div>
                    <CornerDownRightIcon size={17} className="inline text-gray-400 absolute left-3 top-6" />
                    <div>
                      <h2 className="pl-8 italic line-clamp-3">{comment.content}</h2>
                      {comment.user._id === logged_in_User?._id && "Hi"}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Write comment */}
          <section className="pb-15 ml-3 p-5 bg-linear-to-br from-white via-indigo-100 to-gray-50 rounded-lg border-gray-300">
            <h2 className="font-medium text-xl mb-3 italic ">Leave your comment</h2>

            <form onSubmit={submitComment} className="space-y-3">
              <textarea
                type="text"
                name="comment"
                id="comment"
                placeholder="What is your opinion..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg w-full h-40"
              />
              {/* <input
                type="text"
                name="comment"
                id="comment"
                placeholder="e.g.. question"
                value={commentType}
                onChange={(e) => setCommentType(e.target.value)}
                className="border block border-gray-400 p-1 mt-2 rounded"
              /> */}
              <button
                disabled={sendingComment}
                className={`block bg-linear-to-b ${sendingComment ? "bg-gray-500" : "bg-linear-to-b from-blue-500 to-indigo-500"}  text-white px-4 py-1 mt-21`}
              >
                {sendingComment ? (
                  <div className="flex gap-1 items-center">
                    <Loader2 size={14} className="animate-spin" />
                    Posting
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </section>

          {/* More by this user */}
          <div className="px-2 pt-10 pb-5">
            {userPosts.length > 0 && (
              <h2 className="font-bold text-2xl dark:text-gray-300 lg:text-3xl mb-2 flex gap-1 items-center">
                More by
                <p>{post.user.name.split(" ")[0]}</p>
              </h2>
            )}

            <div className="grid grid-cols-2 gap-2">
              {userPosts.length > 0 ? (
                userPosts
                  .filter((p) => p._id !== id)
                  .map((p) => (
                    <Link
                      to={`/posts/${p._id}`}
                      key={p._id}
                      className="p-3  rounded-lg hover:border-emerald-500 transition-colors bg-white shadow-sm"
                    >
                      <img src={post.image.url} alt="" className="rounded-lg" />
                      <h2 className="text-lg font-medium">{p.title}</h2>
                    </Link>
                  ))
              ) : (
                <p className="text-slate-500 italic"></p>
              )}
            </div>
          </div>
        </main>

        {/* Right Tab Bar - Desktop */}
        <aside className="rounded-lg lg:p-3 grow flex-1 overflow-y-auto min-w-40  max-w-90  border-border">
          <section className="flex flex-col items-center justify-start fap-3 px- py-10 rounded-xl bg-white border-blue-200 min-h-100 border">
            <Link to={`/users/${post?.user?._id}`}>
              {user?.profile_img && user?.profile_img?.url ? (
                <img src={user.profile_img.url} alt="profile" className="w-15 h-15 rounded-full object-cover border border-gray-200" />
              ) : (
                <div className="bg-gray-100 w-15 h-15 rounded-full border border-gray-500 flex items-center justify-center">
                  <User size={24} className="text-gray-400" />
                </div>
              )}
            </Link>

            <div className="">
              <p className="text-blue-500">{post?.user?.name || "Unknown Author"}</p>
            </div>
          </section>

          <div className="sticky top-0 flex justify-between mt-8 bg-white items-center p-3  border-border mb-1 rounded-b-[1%] border-b-blue-300">
            <h2 className="font-bold">Latest Posts</h2>
            <div className="text-sm font-bold text-gray-400">{recentPosts.length} posts</div>
          </div>

          <div className="space-y-2 grid ">
            {recentPosts.map((p) => (
              <div key={p._id} className="flex gap-2 items-center">
                <Link
                  to={`/posts/${p._id}`}
                  className="w-full group flex items-center gap-3 border-b border-b-gray-300 p-1 sition-all bg-white rounded-xl hover:shadow"
                >
                  <div>
                    <div src={p.image?.url} alt="" className="w-20 h-20 object-cover rounded-xl bg-gray-100" />
                  </div>

                  <h2 className="group-hover:text-gray-600 line-clamp-2 text-sm font-semibold leading-relaxed">{p.title}</h2>
                </Link>
              </div>
            ))}
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;

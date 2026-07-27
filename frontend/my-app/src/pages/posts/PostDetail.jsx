import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../api/Axios";
import { Clock3, CalendarDays, Loader2, Bookmark, MessageSquare, Share2, HeartPlus, EllipsisVertical } from "lucide-react";
import DotLoader from "@/components/Loaders/DotLoader";
import { useAuthStore } from "@/store/useAuthStore";

const PostDetail = () => {
  const { id } = useParams();
  const { logged_in_User } = useAuthStore();

  const [post, setPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
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
        const res = await API.get(`/api/posts/${id}`);

        setPost(res.data);
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
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Post not found</h2>
          <Link to="/" className="text-emerald-600 hover:underline mt-4 inline-block">
            Return to feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white dark:bg-background">
      <div className="mx-auto max-w-3xl pt-5 mb-1 bg-white dark:bg-muted/50">
        <main className="flex-1 max-w-200 justify-end">
          {/* Header & image */}
          <div className="p-2 md:p-6">
            <h1 className="text-2xl lg:text-5x font-extrabold max-sm:mb-2 pb-5 leading-10 capitalize italic">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas excepturi modi
            </h1>

            {post.image?.url && (
              <div className="mb-5 rounded-xl overflow-hidden aspect-square max-h-70 w-full bg-muted/30 max-w-180">
                <img src={post.image.url} alt="Post content" className="w-full h-auto object-cover" />
              </div>
            )}

            {/* Stats */}
            <div className="ml-3 flex gap-4 items-center my-3 font-serif">
              <div className="flex gap-0.5 items-center">
                <p className="w-5 h-5 -mr-4 rounded-full bg-blue-500"></p>
                <p className="w-5 h-5 rounded-full bg-yellow-500"></p>
                <p className="w-5 h-5 -ml-4 rounded-full bg-green-500"></p>
                <p className="text-xs">4 people</p>
              </div>

              <div className="flex gap-1 items-center">
                <CalendarDays className={"text-blue-500"} size={15} />
                <p className="text-sm">Jun 14, 2026</p>
              </div>

              <div className="flex gap-1 items-center">
                <Clock3 className={"text-blue-500"} size={15} />
                <p className="text-sm ">
                  <span className="">6</span> min read
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-2 md:p-6">
            <div
              className="prose max-w-none dark:prose-invert [&_h2]:text-lg [&_h2]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-500 [&_blockquote]:p-1 [&_blockquote]:rounded [&_blockquote]:bg-muted [&_blockquote]:italic"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-3 text-lg rounded-xl mb-10 leading-10">
              <p className="text-lg leading-10">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure nemo incidunt, ducimus et exercitationem atque quisquam nesciunt error,
                ex quod nisi hic est dolores consequatur aspernatur qui maxime. Ullam, recusandae? Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Iure nemo incidunt, ducimus et exercitationem atque quisquam nesciunt error, ex quod nisi hic est dolores consequatur aspernatur
                qui maxime. Ullam, recusandae?
              </p>
              <br />
              <h2 className="font-bold text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, itaque?</h2>
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure nemo incidunt, ducimus et exercitationem atque quisquam nesciunt error,
              ex quod nisi hic est dolores consequatur aspernatur qui maxime. Ullam, recusandae?
              <br /> <br />
              <h2 className="font-bold text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, itaque?</h2>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea unde cupiditate quis consequuntur molestias earum odit velit veniam,
              eveniet
              <p>
                quod! Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam provident omnis inventore soluta! Odio ullam repellendus
                delectus. Enim, cupiditate itaque!
              </p>
            </div>
          </div>

          {/* comment section */}
          <div className="">
            {/* comments List */}
            <section className="pb-5 pt-15 p-2 md:p-6 bg-muted/50">
              <h2 className="font-medium text-lg mb-5">Responses</h2>
              {fetchingComments ? (
                <div className="flex flex-col gap-1">
                  <p className="w-full max-w-100 h-6 bg-muted animate-shimmer"></p>
                  <p className="w-[70%] max-w-70 h-3 bg-muted animate-shimmer"></p>
                  <p className="w-[50%] max-w-70 h-3 bg-muted animate-shimmer"></p>
                </div>
              ) : (
                <div className="space-y-3  bg-background/50 p-3">
                  {comments?.map((comment) => (
                    <div key={comment._id} className="relative">
                      <div className="flex gap-2 items-center">
                        <div to={`/users/${comment.user._id}`} className="w-5 h-5 bg-muted rounded-full">
                          <img src={comment.user.profile_img?.url} alt="" className="w-5 h-5 rounded-full mt-" />
                        </div>
                        <h2 className="text-text-primary text-sm">{comment.user.name}</h2>
                      </div>

                      <div>
                        <h2 className="pl-8 italic line-clamp-3">{comment.content}</h2>
                        {comment.user._id === logged_in_User?._id && "Hi"}
                      </div>
                    </div>
                  ))}

                  <button className="underline ml-2 mt-1">See all comments</button>
                </div>
              )}
            </section>

            {/* Write comment */}
            <section className="pb-15 p-2 md:p-6 bg-linear-to-br  bg-muted/50 border-gray-300">
              <h2 className="font-medium text-xl mb-3 italic ">Leave your comment</h2>

              <form onSubmit={submitComment} className="">
                <textarea
                  type="text"
                  name="comment"
                  id="comment"
                  placeholder="What is your opinion..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg w-full h-40 input"
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
                  className={`block bg-linear-to-b ${sendingComment ? "bg-gray-500" : "bg-linear-to-b from-blue-500 to-indigo-500"}  text-white px-4 py-3 mt-3 w-full`}
                >
                  {sendingComment ? (
                    <div className="flex gap-1 items-center">
                      <Loader2 size={14} className="animate-spin" />
                      Posting
                    </div>
                  ) : (
                    "Send comment "
                  )}
                </button>
              </form>
            </section>
          </div>

          {/* More by this user */}
          <div className="px-2 pt-10 pb-5">
            {userPosts.length > 0 && (
              <h2 className="font-bold text-2xl mb-2 flex gap-1 items-center">
                More by
                <p>{post.user.name.split(" ")[0]}</p>
              </h2>
            )}

            <div className="space-y-2">
              {userPosts.length > 0 ? (
                userPosts
                  .filter((p) => p._id !== id)
                  .map((p) => (
                    <Link
                      to={`/posts/${p._id}`}
                      key={p._id}
                      className="rounded relative pt-13 transition-colors bg-background p-2 shadow-sm flex gap-2"
                    >
                      <div className="shrink">
                        <img src={post.image.url} alt="" className="rounded object-cover max-h-20 aspect-6/4" />
                      </div>
                      <div className="w-full flex-1">
                        <h2 className="text-lg font-medium ">
                          {p.title} Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Distinctio, corrupti?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, blanditiis.
                        </h2>
                      </div>
                      <div className="flex absolute top-0 left-0 w-full mx-auto gap-5 items-center text-[14px] bg-primary/10 p-3">
                        <HeartPlus size={18} />
                        <MessageSquare size={18} />
                        <Bookmark size={18} />
                      </div>
                    </Link>
                  ))
              ) : (
                <p className="text-slate-500 italic"></p>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* <Footer /> */}
      <div className="flex bg-slate-200 justify-around p-3 border-t border-border sticky bottom-0 left-0 w-full z-40">
        <Bookmark />
        <MessageSquare />
        <Share2 />
        <HeartPlus />
        <EllipsisVertical />
      </div>
    </div>
  );
};

export default PostDetail;

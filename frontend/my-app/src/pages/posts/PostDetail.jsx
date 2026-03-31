import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../api/Axios";
import {
  MapPin,
  Calendar,
  User,
  Mail,
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  Loader2,
  Network,
  NetworkIcon,
  SquaresIntersect,
} from "lucide-react";
import Footer from "../../components/Footer";
import EditPost from "./EditPost";

const PostDetail = () => {
  const { id } = useParams();

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

  // user posts
  useEffect(() => {
    const authorId = post?.user?._id || post?.user;

    const fetchUserPosts = async () => {
      try {
        const res = await API.get(`/api/posts/users/${authorId}`);
        setUserPosts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch author posts:", err);
        setUserPosts([]);
      }
    };

    fetchUserPosts();
  }, [post?.user?._id, post?.user]);

  // user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(
          `/api/users/${post?.user?._id || post?.user}`,
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      }
    };

    if (post?.user?._id || post?.user) {
      fetchUser();
    }
  }, [post?.user?._id, post?.user]);

  console.log(user);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 size={25} className="animate-spin text-emerald-600" />
      </div>
    );
  }

  // If loading is finished and post is still null, show error
  if (!post || Object.keys(post).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">Post not found</h2>
          <Link
            to="/"
            className="text-emerald-600 hover:underline mt-4 inline-block"
          >
            Return to feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#001e00]">
      <main className="lg:mx-auto px-1 lg:flex justify-between items-start gap-2 max-w-8xl">
        {/* left sidebar */}
        <section className="bg-white p-2 lg:sticky top-18 left-0 lg:h-100">
          <div className="mb-5">
            <Link
              to="/"
              className="items-center gap-2 font-bold hover:text-emerald-700"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>

          <section>
            <div className="max-lg:flex gap-2 items-center">
              <div>
                {user?.profile_img && user?.profile_img?.url ? (
                  <img
                    src={user.profile_img.url}
                    alt="profile"
                    className="w-15 h-15 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="bg-gray-100 w-15 h-15 rounded-full border border-gray-500 flex items-center justify-center">
                    <User size={24} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="">
                <p className="text-3xl italic">
                  {post?.user?.name || "Unknown Author"}
                </p>
              </div>
            </div>
            <div className="p-1 border-b border-slate-200">
              <div className="flex flex-wrap  gap-2 text-sm text-slate-600 mb-2">
                <span className="flex items-center gap-1.5 text-emerald-700 italic font-medium">
                  Posted{" "}
                  {post?.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : "recently"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> Member
                </span>
              </div>
            </div>
          </section>
        </section>

        {/* Middle - Main Content */}
        <div className="flex-1 pb-10">
          <div className="grid grid-cols-1 gap-0 rounded-lg bg-white overflow-hidden md:px-8">
            <section className="px-2 py-5 border-b border-slate-200 mb-5">
              <h1 className="text-2xl lg:text-5xl font-medium max-sm:mb-2 pb-10">
                {post.title}
              </h1>

              {post.image?.url && (
                <div className="mb-5 rounded-xl overflow-hidden">
                  <img
                    src={post.image.url}
                    alt="Post content"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-wrap text-lg md:text-xl md:leading-relaxed text-gray-800 font-light italic">
                  {post.content}
                </p>
              </div>
            </section>
          </div>

          {/* About author */}
          <div className="bg-white p-5 border border-gray-300 rounded-xl mb-10">
            <div className="pt-2">
              <h3 className="text-base font-medium mb-4">About the author</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-sm text-slate-600">
                  <Mail size={16} className="mt-0.5" />
                  <span className="break-all">
                    {post?.user?.email || "No email provided"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <SquaresIntersect size={16} className="text-blue-600" />
                  <span>www.website.com</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <ShieldCheck size={16} className="text-blue-600" />
                  <span>verified</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link
                to={`/users/${post?.user?._id || post?.user}`}
                className="text-emerald-700 text-sm font-medium hover:underline flex items-center gap-1"
              >
                View author profile <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* More by this user */}
          <div className="px-2">
            <h2 className="font-bold text-2xl lg:text-3xl text-gray-800 mb-4 flex gap-1 items-center">
              More by
              <p>
                {post.user.name.split(" ")[0][0] +
                  post.user.name.split(" ")[0].slice(2)}
              </p>
            </h2>

            <div className="grid gap-3">
              {userPosts.length > 0 ? (
                userPosts
                  .filter((p) => p._id !== id)
                  .map((p) => (
                    <Link
                      to={`/posts/${p._id}`}
                      key={p._id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-emerald-500 transition-colors bg-white shadow-sm"
                    >
                      <h2 className="text-lg font-medium">{p.title}</h2>
                    </Link>
                  ))
              ) : (
                <p className="text-slate-500 italic">
                  This component is In dvelopment.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Tab Bar - Desktop */}
        <aside className="max-lg:hidden lg:sticky top-18 bg-white rounded-lg lg:p-3 h-[90vh] overflow-y-auto min-w-50 max-w-110 ">
          <div className="sticky top-0 flex justify-between items-center border-b bg-white border-gray-200 mb-4 pb-2">
            <h2 className="font-bold">Latest Posts</h2>
            <div className="text-xs text-slate-500">
              {recentPosts.length} posts
            </div>
          </div>

          <div className="space-y-4">
            {recentPosts.map((p) => (
              <Link
                key={p._id}
                to={`/posts/${p._id}`}
                className="group flex gap-3 items-start p-2 rounded hover:bg-gray-50 transition-all"
              >
                {p.image?.url && (
                  <img
                    src={p.image.url}
                    alt=""
                    className="w-20 h-14 object-cover rounded bg-gray-100"
                  />
                )}
                <h2 className="group-hover:text-emerald-600 line-clamp-2 text-sm font-semibold leading-tight">
                  {p.title}
                </h2>
              </Link>
            ))}
          </div>
        </aside>

        {/* Mobile Recent Posts */}
        <div className="lg:hidden bg-green-50 p-4 mt-10">
          <h2 className="font-bold text-2xl mb-5">Recent Posts</h2>
          <div className="grid grid-cols-2 gap-4">
            {recentPosts.map((p) => (
              <Link
                key={p._id}
                to={`/posts/${p._id}`}
                className="border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm"
              >
                {p.image?.url && (
                  <img
                    src={p.image.url}
                    alt=""
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-2">
                  <h2 className="line-clamp-2 text-sm font-medium">
                    {p.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;

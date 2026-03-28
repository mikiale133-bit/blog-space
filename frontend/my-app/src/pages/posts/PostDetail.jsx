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
  MessageSquare,
  Bookmark,
  X,
  Loader2,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PostDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(id);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      try {
        const resp = await API.get(`/api/posts/${id}`);
        setPost(resp.data);

        const resp2 = await API.get("/api/posts/recents");
        setPosts(resp2.data);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    fetchPost();
  }, [id]);

  const relatedPosts = posts.filter((p) => p.category === post.category);

  if (!post) {
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
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center animate-spin">
        <button>
          <Loader2 size={25} />
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#001e00]">
      <main className="lg:mx-10 mx-auto px-1 py-2 md:py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-2 text-emerald-700 font-medium md:mb-6 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to search</span>
        </Link>

        <div className="lg:flex justify-between ">
          <div className="grid grid-cols-1 gap-0 rounded-lg bg-white overflow-hidden md:px-8 flex-1">
            {/* Main Content Column */}
            <div className="">
              <section className="p-1 mt-3 border-b border-slate-200">
                <h1 className="text-[26px] font-medium leading-tight mb-6 max-sm:mb-2">
                  {post.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-slate-600 mb-2">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    Posted {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} /> Worldwide
                  </span>
                </div>
              </section>

              <section className="px-2 py-5 border-b border-slate-200 mb-5">
                <div className="prose prose-slate max-w-none">
                  <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800">
                    {post.content}
                  </p>
                </div>
              </section>

              {/* Tags/Skills Section Placeholder (Upwork style) */}
              <section className="px-8 py-3 pt-0">
                <h3 className="text-base font-medium mb-4">Category</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium cursor-pointer transition-colors">
                    Technology
                  </span>
                  <span className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium cursor-pointer transition-colors">
                    Educattion
                  </span>
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="bg-white p-5">
              <div className="pt-6">
                <h3 className="text-base font-medium mb-4">About the author</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                      {post.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-medium text-[15px]">
                        {post.user.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        Member since 2026
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <Mail size={16} className="mt-0.5" />
                    <span className="break-all">{post.user.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <ShieldCheck size={16} className="text-blue-600" />
                    <span>verified</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <Link
                  to={`/user/${post._id}`}
                  className="text-emerald-700 text-sm font-medium hover:underline flex items-center gap-1"
                >
                  View author profile <ExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right tab bar, Related posts - Desktop View */}
          <div className="max-lg:hidden lg:sticky top-18  bg-white rounded-lg lg:p-3 h-170 overflow-y-scroll min-w-70 max-w-110">
            <div className="h-screen">
              {/* header */}

              <div className="sticky -top-4 flex justify-between items-center border-b bg-white border-gray-200 mb-4">
                <h2>Latest Posts</h2>
                <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
                  20 posts
                </div>
              </div>

              {/* Posts List */}
              <div className="flex flex-col w-full h-full">
                {/* posts list */}
                <div className="space-y-1">
                  {posts.map((p) => (
                    <div
                      key={post._id}
                      className="group p-0.5 shadow-sm hover:shadow-md rounded hover:bg-gray-50"
                    >
                      <Link
                        to={`/posts/${post._id}`}
                        className="flex justify-between items-center"
                      >
                        {p.image && post.image?.url && (
                          <div className="p-0.5 rounded-lg bg-green-100">
                            <img src={p?.image?.url} alt="" className=" w-20" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h2 className="group-hover:text-red-500 line-clamp-3 text-sm font-semibold">
                            {p.title}
                          </h2>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden bg-white">
            <div className="containe">
              <h2 className="heading font-bold text-2xl mb-5">Related Posts</h2>
              <div className="header"></div>
            </div>

            {/* Posts List */}
            <div className="grid grid-cols-2 w-full">
              {relatedPosts.map((p) => (
                <div
                  key={post._id}
                  className="border border-red-500 p-2 rounded hover:bg-blue-100"
                >
                  <Link to={`/posts/${post._id}`} className="">
                    {p.image && post.image.url && (
                      <div className="p-0.5 overflow-hidden rounded-lg w-40 h-40 bg-green-100">
                        <img src={post.image.url} alt="max-h-20 w-1" />
                      </div>
                    )}
                    <h2 className="line-clamp-2">{p.title}</h2>
                    <h2 className="line-clamp-2">{p.content}</h2>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostDetail;

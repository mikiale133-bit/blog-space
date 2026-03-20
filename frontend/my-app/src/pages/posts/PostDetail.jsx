import React from "react";
import { useLocation, Link } from "react-router-dom";
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
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PostDetail = () => {
  const location = useLocation();
  const post = location.state?.post;

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

  return (
    <div className="min-h-screen text-[#001e00]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-1 py-2 md:py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="flex items-center gap-2 text-emerald-700 font-medium md:mb-6 hover:text-emerald-800 transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to search</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4">
          <div className="grid grid-cols-1 gap-0 rounded-lg bg-white overflow-hidden md:px-8">
            {/* Main Content Column */}
            <div className="lg:col-span-3 lg:border-r border-slate-200">
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
            <div className="lg:col-span-1 bg-white p-5">
              <div className="flex gap-3 items-center">
                <button className="w-full bg-[#14a800] hover:bg-[#108a00] text-white font-medium py-2.5 rounded-full transition-colors text-sm">
                  Follow
                </button>
                <button className="w-full border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium py-2.5 rounded-full transition-colors text-sm flex items-center justify-center gap-2">
                  <Bookmark size={16} /> Save Post
                </button>
              </div>

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
          <div className="max-w-lg:hidden sticky top-20 right-0 bg-white border-2 border-gray-300 rounded-lg p-3">
            {/* header */}
            <div className="container">
              <div className="flex justify-between items-center border-b border-gray-200">
                <h2>Related Posts</h2>
                <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
                  <X size={25} />
                </div>
              </div>

              {/* Header bottom */}
              <div className=""></div>
            </div>

            {/* Posts List */}
            <div className="flex flex-col w-full h-full overflow-y-scroll">
              {/* posts list */}
              <div className=""></div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="max-w-lg:hidden bg-white">
            <div className="container">
              <h2 className="heading font-bold text-2xl mb-5">Related Posts</h2>
              <div className="header"></div>
            </div>

            {/* Posts List */}
            <div className="grid grid-cols-2 w-full h-full overflow-y-scroll">
              <Link
                to={`/post-details/${post._id}`}
                className="p-2 border border-gray-200 rounded-md hover:border-gray-300"
              >
                <h2 className="mb-1 line-clamp-2 text-gray-700">
                  {post.title}
                </h2>
                <p className="mb-1 text-gray-500">{post.createdAt}</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostDetail;

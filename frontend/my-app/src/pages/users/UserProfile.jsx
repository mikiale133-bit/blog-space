import React, { useEffect, useState } from "react";
import { API } from "../../api/Axios";
import { Link, useParams } from "react-router-dom";
import {
  Bookmark,
  Pencil,
  Trash2,
  User,
  UserPlus,
  Mail,
  MapPin,
  Calendar,
  MoreHorizontal,
  Ellipsis,
  CircleUserRound,
  Send,
  Facebook,
  Github,
  Youtube,
  Globe,
  Instagram,
  Twitter,
  Heart,
  MessageCircle,
  Eye,
  X,
  Users,
  UserCheck,
  Clock,
  TrendingUp,
  Award,
  Star,
  ListFilter,
} from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import DotLoader from "@/components/Loaders/DotLoader";
import Footer from "@/components/Footer";
import FollowBtn from "@/components/FollowBtn";
import Navbar from "@/components/Navbar";

const UserProfile = () => {
  const { id } = useParams();
  const loggedinUser = useAuthStore((state) => state.user);
  const isOwner = loggedinUser?._id === id;

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userPosts, setUserPosts] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("posts");

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'followers' or 'following'
  const [modalData, setModalData] = useState([]);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // Fetch user posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/api/posts/users/${id}`);
        setUserPosts(res.data);
      } catch (err) {
        console.log(err);
        setError("No posts found for this user.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

  const deletePost = async (postId) => {
    try {
      await API.delete(`/api/posts/${postId}`);
      setUserPosts((prev) => ({
        ...prev,
        posts: prev.posts.filter((p) => p._id !== postId),
      }));
    } catch {
      setError("Delete failed");
    }
  };

  // Get Followers and followings
  useEffect(() => {
    if (!user?._id) return;
    const fetchFollowData = async () => {
      const [followersResp, followingResp] = await Promise.all([
        API.get(`/api/follows/${user?._id}/followers`),
        API.get(`/api/follows/${user?._id}/following`),
      ]);

      setFollowers(followersResp.data);
      setFollowing(followingResp.data);
    };
    fetchFollowData();
  }, [user?._id]);

  // Open modal with followers/following
  const openModal = (type) => {
    setModalType(type);
    setModalData(type === "followers" ? followers : following);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    document.body.style.overflow = "unset";
  };

  if (loading)
    return (
      <div className="mt-10 text-center">
        <DotLoader />
      </div>
    );
  if (!user) return <p className="mt-10 text-center">User not found</p>;

  // Social links configuration
  const socialLinks = [
    { icon: Send, color: "text-blue-400", bg: "bg-blue-50", label: "Telegram" },
    { icon: Facebook, color: "text-blue-700", bg: "bg-blue-50", label: "Facebook" },
    { icon: Github, color: "text-gray-800", bg: "bg-gray-100", label: "Github" },
    { icon: Youtube, color: "text-red-600", bg: "bg-red-50", label: "YouTube" },
    { icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50", label: "Website" },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <Navbar />
      {/* Followers/Following Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn" />

          <div
            className="relative w-full max-w-lg max-h-[80vh] bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="flex items-center gap-2 text-xl font-bold">
                {modalType === "followers" ? <Users className="text-blue-500" size={20} /> : <UserCheck className="text-green-500" size={20} />}
                {modalType === "followers" ? "Followers" : "Following"}
                <span className="text-sm font-normal text-muted-foreground">({modalData.length})</span>
              </h3>
              <button onClick={closeModal} className="p-2 transition-colors rounded-full hover:bg-muted">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content - Horizontal Scroll */}
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              {modalData.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-muted">
                    <Users size={32} className="text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No {modalType} yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {modalData.map((item) => {
                    const person = modalType === "followers" ? item.follower : item.following;
                    return (
                      <div key={item._id} className="flex items-center justify-between p-3 transition-all rounded-xl hover:bg-muted/50 group">
                        <Link to={`/profile/${person._id}`} className="flex items-center flex-1 min-w-0 gap-3" onClick={closeModal}>
                          <div className="relative shrink-0">
                            {person.profile_img?.url ? (
                              <img
                                src={person.profile_img.url}
                                alt={person.name}
                                className="object-cover w-12 h-12 transition-colors border-2 rounded-full border-border group-hover:border-primary"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                                <User size={24} className="text-gray-500 dark:text-gray-400" />
                              </div>
                            )}
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-emerald-500 dark:border-gray-900" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate dark:text-gray-100">{person.name}</p>
                            <p className="text-sm truncate text-muted-foreground">@{person.username || person.email?.split("@")[0] || "user"}</p>
                          </div>
                        </Link>

                        <div className="ml-2 shrink-0">
                          <FollowBtn userId={person._id} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        {/* Profile Content */}
        <div className="relative max-w-6xl mx-auto z-1 sm:px-4 lg:px-8">
          {/* Profile Card */}
          <div className="p-6 bg-white border shadow-lg border-border mt-18 dark:bg-muted/30 sm:rounded-xl md:p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              {/* Avatar */}
              <div className="relative -mt-16 rounded-full shadow-lg md:-mt-20">
                {user?.profile_img && user?.profile_img?.url ? (
                  <img
                    src={user?.profile_img?.url}
                    alt="avatar"
                    className="object-cover border-4 border-white rounded-full shadow-xl w-28 h-28 md:w-36 md:h-36"
                  />
                ) : (
                  <div className="flex items-center justify-center text-gray-500 border-4 border-white rounded-full shadow-xl w-28 h-28 md:w-36 md:h-36 dark:border-gray-500 bg-linear-to-br from-gray-200 dark:from-gray-900 dark:to-gray-800 to-gray-300 dark:text-gray-100">
                    <User size={48} />
                  </div>
                )}
                <div className="absolute w-4 h-4 border-2 border-white rounded-full bottom-2 right-2 bg-emerald-500 dark:border-gray-800"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-transparent md:text-4xl lg:text-5xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-50 dark:to-gray-300 bg-clip-text">
                      {user.name}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">@{user.username || user.email?.split("@")[0]}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 md:mt-0">
                    {isOwner ? (
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 rounded-full dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                          <Pencil size={14} /> Edit Profile
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 transition rounded-full bg-red-50 dark:bg-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/30">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    ) : (
                      <FollowBtn userId={user._id} />
                    )}
                  </div>
                </div>

                {/* Bio */}
                <p className="max-w-md mx-auto mt-3 text-gray-500 dark:text-gray-400 md:mx-0">
                  {user.bio || "Passionate writer sharing stories and insights about life, technology, and creativity."}
                </p>

                {/* Stats - Clickable */}
                <div className="flex flex-wrap items-center max-w-5xl gap-5 p-3 py-3 mx-auto mt-8 text-center max-sm:justify-center border-y border-border">
                  <button
                    onClick={() => openModal("followers")}
                    className="flex flex-col gap-1 px-4 py-2 transition-colors rounded-lg hover:bg-muted group"
                  >
                    <span className="text-2xl font-bold text-blue-600 transition-transform dark:text-blue-400 group-hover:scale-110">
                      {followers.length}
                    </span>
                    <span className="text-lg font-medium transition-colors text-muted-foreground group-hover:text-blue-600">Followers</span>
                  </button>

                  <div className="w-px h-12 bg-border" />

                  <div className="flex flex-col gap-1 px-4 py-2">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{userPosts?.count || 0}</span>
                    <span className="text-lg font-medium text-muted-foreground">Posts</span>
                  </div>

                  <div className="w-px h-12 bg-border" />

                  <button
                    onClick={() => openModal("following")}
                    className="flex flex-col gap-1 px-4 py-2 transition-colors rounded-lg hover:bg-muted group"
                  >
                    <span className="text-2xl font-bold text-green-600 transition-transform dark:text-green-400 group-hover:scale-110">
                      {following.length}
                    </span>
                    <span className="text-lg font-medium transition-colors text-muted-foreground group-hover:text-green-600">Following</span>
                  </button>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-500 md:justify-start dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Mail size={14} /> {user.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} /> {user.location || "San Francisco, CA"}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {!isOwner && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {socialLinks.map((social, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-full ${social.bg} ${social.color} transition-all hover:scale-110 hover:shadow-lg cursor-pointer`}
                    title={social.label}
                  >
                    <social.icon size={18} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Posts Section */}
          <div className="mt-5 mb-2">
            <section className="items-start justify-start gap-3 md:flex">
              {/* Left Sidebar - Stats Cards */}
              <div className="sticky hidden p-4 mx-1 bg-white shadow-lg top-20 dark:bg-muted/50 min-w-80 rounded-xl md:block">
                <h3 className="flex items-center gap-2 mb-4 text-lg font-bold">
                  <TrendingUp size={18} className="text-blue-500" />
                  Stats
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-red-500" />
                      <span className="text-sm">Total Likes</span>
                    </div>
                    <span className="text-lg font-bold">{userPosts?.posts?.reduce((acc, post) => acc + (post.likes?.length || 0), 0) || 0}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <MessageCircle size={16} className="text-blue-500" />
                      <span className="text-sm">Comments</span>
                    </div>
                    <span className="text-lg font-bold">{userPosts?.posts?.reduce((acc, post) => acc + (post.comments?.length || 0), 0) || 0}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2">
                      <Eye size={16} className="text-purple-500" />
                      <span className="text-sm">Total Views</span>
                    </div>
                    <span className="text-lg font-bold">{userPosts?.posts?.reduce((acc, post) => acc + (post.views || 0), 0) || 0}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-amber-500" />
                      <span className="text-sm font-medium">Engagement</span>
                    </div>
                    <span className="font-bold text-amber-600 dark:text-amber-400">
                      {userPosts?.count > 0
                        ? Math.round(
                            ((userPosts?.posts?.reduce((acc, post) => acc + (post.likes?.length || 0) + (post.comments?.length || 0), 0) || 0) /
                              userPosts.count) *
                              10,
                          ) / 10
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>

              {/* Right bar - Posts */}
              <div className="w-full max-md:mt-5">
                {/* Tab Navigation */}
                <nav className="sticky pt-2 pb-1 bg-background top-18">
                  <div className="flex items-center justify-between gap-1 p-2 mx-1 mb-3 bg-white border rounded-lg top-20 border-primary/20 dark:bg-muted/50">
                    <button
                      onClick={() => setActiveTab("posts")}
                      className={`px-6 py-3 text-sm font-medium transition-all rounded-lg relative ${
                        activeTab === "posts" ? "text-indigo-600 bg-primary/10 shadow-sm" : "hover:bg-primary/10"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span>Posts</span>
                        <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">
                          {userPosts?.count || 0}
                        </span>
                      </div>
                    </button>

                    <div>
                      <ListFilter />
                    </div>
                  </div>
                </nav>

                {/* Posts Tab */}
                {activeTab === "posts" && (
                  <div>
                    {error && <div className="px-4 py-3 mb-6 border rounded-lg bg-amber-50 border-amber-200 text-amber-700">{error}</div>}

                    {userPosts?.count === 0 ? (
                      <div className="py-12 text-center bg-gray-50 dark:bg-muted/30 rounded-xl">
                        <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-muted">
                          <Pencil size={32} className="text-muted-foreground" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
                        {isOwner && (
                          <Link to="/create-post" className="inline-block mt-3 font-medium text-indigo-600 hover:text-indigo-700">
                            Create your first post →
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userPosts?.posts.map((post) => (
                          <div
                            key={post._id}
                            className="overflow-hidden transition-all duration-300 bg-white border group rounded-xl dark:bg-muted/50 hover:shadow-lg border-border"
                          >
                            {/* Post Header */}
                            <div className="flex justify-between gap-3 p-4 border-b border-border">
                              <div className="flex items-center gap-3">
                                {user?.profile_img?.url ? (
                                  <img src={user?.profile_img?.url} alt="" className="object-cover w-10 h-10 border rounded-full border-border" />
                                ) : (
                                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50">
                                    <CircleUserRound className="text-gray-500 dark:text-gray-400" size={24} />
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm font-medium">{user?.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <button className="p-1 transition-colors rounded-full hover:bg-muted">
                                <Ellipsis size={18} />
                              </button>
                            </div>

                            {/* Post Content */}
                            <div className="p-4">
                              <Link to={`${isOwner ? `/posts/${post._id}` : `/posts/${post._id}`}`} className="block">
                                <h3 className="text-lg font-semibold transition line-clamp-2">{post.title}</h3>
                                <p className="mt-2 text-muted-foreground line-clamp-3">
                                  {post.content?.replace(/<[^>]*>/g, "") || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
                                </p>
                              </Link>

                              {/* Post Meta */}
                              <div className="flex items-center justify-between pt-3 mt-4 border-t border-border">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Heart size={14} className="text-red-400" />
                                    {post.num_likes || 0}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MessageCircle size={14} className="text-blue-400" />
                                    {post.num_comments || 0}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Eye size={14} className="text-purple-400" />
                                    {post.views || 0}
                                  </span>
                                </div>

                                {isOwner && (
                                  <div className="flex gap-1">
                                    <button
                                      onClick={() => deletePost(post._id)}
                                      className="p-2 text-red-400 transition rounded-lg hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                    <button className="p-2 text-blue-400 transition rounded-lg hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20">
                                      <Pencil size={16} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

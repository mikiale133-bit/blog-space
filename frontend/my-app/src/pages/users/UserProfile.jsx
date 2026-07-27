import React, { useEffect, useState } from "react";
import { API } from "../../api/Axios";
import { Link, useParams } from "react-router-dom";
import { Bookmark, Pencil, Trash2, User, UserPlus, Mail, MapPin, Calendar, MoreHorizontal, Ellipsis, CircleUserRound } from "lucide-react";
import { Send, Facebook, Github, Youtube, Globe, Instagram, Twitter } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import DotLoader from "@/components/Loaders/DotLoader";
import Footer from "@/components/Footer";
import FollowBtn from "@/components/FollowBtn";
import ParticleBackground from "@/components/animations/DotsAnimation";

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

  if (loading)
    return (
      <div className="text-center mt-10">
        <DotLoader />
      </div>
    );
  if (!user) return <p className="text-center mt-10">User not found</p>;

  // Social links configuration
  const socialLinks = [
    { icon: Send, color: "text-blue-400", bg: "bg-blue-50", label: "Telegram" },
    { icon: Facebook, color: "text-blue-700", bg: "bg-blue-50", label: "Facebook" },
    { icon: Github, color: "text-gray-800", bg: "bg-gray-100", label: "Github" },
    { icon: Youtube, color: "text-red-600", bg: "bg-red-50", label: "YouTube" },
    { icon: Globe, color: "text-emerald-600", bg: "bg-emerald-50", label: "Website" },
  ];

  return (
    <div className="min-h-screen bg-[#fffff5] dark:bg-background">
      <div className="relative">
        {/* Subtle Cover Image Placeholder */}
        <div className="relative shadow-xl h-20 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 dark:z-50">
          <div className="absolute inset-0 bg-black/20 rounded"></div>
        </div>

        {/* Profile Content */}
        <div className="relative z-1 max-w-6xl mx-auto sm:px-4 lg:px-8 -mt-6 dark:-mt-1">
          {/* Profile Card */}
          <div className="bg-white dark:bg-muted/30 sm:rounded shadow p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Avatar */}
              <div className="relative shadow-lg rounded-full">
                {user?.profile_img && user?.profile_img?.url ? (
                  <img
                    src={user?.profile_img?.url}
                    alt="avatar"
                    className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-xl object-cover"
                  />
                ) : (
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white dark:border-gray-500 flex items-center justify-center bg-linear-to-br from-gray-200 dark:from-gray-900 dark:to-gray-800 to-gray-300 text-gray-500 dark:text-gray-100 shadow-xl">
                    <User size={48} />
                  </div>
                )}
                {/* Online Status Badge */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
                  <div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-gray-800 to-gray-600 dark:from-gray-50 dark: bg-clip-text text-transparent">
                      {user.name}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">@{user.username || user.email?.split("@")[0]}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 md:mt-0">
                    {isOwner ? (
                      <div className="flex gap-2 items-center justify-center">
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition flex items-center gap-2">
                          <Pencil size={14} /> Edit Profile
                        </button>
                        <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-500/20 rounded-full hover:bg-red-100 dark:hover:bg-red-500/30 transition flex items-center gap-2">
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    ) : (
                      <FollowBtn userId={user._id} />
                    )}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-500 mt-3 max-w-md mx-auto md:mx-0">
                  {user.bio || "Passionate writer sharing stories and insights about life, technology, and creativity."}
                </p>

                <div className="mt-8 max-w-5xl mx-auto flex flex-wrap text-center items-center max-sm:justify-center gap-5 border-y border-border py-2 p-3">
                  <div className="flex gap-1 flex-col">
                    <span className="text-xl">{followers.length}</span>
                    <span className="font-medium text-lg">Followers</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xl">{userPosts?.count || 0}</span>
                    <span className="font-medium text-lg">Posts</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xl ">{following.length}</span>
                    <span className="font-medium tex-lg ">Following</span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Mail size={14} /> {user.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} /> Joined {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} /> {user.location || "San Francisco, CA"}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links - EXACT STRUCTURE PRESERVED */}
            {!isOwner && (
              <div className="flex gap-2 mt-6 justify-center">
                {socialLinks.map((social, idx) => (
                  <div key={idx} className={`p-2.5 rounded-full ${social.bg} ${social.color} transition-all hover:scale-110 cursor-pointer`}>
                    <social.icon size={18} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 mb-2">
            <section className="md:flex gap-3 items-start justify-start">
              {/* Left Sidebar */}
              <div className="bg-white mx-1 dark:bg-muted/50 min-w-80 shadow-lg min-h-100">{/* Stats Cards */}</div>

              {/* Right bar */}
              <div className="max-md:mt-5 w-full ">
                {/* Tabs Navigation */}
                <div className="mb-3 mx-1 border border-primary/20 flex gap-1 bg-white dark:bg-muted/50 p-3">
                  <button
                    onClick={() => setActiveTab("posts")}
                    className={`px-6 py-3 text-sm font-medium transition-all relative ${activeTab === "posts" ? "text-indigo-600 bg-primary/10" : "hover:bg-primary/10"}`}
                  >
                    Posts
                    {activeTab === "posts" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></span>}
                  </button>

                  <button
                    onClick={() => setActiveTab("followers")}
                    className={`flex gap-2 items-center px-2 sm:px-6 py-3 text-sm font-medium transition-all relative ${
                      activeTab === "followers" ? "text-indigo-600 bg-primary/10" : "hover:bg-primary/10"
                    }`}
                  >
                    <span>Followers</span> <p className="text-xs text-indigo-500">({followers.length})</p>
                    {activeTab === "followers" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></span>}
                  </button>

                  <button
                    onClick={() => setActiveTab("following")}
                    className={`flex gap-1 items-center px-2 sm:px-6 py-3 text-sm font-medium transition-all relative ${
                      activeTab === "following" ? "text-indigo-600 bg-primary/10" : "hover:bg-primary/10"
                    }`}
                  >
                    <span>Following</span> <p className="text-xs text-indigo-500">({following.length})</p>
                    {activeTab === "following" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></span>}
                  </button>
                </div>

                {/* Posts Tab */}

                {activeTab === "posts" && (
                  <div>
                    {error && <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg mb-6">{error}</div>}

                    {userPosts?.count === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <p className="text-gray-500">No posts yet</p>
                        {isOwner && (
                          <Link to="/create-post" className="inline-block mt-3 text-indigo-600 hover:text-indigo-700 font-medium">
                            Create your first post →
                          </Link>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2  max-sm:gap-0">
                        {userPosts?.posts.map((post) => (
                          <div key={post._id} className="group rounded bg-white dark:bg-muted/50 overflow-hidden transition-all duration-300">
                            <header className="flex justify-between gap-3 p-3 mb-3 text-text-secondary border-b pb-3 border-border">
                              <div className="flex gap-2 items-center">
                                {user?.profile_img === "" ? (
                                  <img src={user?.profile_img?.url} alt="" className="w-10 h-10 object-cover rounded-full" />
                                ) : (
                                  <div className="w-10 h-10 p-1 flex justify-center items-center bg-blue-100 rounded-full">
                                    <CircleUserRound className="text-gray-500" />
                                  </div>
                                )}

                                <div>
                                  {user && <p className="text-xs">{user?.name}</p>}
                                  <p className="text-sm">Jun 14, 2026</p>
                                </div>
                              </div>

                              <div className="flex gap-1 items-center">
                                {" "}
                                <Ellipsis />
                              </div>
                            </header>

                            {/* Post Image */}
                            {/* <div className="relative overflow-hidden bg-white ">
                              <img
                                src={post?.image?.url}
                                alt={post.title}
                                className="aspect-video object-cover mx-auto h-full max-h-100 max-sm:p-2 border border-blue-100 max-sm:rounded-2xl"
                              />
                            </div> */}

                            {/* Post Content */}
                            <div className="p-4">
                              <Link to={`${isOwner ? `/posts/${post._id}/profile` : `/posts/${post._id}`}`} className="block">
                                <h3 className="font-semibold text-lg group-hover:text-indigo-600 line-clamp-2 transition">
                                  {post.title} Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, voluptate.
                                </h3>
                                <p className="mt-3 line-clamp-3">
                                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos non fugiat ex, ad dolor at voluptas maiores
                                  possimus aliquam natus nemo eum maxime neque itaque delectus distinctio nostrum ipsum sint ab aut odio praesentium
                                  sed. Recusandae, accusantium quis soluta voluptatibus aliquid inventore, commodi repudiandae non maiores quia
                                  tempora quos obcaecati.
                                </p>
                              </Link>

                              {/* Post Meta */}
                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                                <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                                {isOwner && (
                                  <div className="flex gap-2">
                                    <button onClick={() => deletePost(post._id)} className="text-red-400 hover:text-red-600 transition p-1">
                                      <Trash2 size={14} />
                                    </button>
                                    <button className="text-blue-400 hover:text-blue-600 transition p-1">
                                      <Pencil size={14} />
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

                {/* Followers Tab */}
                {activeTab === "followers" && (
                  <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-300">
                    {followers.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No followers yet</p>
                    ) : (
                      <div className="grid grid-cols-1">
                        {followers.map((f) => (
                          <div key={f._id} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 transition">
                            <div className="flex items-center gap-3 flex-1 w-full">
                              <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-200 to-gray-300  flex items-center justify-center">
                                <img src={f.follower.profile_img?.url} alt="" className="w-9 h-9 aspect-video rounded-full" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{f.follower.name}</p>
                                <p className="text-xs text-gray-400">@{f.follower.username || "user"}</p>
                              </div>
                            </div>

                            <div>
                              <FollowBtn userId={f.follower._id} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Following Tab */}
                {activeTab === "following" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    {following.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">Not following anyone yet</p>
                    ) : (
                      <div className="grid grid-cols-1">
                        {following.map((f) => (
                          <div
                            key={f._id}
                            className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-100 active:bg-gray-100 transition"
                          >
                            <div className="flex items-center gap-3 flex-1 w-full">
                              <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-200 to-gray-300  flex items-center justify-center">
                                <img src={f.following.profile_img.url} alt="" className="w-9 h-9 aspect-video rounded-full" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{f.following.name}</p>
                                <p className="text-xs text-gray-400">@{f.following.username || "user"}</p>
                              </div>
                            </div>

                            <div>
                              <FollowBtn userId={f.following._id} />
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

      <Footer />
    </div>
  );
};

export default UserProfile;

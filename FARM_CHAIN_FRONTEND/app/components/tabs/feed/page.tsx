"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  MessageSquare,
  Share,
  MapPin,
  DollarSign,
  Video,
  CheckCircle,
  Eye,
  Camera,
  Mic,
  Filter,
  Send,
  ClockFading,
  EllipsisVertical,
} from "lucide-react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useActiveTab } from "@/app/context/ActiveTabContext";
import axios from "axios";
import { useCurrentUser } from "@/app/components/currentUser";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { humanify } from "@/app/components/utils/humanify";

// Keep your Post type as you defined it
type Post = {
  id: number;
  user_id: number;
  farmer: string;
  location: string;
  avatar: string;
  time: string;
  verified: boolean;
  farmSize?: string;
  content: string;
  images?: string[];
  videos?: string[];
  likes: number;
  comments: number;
  shares: number;
  type: string;
  price?: string;
  tags?: string[];
  category: string;
  createdAt: string;
  isLike?: boolean;
};

const FeedPage: React.FC = () => {
  // state holds an array of posts
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [like, setLike] = useState(false);

  const activeTabContext = useActiveTab();
  const setActiveTab = activeTabContext?.setActiveTab ?? (() => {});
  const { theme } = useTheme();
  const { token } = useCurrentUser();
  const id = useCurrentUser()?.user?.userId;

  // Fetch posts
  async function fetchPosts() {
    if (!token) {
      // if there's no token we still might want to fetch public posts or bail out
      // here we'll try to fetch but without Authorization header as fallback
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://farmchain.onrender.com/post/all",
        {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        }
      );

      // expect response.data.posts to be an array
      const posts = response?.data?.posts ?? [];

      if (!Array.isArray(posts)) {
        console.warn("Expected posts array but received:", posts);
        setData([]);
      } else {
        setData(posts as Post[]);
      }
    } catch (err: any) {
      console.error("Error fetching posts:", err);
      setError(err?.message ?? "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likePost = async (postId: number) => {
    try {
      const res = await fetch("https://farmchain.onrender.com/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ postId }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to like post");

      // c — store the like state PER POST
      setData((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                likes: p.isLike ? p.likes - 1 : p.likes + 1,
                isLike: !p.isLike,
              }
            : p
        )
      );
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const avatar =
    data[0]?.avatar ||
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s";

  // console.log("Posts data:", data);
  return (
    <div>
      <div className="space-y-8 sm:px-6 md:px-0">
        <div
          className={` ${
            theme === "dark"
              ? "bg-gradient-to-br from-white/10 to-white/15 text-white border-1"
              : "bg-gradient-to-br from-green-600 via- to-green-900"
          } rounded-3xl shadow-2xl text-white p-8 relative overflow-hidden`}
        >
          {/* subtle overlay */}
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black mb-2">Post Feed 📰</h2>
                <p className="text-pink-100 text-lg">
                  Discover the latest updates and stories from the community
                </p>
              </div>
              <div className="text-6xl opacity-20">🐄</div>
            </div>
          </div>
        </div>

        {/* Post input card */}
        <div
          className={`${
            theme === "dark" ? "bg-black text-white" : "bg-white"
          } rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6`}
        >
          <div className="flex items-start space-x-4">
            {/* top img */}
            <div
              onClick={() => {
                setActiveTab("profile");
              }}
              className="w-14 h-14  border-none rounded-full "
            >
              <img
                className="rounded-full w-full h-full"
                src={avatar}
                alt="avatar"
              />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="What's happening on your farm today?"
                className={`w-full p-3 sm:p-4 border border-gray-100 rounded-2xl resize-none  ${
                  theme === "dark"
                    ? "focus:outline-none focus:ring-2 focus:border-transparent text-white placeholder-gray-100"
                    : "focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-2 border-gray-300 text-gray-700 placeholder-gray-400"
                } text-sm sm:text-base`}
                rows={3}
              />
              <div className="flex flex-wrap justify-between items-center mt-4 gap-2 sm:gap-4">
                <div className="flex flex-wrap space-x-2 sm:space-x-4">
                  <button
                    className={`flex items-center space-x-1 sm:space-x-2  ${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    } hover:text-green-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-green-50 text-xs sm:text-sm whitespace-nowrap`}
                  >
                    <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Photo</span>
                  </button>
                  <button
                    className={`flex items-center space-x-1 sm:space-x-2  ${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    } hover:text-blue-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-blue-50 text-xs sm:text-sm whitespace-nowrap`}
                  >
                    <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Video</span>
                  </button>
                  <button
                    className={`flex items-center space-x-1 sm:space-x-2  ${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    } hover:text-red-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-red-50 text-xs sm:text-sm whitespace-nowrap`}
                  >
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Audio</span>
                  </button>
                  <button
                    className={`flex items-center space-x-1 sm:space-x-2  ${
                      theme === "dark" ? "text-white" : "text-gray-600"
                    } hover:text-purple-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-purple-50 text-xs sm:text-sm whitespace-nowrap`}
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Location</span>
                  </button>
                </div>

                <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white w-full md:px-66 sm:px-8 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-95 flex items-center justify-center space-x-2 text-sm sm:text-base whitespace-nowrap">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Share Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Feed header */}
        <div
          className={`${
            theme === "dark" ? "text-white" : "bg-white"
          } rounded-3xl shadow-xl border border-gray-100 p-4 sm:p-6 flex justify-between items-center`}
        >
          <h3
            className={`text-lg sm:text-xl font-bold  ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Community Feed
          </h3>
          <button
            className={`flex items-center space-x-1 sm:space-x-2 ${
              theme === "dark" ? "text-white" : "text-gray-600"
            } hover:text-green-600 transition-colors px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:bg-green-50 text-xs sm:text-sm whitespace-nowrap`}
          >
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-semibold">Filter</span>
          </button>
        </div>

        {/* Posts list */}
        <div className="space-y-8">
          {loading && (
            <div className="text-center text-4xl py-6">Loading posts...</div>
          )}

          {error && (
            <div className="text-center text-red-500 py-6">{error}</div>
          )}

          {!loading && !error && data.length === 0 && (
            <div className="text-center text-4xl py-6">No posts to show</div>
          )}

          {data.map((post) => (
            <div
              key={post.id}
              className={`${
                theme === "dark" ? "" : "bg-white"
              } rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300`}
            >
              <div className="p-3 py-5">
                <div className="flex items-start justify-between mb-4 w-full">
                  <div className="flex items-start space-x-4 w-full">
                    {/* Avatar / Profile */}
                    <Link
                      href={{
                        pathname: "/main",
                        query: { id: post.user_id },
                      }}
                    >
                      <div className="relative">
                        <div
                          onClick={() => setActiveTab("user_profile")}
                          className="w-14 h-14 rounded-full overflow-hidden"
                        >
                          <img
                            className="h-full w-full object-cover rounded-full"
                            src={post.avatar || avatar}
                            alt=""
                          />
                        </div>

                        {post.verified === false && (
                          <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                        )}
                      </div>
                    </Link>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      {/* Name + Category + Menu Button */}
                      <div className="flex items-start w-full">
                        {/* Name + Category */}
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <h3
                            className={`font-bold text-lg truncate ${
                              theme === "dark" ? "" : "text-gray-900"
                            }`}
                          >
                            {post.farmer}
                          </h3>

                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold whitespace-nowrap">
                            {post.category}
                          </span>
                        </div>

                        {/* Menu button (push to the right with ml-auto) */}
                        <div className="ml-auto flex items-center">
                          <button
                            className={`p-1 ${
                              theme === "dark"
                                ? "text-gray-100 hover:text-gray-400"
                                : "text-gray-600 hover:text-gray-500"
                            } rounded-full ${
                              post.user_id == id ? "" : "hidden"
                            }`}
                            aria-label="more"
                            onClick={(e) => {
                              e.stopPropagation();
                              const m = document.getElementById(
                                `post-modal-${post.id}`
                              );
                              m?.classList.remove("hidden");
                            }}
                          >
                            <EllipsisVertical />
                          </button>
                        </div>

                        {/* Modal */}
                        <div
                          id={`post-modal-${post.id}`}
                          className="hidden fixed inset-0 z-50 flex items-center justify-center"
                          onClick={(e) => {
                            if (e.target === e.currentTarget) {
                              document
                                .getElementById(`post-modal-${post.id}`)
                                ?.classList.add("hidden");
                            }
                          }}
                        >
                          <div className="absolute inset-0 bg-black/50" />

                          <div
                            className={`relative z-10 ${
                              theme === "dark" ? "bg-black border" : "bg-white"
                            } rounded-xl shadow-lg p-6 w-[90%] max-w-md`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <h4 className="text-lg font-bold mb-4">
                              Manage post
                            </h4>

                            <div className="flex justify-end gap-3">
                              <button
                                className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  if (
                                    !window.confirm(
                                      "Are you sure you want to delete this post?"
                                    )
                                  )
                                    return;

                                  await axios.delete(
                                    `https://farmchain.onrender.com/post/delete`,
                                    {
                                      headers: token
                                        ? { Authorization: `Bearer ${token}` }
                                        : undefined,
                                      data: { id: post.id },
                                    }
                                  );

                                  await fetchPosts();
                                  document
                                    .getElementById(`post-modal-${post.id}`)
                                    ?.classList.add("hidden");
                                }}
                              >
                                Delete
                              </button>

                              <button
                                className="px-3 py-2 rounded-lg bg-green-400 hover:bg-green-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  document
                                    .getElementById(`post-modal-${post.id}`)
                                    ?.classList.add("hidden");
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Location + Time */}
                      <div
                        className={`flex flex-wrap gap-x-6 text-xs mt-1 ${
                          theme === "dark" ? "" : "text-gray-500"
                        }`}
                      >
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {post.location}
                        </div>

                        <div className="flex items-center">
                          <ClockFading className="w-3 h-3 mr-1" />
                          {dayjs(post.createdAt).fromNow()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p
                    className={` leading-relaxed ${
                      theme === "dark" ? "" : "text-gray-700"
                    }`}
                  >
                    {post.content}
                  </p>

                  {/* PRICE */}
                  {post.price && (
                    <div className="mt-3 inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                      <DollarSign className="w-4 h-4" />
                      <span>{post.price}</span>
                    </div>
                  )}
                </div>

                {/* TAGS */}
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-green-600 hover:text-green-700 font-semibold text-sm cursor-pointer hover:underline"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* IMAGE */}
                {/* IMAGE */}
                {(post.images?.length ?? 0) > 0 && (
                  <div
                    className={
                      post.images?.length === 1
                        ? "w- h- mb-4 rounded-2xl overflow-hidden object-cover"
                        : "grid grid-cols-1 md:grid-cols-2 gap-3 mb-4"
                    }
                  >
                    {post.images?.map((img: string, i: number) => (
                      <div
                        key={i}
                        className={
                          post.images?.length === 1
                            ? "w-full h-full"
                            : "rounded-2xl w-full h-[250px] relative overflow-hidden"
                        }
                      >
                        <img
                          src={img}
                          alt="Images"
                          className={
                            post.images?.length === 1
                              ? "object-cover w-full h-full rounded-2xl"
                              : "object-cover w-full h-full"
                          }
                        />
                        <div className="absolute inset-0 pointer-events-none"></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* VIDEO */}
                {post.videos && post.videos.length > 0 && (
                  <div className="grid gap-3 mb-4">
                    {post.videos.map((vid: string, i: number) => (
                      <div
                        key={i}
                        className="relative w-full rounded-2xl overflow-hidden bg-black"
                      >
                        <video
                          controls
                          playsInline
                          src={vid}
                          className="w-full h-auto max-h-[600px] object-contain"
                          onLoadedMetadata={(e) => {
                            const video = e.target as HTMLVideoElement;
                            const isPortrait =
                              video.videoHeight > video.videoWidth;

                            if (isPortrait) {
                              video.classList.remove("object-cover");
                              video.classList.add(
                                "object-contain",
                                "max-h-[600px]"
                              );
                            } else {
                              video.classList.remove("object-contain");
                              video.classList.add("object-cover", "h-[450px]");
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action btn */}
              <div className="border-t border-gray-100 px-3 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 lg:space-x-10">
                    {/* like */}
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "" : "text-gray-600"
                      } hover:text-red-500 transition-colors`}
                    >
                      {post.isLike ? (
                        <FaHeart className="w-5 h-5 text-red-500" />
                      ) : (
                        <FiHeart className="w-5 h-5" />
                      )}

                      <span className="font-semibold">
                        {humanify(post.likes)}
                      </span>
                    </button>

                    {/* comment */}
                    <button
                      onClick={()=> setIsOpen(!isOpen)}
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "" : "text-gray-600"
                      } hover:text-blue-500 transition-colors`}
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span className="font-semibold">
                        {humanify(post.comments)}
                      </span>
                    </button>

                    {/* share */}
                    <button
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "" : "text-gray-600"
                      } hover:text-green-500 transition-colors`}
                    >
                      <Share className="w-5 h-5" />
                      <span className="font-semibold">
                        {humanify(post.shares)}
                      </span>
                    </button>
                  </div>

                  {/* views */}
                  <div
                    className={`text-sm ${
                      theme === "dark" ? "" : " text-gray-500"
                    } hover:text-green-500 transition-colors`}
                  >
                    <Eye className="w-4 h-4 inline mr-1" />
                    {post.likes + post.comments * 3} views
                  </div>
                </div>
              </div>


              {/*  */}


             
              {isOpen && (
              <div className="border-t border-gray-100 mt-4">
                <div className="p-4">
                  <div className="flex gap-2 items-end">
                    <textarea
                      className={`flex-1 p-3 border rounded-2xl resize-none focus:outline-none focus:ring-2 ${
                        theme === "dark"
                          ? " border-gray-500 text-white focus:ring-green-500"
                          : "border-gray-300 text-gray-900 focus:ring-green-500"
                      }`}
                      placeholder="Write a comment....."
                      rows={3}
                    />
                    <button className="bg-green-600 text-white px-4 py-3 rounded-xl hover:bg-green-700 transition-colors flex-shrink-0 h-fit">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;

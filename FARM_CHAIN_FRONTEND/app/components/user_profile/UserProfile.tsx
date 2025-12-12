"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, CheckCircle, Briefcase,  Heart,
  MessageSquare,
  Share,
  DollarSign,
  Eye,
  ClockFading, 
  EllipsisVertical 
} from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { humanify } from "@/app/components/utils/humanify";


interface Post {
  id: number;
  farmer: string;
  content: string;
  avatar?: string;
  verified?: boolean;
  category?: string;
  location?: string;
  createdAt: string;
  tags?: string[];
  images?: string[];
  video?: string[];
  price?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  isLike?: boolean;
}



const UserProfile: React.FC<{ userId?: string }> = ({ userId: propUserId }) => {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const userId = propUserId ?? searchParams.get("id") ?? undefined;

  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
const [posts, setPosts] = useState<Post[]>([]);


  // ⭐ NEW: Followers local state for instant update
  const [followersCount, setFollowersCount] = useState(0);

  const getUserById = async (id: string) => {
    setLoading(true);

    try {
      const res = await fetch(`https://farmchain.onrender.com/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch user");

      // console.log(data);
      
      
      setPosts(data?.posts || []);  

      return data;
    } catch (err: any) {
      console.error("❌", err.message);
    } finally {
      setLoading(false);
    }
  };

  const FollowUser = async (id: string) => {
    try {
      const res = await fetch(`https://farmchain.onrender.com/user/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ followed_id: Number(id) }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to follow user");

      toast.success(data.message || "Action successful!");

      return data; 
    } catch (err: any) {
      console.error("❌", err.message);
    }
  };

  
const likePost = async (postId: number) => {
  // Optimistically update the UI first
  setPosts(prev =>
    prev.map(post =>
      post.id === postId
        ? {
            ...post,
            isLike: !post.isLike,
            likes: post.isLike ? post.likes! - 1 : post.likes! + 1, // increment/decrement
          }
        : post
    )
  );

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

    // Sync the backend response in case it differs
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: result.likes ?? post.likes,
              isLike: result.isLike ?? post.isLike,
            }
          : post
      )
    );
  } catch (err) {
    console.error("Like error:", err);

    // Revert UI if backend fails
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isLike: !post.isLike,
              likes: post.isLike ? post.likes! - 1 : post.likes! + 1,
            }
          : post
      )
    );

    toast.error("Failed to like post!");
  }
};






  useEffect(() => {
    if (!userId) return;
    if (token === undefined) return;

    getUserById(userId).then((data) => {
      setUser(data);
      setIsFollowed(data?.isFollowed ?? false);
      setFollowersCount(data?.followers ?? 0); // ⭐ sync followers
    });
  }, [userId, token]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = localStorage.getItem("farmchain_token");
    setToken(t);
  }, []);

  // console.log(user);
  
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="flex justify-center lg:mt-2 mb-2 md:mb-3">
        <div
          suppressHydrationWarning
          className={`${
            theme === "dark" ? "border-1" : "bg-white"
          } shadow-2xl rounded-2xl pb-5 w-full sm:max-w-[20rem] md:h-fit md:max-w-full lg:max-w-[1230px]`}
        >
          <div>
            <div className="relative">
              <img
                src={
                  user?.cover_avatar ||
                  "https://images.unsplash.com/photo-1503264116251-35a269479413?..."
                }
                alt="profile"
                className="rounded-b-3xl rounded-t-2xl h-[300px]  w-full md:h-[230px] object-cover"
              />

              {/* ⭐ FOLLOW BUTTON */}
              <div className="absolute top-3 right-4 lg:right-7">
                <button
                  disabled={loading}
                  onClick={async () => {
                    if (!userId || loading) return;

                    setLoading(true);

                    // ⭐ OPTIMISTIC UPDATE
                    if (!isFollowed) {
                      setIsFollowed(true);
                      setFollowersCount(prev => prev + 1); // +1 instantly
                    } else {
                      setIsFollowed(false);
                      setFollowersCount(prev => prev - 1); // -1 instantly
                    }

                    const res = await FollowUser(userId);

                    if (!res) {
                      // ❌ Backend failed → revert UI
                      setIsFollowed(prev => !prev);
                      setFollowersCount(prev =>
                        isFollowed ? prev + 1 : prev - 1
                      );
                      setLoading(false);
                      return toast.error("Failed, try again.");
                    }

                    // ✔ Sync if backend returns updated count
                    setIsFollowed(res.following);
                    if (typeof res.followers === "number") {
                      setFollowersCount(res.followers);
                    }

                    setLoading(false);
                  }}
                  className="bg-green-600 text-white flex gap-2 items-center py-1.5 px-4 rounded-full hover:bg-green-700 disabled:opacity-50"
                >
                  <p className="text-sm font-bold">
                    {loading
                      ? isFollowed
                        ? "Following..."
                        : "Unfollowing..."
                      : isFollowed
                      ? "Unfollow"
                      : "Follow"}
                  </p>

                  {!loading && !isFollowed && (
                    <FaPlus className="font-bold" size={10} />
                  )}
                </button>
                </div>

                <div className="absolute bottom-0 translate-y-1/4 translate-x-7 w-40 h-40 rounded-full bg-white shadow-md flex items-center justify-center overflow-hidden">
                <img
                  src={
                  user?.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT..."
                  }
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover"
                />

                {/* {user?.verified === false && (
                  <CheckCircle
                  aria-hidden="true"
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 text-blue-500 bg-white rounded-full border-2 border-white p-[2px] shadow"
                  />
                )} */}
                </div>
                {user?.verified === false && (
                    <CheckCircle
                   aria-hidden="true"
                  className="absolute -bottom-8 left-[158px] sm:left-16 md:left-40 lg:left-[9.7rem] xl:left-[9.9rem] w-8 h-8 text-blue-500 bg-white rounded-full border-2 border-white p-[2px] shadow"
                      />
                  )}
            </div>

            <div className="mx-6 mt-12">
              {/* name */}
              <p className="font-black text-3xl mb-2">
                {user ? user.name : "Loading..."}
              </p>

              {/* ⭐ FOLLOWERS USING LOCAL STATE */}
              <div className="flex text-sm gap-4 mb-4">
                <p>
                  <span className="font-bold">{humanify(followersCount)}</span> followers
                </p>
                <p>
                  <span className="font-bold">{humanify(user?.following ?? 0)}</span>{" "}
                  following
                </p>
              </div>


                  {/* location */}
              <p className={theme === "dark" ? "text-gray-400 mb-2" : "text-gray-800 mb-2"}>
                <MapPin className="inline-block w-4 h-4 mr-1 mb-1" />
                {user?.location ?? "Unknown Location"}
              </p>


                  {/* Organizarion */}
              <p className={theme === "dark" ? "text-gray-400" : "text-gray-800"}>
                <Briefcase className="inline-block w-4 h-4 mr-1 mb-1" />
                {user?.organization ?? "Organization"}
              </p>

                  {/* Bio */}
              <p
                className={
                  theme === "dark"
                    ? "text-gray-400 mt-4 mb-7 md:text-xl"
                    : "text-gray-800 mt-4 mb-7 md:text-xl"
                }
              >
                {user?.bio ?? "No bio available."}
              </p>

              {/* bottom stats */}
              <div className="flex justify-between items-center mb-8">

                <div className="flex flex-col items-center">
                  <p className="font-black">{humanify(user?.likesCount || 0)}</p>
                  <p className="text-gray-400">Likes</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="font-black">{humanify(user?.postsCount || 0)}</p>
                  <p className="text-gray-400">Posts</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="font-black">2.6K</p>
                  <p className="text-gray-400">Views</p>
                </div>
              </div>

              {/* POST */}
               {/* POSTS */}
            <div>
              <h1 className="text-center text-5xl pt-5 mb-10 underline">
                Posts
              </h1>
            </div>
            
               {posts?.map((post: any) => (
              <div
                key={post.id}
                className={`${
                  theme === "dark" ? "" : "bg-white"
                } rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 mb-8`}
              >
                <div className="p-3 py-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        {/* profile post img */}
                        <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-blue-500 rounded-full ">
                          <img
                            className="h-full w-full rounded-full"
                            src={post.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k83MyoiH43lpI6Y-TY17A2JCPudD_7Av9A&s"}
                            alt=""
                          />
                        </div>
                        {post.verified === false && (
                          <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-blue-500 bg-white rounded-full" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center w-full">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className="min-w-0">
                              <h3
                                className={`font-bold text-lg truncate ${
                                  theme === "dark" ? "" : "text-gray-900"
                                }`}
                              >
                                {post.farmer}
                              </h3>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                              {post.category}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 ml-18 lg:ml-[560px]">
                            {/* <button
                              className="p-1 text-gray-100 hover:text-gray-500 rounded-full"
                              aria-label="more"
                              onClick={(e) => {
                                e.stopPropagation();
                                const m = document.getElementById(
                                  `post-modal-${post.id}`
                                );
                                if (m) m.classList.remove("hidden");
                              }}
                            >
                              <EllipsisVertical />
                            </button> */}

                          
                          </div>
                        </div>

                        <div
                          className={`flex flex-col-reverse  md:space-x-7 text-sm ${
                            theme === "dark" ? "" : "text-gray-500"
                          }`}
                        >
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 " />
                            {post.location}
                          </div>
                          {/*  */}
                          <div className="flex items-center ">
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
                      {post.tags.map((tag: string, idx: number) => (
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
                  {post.images && post.images.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {post.images.map((img: string, i: number) => (
                        <div
                          key={i}
                          className="rounded-2xl w-full relative overflow-hidden"
                        >
                          <img
                            src={img}
                            alt="Images"
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VIDEO */}
                  {post.video && (
                    <div className=" rounded-2xl   grid md:grid-cols-2 gap-3 text-white relative overflow-hidden">
                      <div className="absolute inset-0 "></div>
                      {post.video.map((vid: string, i: number) => (
                        <div
                          key={i}
                          className="relative w-full rounded-2xl overflow-hidden"
                        >
                          <video
                            autoPlay
                            controls
                            playsInline
                            src={vid}
                            className="h-[500px] object-cover"
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

                        <button
  onClick={() => likePost(post.id)}
  className="flex items-center space-x-2"
>
  {post.isLike ? (
    <FaHeart className="w-5 h-5 text-red-500" />
  ) : (
    <FiHeart className="w-5 h-5" />
  )}
  <span className="font-semibold">{humanify(post.likes ?? 0)}</span>
</button>


                      <button
                        className={`flex items-center space-x-2 ${
                          theme === "dark" ? "" : "text-gray-600"
                        } hover:text-blue-500 transition-colors`}
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-semibold">{humanify(post.comments)}</span>
                      </button>
                      <button
                        className={`flex items-center space-x-2 ${
                          theme === "dark" ? "" : "text-gray-600"
                        } hover:text-green-500 transition-colors`}
                      >
                        <Share className="w-5 h-5" />
                        <span className="font-semibold">{humanify(post.shares)}</span>
                      </button>
                    </div>

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
              </div>
            ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

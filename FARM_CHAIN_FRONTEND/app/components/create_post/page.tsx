"use client";
import React, { useState, useEffect, useRef } from "react";
import { useCurrentUser } from "@/app/components/currentUser";
import {
  Image as ImageIcon,
  Video,
  Leaf,
  FileText,
  Tag,
  Grid,
  Upload,
  Send,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useActiveTab } from "@/app/context/ActiveTabContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost: React.FC = () => {
   const activeTabContext = useActiveTab();
  const setActiveTab = activeTabContext?.setActiveTab ?? (() => {});

  const [content, setContent] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("general");

  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);


  const { token } = useCurrentUser();
  const { theme } = useTheme();

  const cancelToken = useRef<any>(null);

  // -----------------------------
  // IMAGE UPLOAD
  // -----------------------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...images, ...files].slice(0, 10);

    setImages(newFiles);
    setImagePreviews(newFiles.map((f) => URL.createObjectURL(f)));
  };

 // -----------------------------
// VIDEO UPLOAD + THUMBNAIL FIXED
// -----------------------------
const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []).slice(0, 4); // max 4
  setVideos(files);

  // Generate thumbnails reliably
  const previews: string[] = [];
  for (const file of files) {
    previews.push(await generateVideoThumbnail(file));
  }
  setVideoPreviews(previews);
};

const generateVideoThumbnail = (file: File) => {
  return new Promise<string>((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      video.currentTime = Math.min(1, video.duration / 2); // safer frame
    };

    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 320;
      canvas.height = 180;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(video.src); // free memory
      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
};


  // -----------------------------
  // REMOVE MEDIA
  // -----------------------------
  const removeImage = (i: number) => {
    setImages(images.filter((_, index) => index !== i));
    setImagePreviews(imagePreviews.filter((_, index) => index !== i));
  };

  const removeVideo = (i: number) => {
    setVideos(videos.filter((_, index) => index !== i));
    setVideoPreviews(videoPreviews.filter((_, index) => index !== i));
  };

  // -----------------------------
  // CLEANUP
  // -----------------------------
  useEffect(() => {
    return () => {
      imagePreviews.forEach((src) => URL.revokeObjectURL(src));
      videoPreviews.forEach((src) => URL.revokeObjectURL(src));
    };
  }, []);

  // -----------------------------
  // SUBMIT FORM WITH PROGRESS + CANCEL
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return toast.error("You are not authenticated, Please log in.");

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));
    videos.forEach((vid) => formData.append("videos", vid));
    formData.append("content", content || "");
    formData.append("farmSize", farmSize || "");
    formData.append("tags", tags || "");
    formData.append("category", category || "general");

    cancelToken.current = axios.CancelToken.source();
    setLoading(true)

    try {
      const res = await axios.post(
        "https://farmchain.onrender.com/post/create",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          onUploadProgress: (e) => setProgress(Math.round((e.total ? (e.loaded * 100) / e.total : 100))),
          cancelToken: cancelToken.current.token,
        }
      );

      if (res.data.success) {
        toast.success("Post created successfully!");
        // Reset form
        setContent("");
        setFarmSize("");
        setTags("");
        setCategory("general");
        setImages([]);
        setVideos([]);
        setImagePreviews([]);
        setVideoPreviews([]);
        setProgress(0);
        setLoading(false)

        setTimeout(()=> {
            setActiveTab("feed")
        }, 2000)

      } else {
        toast.error("❌ " + (res.data.message || "Unknown error"));
      }
    } catch (error: any) {
      if (axios.isCancel(error)) toast.warn("Upload cancelled");
      else toast.error("❌ Something went wrong, try again!");
    }
  };

  const handleCancel = () => {
    if (cancelToken.current) cancelToken.current.cancel("User cancelled upload");
  };

  return (
    <div className="max-w-2xl md:max-w-full">
      <ToastContainer />
       <div className={`${theme === 'dark' ? 'bg-gradient-to-br from-white/10 to-white/15 border-1 text-white' : 'bg-gradient-to-br from-green-700 to-emerald-500 text-white'} rounded-3xl shadow-xl p-8 py-10 mb-5 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 flex items-center space-x-2">
            <Leaf className="w-7 h-7" />
            <span>Create New Post</span>
          </h2>
          <p className={`${theme === 'dark' ? 'text-white' : 'text-green-100'} text-lg pt-2`}>
            Share your latest farming update 🌾
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`${theme === 'dark' ? 'bg-black text-white' : 'bg-white '} rounded-3xl shadow-lg border border-gray-100 p-6 space-y-6`}
      >
        {/* CONTENT */}
        <div>
          <label className={`flex items-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-700'} mb-2`}>
            <FileText className="w-4 h-4 mr-2" /> Post Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="What's happening on your farm today?"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>

        {/* FARM SIZE */}
        <div>
          <label className={`flex items-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-700'} mb-2`}>
            <Grid className="w-4 h-4 mr-2" /> Farm Size (e.g. 5 acres)
          </label>
          <input
            type="text"
            value={farmSize}
            onChange={(e) => setFarmSize(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* TAGS */}
        <div>
          <label className={`flex items-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-700'} mb-2`}>
            <Tag className="w-4 h-4 mr-2" /> Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. corn harvest irrigation"
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className={`flex items-center font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-700'} mb-2`}>
            <ImageIcon className="w-4 h-4 mr-2" /> Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
           <option value="general">General</option>
<option value="crop">Crop</option>
<option value="livestock">Livestock</option>
<option value="equipment">Equipment</option>
<option value="market">Market</option>

          </select>
        </div>

        {/* UPLOAD MEDIA */}
        <div className="border-t pt-4">
          <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-3 flex items-center`}>
            <Upload className="w-5 h-5 mr-2" /> Upload Photos & Videos
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Images */}
            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-2xl p-6 cursor-pointer hover:bg-green-50 transition-colors">
              <ImageIcon className="w-10 h-10 text-green-500 mb-2" />
              <span className="text-gray-600 text-sm">
                Upload Images (max 10)
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageChange}
              />
            </label>

            {/* Videos */}
            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-2xl p-6 cursor-pointer hover:bg-blue-50 transition-colors">
              <Video className="w-10 h-10 text-blue-500 mb-2" />
              <span className="text-gray-600 text-sm">
                Upload Videos (max 4)
              </span>
              <input
              id="videoInput"
              type="file"
              accept="video/*"
              multiple
              hidden
              onChange={handleVideoChange}
            />
            </label>
          </div>

         {/* PREVIEWS */}
{(imagePreviews.length > 0 || videoPreviews.length > 0) && (
  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
    {imagePreviews.map((src, i) => (
      <div key={i} className="relative group">
        <img
          src={src}
          className="w-full h-24 object-cover rounded-xl shadow"
        />
        <button
          type="button"
          onClick={() => removeImage(i)}
          className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ))}

    {videos.map((file, i) => (
      <div key={i} className="relative group">
        <video
          src={URL.createObjectURL(file)} // <-- FIXED: use the File directly
          controls
          className="w-full h-24 object-cover rounded-xl shadow"
        />
        <button
          type="button"
          onClick={() => removeVideo(i)}
          className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ))}
  </div>
)}

        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 w-full rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Send className={`w-5 h-5 ${loading ? "hidden" : ""}`} />
          <span>{loading ? "Uploading...." : "Post Update"}</span>
        </button>

          {progress > 0 && (
        <div className="w-full bg-gray-300 h-2 rounded mt-2">
          <div className="bg-green-500 h-2 rounded" style={{ width: `${progress}%` }} />
        </div>
      )}

      <button
        type="button"
        onClick={handleCancel}
        className={`bg-red-500 text-white px-4 py-2 rounded mt- w-full ${loading ? "" : "hidden "}`}
      >
        Cancel Upload
      </button>
      </form>
    
      
    </div>
  );
};

export default CreatePost;

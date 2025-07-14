import React, { useState } from "react";
import SongCard from "../../../components/SongCard";
import CategoryTag from "../../../components/CategoryTag";
import { FaHeart } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import recentlyPlayed from "../../../data/recentlyPlayed.json";
// import playButton from "../../../assets/playButton.svg";

export default function MusicDashboard() {
  const categories = [
    { label: "World", color: "#00bcd4" },
    { label: "Funk", color: "#ff9800" },
    { label: "Punk", color: "#e91e63" },
    { label: "Indie", color: "#f06292" },
    { label: "Grunge", color: "#d32f2f" },
    { label: "Country", color: "#7b1fa2" },
    { label: "Post-Rock", color: "#c2185b" },
    { label: "Folk", color: "#6a1b9a" },
    { label: "Alternative", color: "#009688" },
    { label: "Soundtrack", color: "#03a9f4" },
  ];
  const [activeTab, setActiveTab] = useState("Songs");

  return (
    <div className="flex h-screen bg-[#121216]">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto text-white">
        {/* Search Bar & Profile */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search here..."
            className="bg-[#1f1f24] p-2 rounded w-1/2 text-sm text-white"
          />
          <div className="flex items-center gap-2">
            <span>Mia Hartley</span>
            <div className="w-8 h-8 rounded-full bg-white" />
          </div>
        </div>

        {/* Trending Now Section */}
        <h2 className="text-xl font-semibold mb-2">Trending Now</h2>
        <div className="flex gap-4 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <SongCard key={i} highlighted={i === 1} />
          ))}
        </div>

        {/* You Will Love Section */}
        <h2 className="text-xl font-semibold mb-2">You will Love</h2>
        <div className="flex gap-4 mb-4 text-sm border-b border-gray-700 pb-2">
          {[
            "All",
            "Songs",
            "Albums",
            "Artists",
            "Playlists",
            "Genres",
            "Liked",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)} // assuming you track active tab
              className={`relative px-2 py-1 hover:text-blue-400 !bg-transparent transition-colors duration-200
                focus:outline-none focus-visible:outline-none
                ${
                  activeTab === tab
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white after:transition-all after:duration-300"
                    : ""
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Song List */}
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b border-gray-700"
            >
              <span>#1</span>
              <div className="flex items-center gap-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Song"
                  className="w-10 h-10 rounded"
                />
                <div>
                  <p>Song name</p>
                </div>
              </div>
              <p>
                <p className="text-xs">Artist name</p>
              </p>
              <p>3:33</p>
              <div className="flex items-center gap-2">
                <span>128</span>
                <FaHeart className="text-blue-400" />
              </div>
              <FiMoreHorizontal />
            </div>
          ))}
        </div>
      </div>
      {/* Right Sidebar - Recently Played and Categories */}
      <div className="w-72 bg-[#1b1b1f] p-4 border-l border-gray-800 text-white flex flex-col">
        <div>
          <h2 className="text-lg mb-3">Recently Played</h2>
          {recentlyPlayed.map((item, index) => (
            <div
              key={item.id}
              className={`flex items-center gap-2 mb-3 p-2 rounded cursor-pointer ${
                index === 1 ? "bg-[#2f2f35]" : ""
              }`}
            >
              <img
                src={item.img}
                className="w-10 h-10 rounded"
                alt={item.songname}
              />
              <div className="flex-1">
                <p className="text-sm">{item.songname}</p>
                <p className="text-xs text-gray-400">{item.artistname}</p>
              </div>
              <div className="w-2 h-2">
                {/* <img src={playButton} alt="" /> */}
              </div>
            </div>
          ))}
        </div>
        {/* Categories Section */}
        <div className="mt-6">
          <h2 className="text-lg mb-2">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <CategoryTag key={idx} {...cat} />
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#1b1b1f] border-t border-gray-800 flex items-center justify-between px-6 text-sm z-50">
        {/* Left: Song Info */}
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/50"
            alt="Album"
            className="w-12 h-12 rounded object-cover"
          />
          <div>
            <p className="text-white font-semibold text-sm">Stay</p>
            <p className="text-gray-400 text-xs">
              The Kid LAROI, Justin Bieber
            </p>
          </div>
          <FaHeart className="ml-4 text-gray-400 cursor-pointer hover:text-red-500" />
        </div>

        {/* Middle: Player Controls + Progress Bar */}
        <div className="flex flex-col items-center gap-1 w-[40%]">
          {/* Controls */}
          <div className="flex items-center gap-5">
            <button className="text-gray-400 hover:text-white">⤭</button>
            <button className="text-gray-400 hover:text-white">⏮</button>
            <button className="bg-white text-black rounded-full p-1.5 hover:scale-105 transition">
              ▶
            </button>
            <button className="text-gray-400 hover:text-white">⏭</button>
            <button className="text-green-500">🔁</button>
          </div>
          {/* Progress */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-gray-400">4:07</span>
            <div className="flex-1 h-1 bg-gray-600 rounded overflow-hidden">
              <div className="h-full w-[50%] bg-purple-500 animate-pulse" />
            </div>
            <span className="text-xs text-gray-400">5:10</span>
          </div>
        </div>

        {/* Right: Volume + Extra Controls */}
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-xs">1x</span>
          <span className="text-gray-400">📝</span>
          <span className="text-gray-400">📃</span>
          <span className="text-gray-400">👁️</span>
          {/* Volume bar */}
          <div className="w-24 h-1 bg-gray-600 rounded">
            <div className="h-full w-[60%] bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

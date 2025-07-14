import React, { useState } from "react";
import SongCard from "../../../components/SongCard";
import CategoryTag from "../../../components/CategoryTag";
import { FaHeart } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import recentlyPlayed from "../../../data/recentlyPlayed.json";
import songList from "../../../data/songList.json";
import AudioPlayer from "../MusicPlayer/AudioPlayer";
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
    <div className="bg-[#121216]">
      <div className="flex justify-between items-center p-4 h-[10vh]">
        <input
          type="text"
          placeholder="Search here..."
          className="bg-[#1f1f24] p-2 rounded w-1/2 text-sm text-white"
        />
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-white">
            <img src="./assets/Ellipse.svg" alt="" />
          </div>
          <span className="text-white">Mia Hartley</span>
          <span>
            <img src="./assets/heart.svg" alt="" />
          </span>
          <span>
            <img src="./assets/settings.svg" alt="" />
          </span>
        </div>
      </div>
      <div className="flex h-[75vh] bg-[#121216] overflow-auto">
        {/* Main Content */}
        <div className="flex-1 py-2 px-4 overflow-auto text-white">
          {/* Search Bar & Profile */}

          {/* Trending Now Section */}
          <h2 className="text-xl font-semibold mb-2">Trending Now</h2>
          <div className="flex gap-4 mb-6">
            {[{ id: 1, song: "Baby", artist: "Justin Bieber" }].map((item) => (
              <SongCard item={item} key={item.id} highlighted={item.id === 1} />
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
            {songList.map((ele, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-2 border-b border-gray-700"
              >
                <span>{1 + i++}</span>
                <div className="flex items-center gap-2">
                  <img src={ele.img} alt="Song" className="w-10 h-10 rounded" />
                  <div>
                    <p>{ele.songname}</p>
                  </div>
                </div>
                <p>
                  <p className="text-xs">{ele.artistname}</p>
                </p>
                <p>{ele.duration}</p>
                <div className="flex items-center gap-2">
                  <span>{ele.like}</span>
                  <FaHeart className="text-blue-400" />
                </div>
                <FiMoreHorizontal />
              </div>
            ))}
          </div>
        </div>
        {/* Right Sidebar - Recently Played and Categories */}
        <div className="w-72 bg-[#1b1b1f] p-4 border-l border-gray-800 text-white flex flex-col overflow-auto">
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
      </div>
      <AudioPlayer />
    </div>
  );
}

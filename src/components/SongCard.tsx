import React from "react";
import { FaHeart } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

type Props = {
  highlighted?: boolean; // Optional: highlight this card
};

export default function SongCard({ highlighted }: Props) {
  return (
    <div
      className={`w-48 p-3 rounded-md ${
        highlighted ? "bg-purple-600" : "bg-[#2a2a31]"
      } text-white`}
    >
      {/* Song Cover Image */}
      <img src="./assets/ImageA2.svg" alt="Song" className="rounded-md mb-2" />

      {/* Song and Artist Info */}
      <p className="text-sm font-semibold">Song name</p>
      <p className="text-xs text-gray-400">Artist name</p>

      {/* Likes and Menu */}
      <div className="flex justify-between items-center mt-1 text-xs">
        <span>
          <FaHeart className="inline" /> 52
        </span>
        <FiMoreHorizontal />
      </div>
    </div>
  );
}

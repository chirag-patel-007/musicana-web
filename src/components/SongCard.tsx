import React from "react";
import { FaHeart } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";

type Props = {
  highlighted?: boolean; // Optional: highlight this card
  item: {
    id: number;
    song: string;
    artist: string;
  };
};

export default function SongCard({ highlighted, item }: Props) {
  return (
    <div
      className={`w-48  rounded-md ${
        highlighted ? "bg-purple-600" : "bg-[#2a2a31]"
      } text-white`}
    >
      {/* Song Cover Image */}
      <img
        src="./assets/Justin-Bieber-Baby.webp"
        alt="Song"
        className="rounded-md mb-2 w-48"
      />

      <div className="p-3">
        {/* Song and Artist Info */}
        <p className="text-sm font-semibold">Song name:  {item.song}</p>
        <p className="text-xs text-gray-400">Artist name: {item.artist}</p>

        {/* Likes and Menu */}
        <div className="flex justify-between items-center mt-1 text-xs">
          <span>
            <FaHeart className="inline" /> 52
          </span>
          <FiMoreHorizontal />
        </div>
      </div>
    </div>
  );
}

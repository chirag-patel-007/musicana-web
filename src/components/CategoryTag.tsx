import React from "react";

type Props = {
  label: string;
  color: string;
};

export default function CategoryTag({ label, color }: Props) {
  return (
    <span
      className="text-white text-xs px-4 py-2 rounded-sm"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}

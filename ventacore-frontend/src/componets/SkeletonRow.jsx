import React from "react";

const SkeletonRow = () => {
  return (
    <tr className="animate-pulse">
      {Array(8).fill(0).map((_, index) => (
        <td key={index} className="py-4 px-4 border">
          <div className="h-4 bg-gray-300 rounded w-full mx-auto"></div>
        </td>
      ))}
    </tr>
  );
};

export default SkeletonRow;

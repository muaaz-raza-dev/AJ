import React from 'react'

export default function EachDiaryCard() {
  return (
    <div className="bg-box rounded-lg shadow-md p-4 max-w-[32%]  my-4">
    {/* Title */}
    <h2 className="text-xl font-bold text-gray-800 mb-2">English Home Work</h2>

    {/* Content Preview */}
    <p className="text-gray-600 mb-4">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure perspiciatis quam odio fugit quos suscipit consectetur distinctio maxime beatae, recusandae ab atque cumque ipsa nesciunt explicabo quod tempore sit iusto.
    </p>

    {/* Images (if available) */}
      <div className="mb-4">
        <img
          src={"/images/sample.png"}
          alt="Diary"
          className="w-full h-48 object-cover rounded-md"
        />
        
      </div>

    {/* Tags */}
      <div className="mb-4">
          <span
            className="text-sm bg-blue-100 text-blue-800 rounded-full px-2 py-1 mr-2"
          >
              Infuencial
          </span>
      </div>

    {/* Date and Published By */}
    <div className="flex justify-between items-center">
      <span className="text-gray-500 text-sm">Wednesday 13 - 2024</span>
      <span className="text-gray-700 font-medium text-sm">Published by: Muaaz Raza</span>
    </div>
  </div>
  )
}

"use client";

import { useState } from "react";

export default function ImageGallery({ mainImage, gallery }: { mainImage: string, gallery: string[] }) {
  const allImages = [mainImage, ...(gallery || [])];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  return (
    <div className="flex flex-col md:flex-row gap-4 md:h-[500px]">
      
      {/* 1. MAIN IMAGE VIEW */}
      <div className="w-full md:flex-1 bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100 aspect-square md:aspect-auto md:h-full order-1 md:order-2">
        <img 
          src={selectedImage} 
          alt="Product View" 
          className="w-full h-full object-contain" 
        />
      </div>

      {/* 2. THUMBNAILS */}
      {/* Added 'justify-center' to center items on mobile */}
      {/* kept 'md:justify-start' so on desktop they start from top */}
      <div className="flex flex-row md:flex-col justify-center md:justify-start gap-3 md:gap-4 w-full md:w-24 overflow-x-auto md:overflow-y-auto order-2 md:order-1">
        {allImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`border-2 rounded-lg overflow-hidden transition flex-shrink-0 ${
              selectedImage === img ? "border-black ring-1 ring-black" : "border-transparent hover:border-gray-300"
            }`}
          >
            <img 
              src={img} 
              alt="Thumbnail" 
              className="w-16 h-16 md:w-full md:h-24 object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  );
}
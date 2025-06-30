'use client'

import React, { useRef, useState } from "react";
import Image from "next/image";

interface ZoomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  zoom?: number; // e.g. 2 for 2x zoom
}

export const ZoomImage: React.FC<ZoomImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  zoom = 2,
}) => {
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden group ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
      onMouseMove={handleMouseMove}
    >
      <Image src={src} alt={alt} width={width} height={height} className="rounded-lg lg:rounded-xl bg-white" />
      {showZoom && (
        <div
          className="absolute pointer-events-none border-2 border-blue-500 rounded-lg shadow-lg z-50"
          style={{
            left: position.x - width / (zoom * 2),
            top: position.y - height / (zoom * 2),
            width: width / zoom,
            height: height / zoom,
            backgroundImage: `url(${src})`,
            backgroundSize: `${width * zoom}px ${height * zoom}px`,
            backgroundPosition: `-${position.x * (zoom - 1)}px -${position.y * (zoom - 1)}px`,
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}; 
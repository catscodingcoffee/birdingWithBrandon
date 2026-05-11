"use client";
import { useState } from "react";
import Image from "next/image";

interface Photo{
    title:string;
    imageUrl:string;
    link:string;
}

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
                <div
                    key={photo.link}
                    className={`rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer ${
                        selectedIndex === index ? "ring-4 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedIndex(index)}
                >
                    <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900">
                        <Image
                            src={photo.imageUrl}
                            alt={photo.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                    <div className="p-4 space-y-3">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{photo.title}</p>
                    </div>
                </div>
            ))}
        </div>
        {selectedIndex !== null && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
                onClick={() => setSelectedIndex(null)}
            >
                <div className="relative w-[80vw] max-w-4xl aspect-[4/3]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image
                        src={photos[selectedIndex].imageUrl}
                        alt={photos[selectedIndex].title}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        )}
        </>
    );
}

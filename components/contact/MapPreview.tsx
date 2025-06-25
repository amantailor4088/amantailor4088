"use client";

import Link from "next/link";

const MapPreview = () => {
  return (
    <div className="relative w-full h-64 sm:h-80 lg:h-[400px] overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-neutral-800">
      {/* Embedded Static Map Preview */}
      <iframe
        title="Aman Tailor Location"
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13745.387030571718!2d74.923362!3d30.208738!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDEyJzMxLjQiTiA3NMKwNTUnMjQuMSJF!5e0!3m2!1sen!2sin!4v1719234567890!5m2!1sen!2sin"
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0, pointerEvents: "none" }} // Disable interaction
        allowFullScreen
      ></iframe>

      {/* Transparent Click Overlay */}
      <Link
        href="https://www.google.com/maps/dir/?api=1&destination=30.208738,74.923362"
        target="_blank"
        aria-label="Navigate to Aman Tailor"
        className="absolute inset-0 z-10"
      >
        {/* Optional: Tooltip or subtle button */}
        <div className="absolute bottom-3 right-3 bg-yellow-400 text-purple-900 font-medium px-4 py-1 rounded-md text-sm shadow-md hover:bg-yellow-300 transition pointer-events-none">
          Open in Google Maps
        </div>
      </Link>
    </div>
  );
};

export default MapPreview;

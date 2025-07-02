import React from "react";

type Video = {
  title: string;
  embedUrl: string;
  bunnyVideoId: string;
};

function VideoCard({ video }: { video: Video }) {
  return (
    <div
      key={video.bunnyVideoId}
      className="border dark:border-neutral-600 rounded-md overflow-hidden shadow"
    >
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src={video.embedUrl}
          loading="lazy"
          style={{
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {video.title}
        </h4>
      </div>
    </div>
  );
}

export default VideoCard;

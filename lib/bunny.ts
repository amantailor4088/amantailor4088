// /lib/bunny.ts

const BUNNY_API_KEY = process.env.BUNNY_VIDEO_API_KEY!;
const LIBRARY_ID = process.env.BUNNY_VIDEO_LIBRARY_ID!;

export async function createBunnyVideo(title: string) {
  const url = `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      AccessKey: BUNNY_API_KEY,
    },
    body: JSON.stringify({
      title,
      description: "Video uploaded via Aman Tailor",
      tags: ["aman-tailor", "video-upload"],
      allowEmbedding: true,
      allowPublicAccess: true,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Bunny create video error:", error);
    throw new Error(`Failed to create video: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export async function uploadBunnyVideo(videoId: string, videoBuffer: Buffer) {
  const url = `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      AccessKey: BUNNY_API_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: videoBuffer,
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Bunny upload error:", error);
    throw new Error(`Failed to upload video: ${res.status} ${res.statusText}`);
  }
}

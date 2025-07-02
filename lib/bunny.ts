
// Bunny Video configuration
const BUNNY_API_KEY = process.env.BUNNY_VIDEO_API_KEY!;
const LIBRARY_ID = process.env.BUNNY_VIDEO_LIBRARY_ID!;
// Bunny Storage configuration
const BUNNY_STORAGE_BASE_URL = process.env.BUNNY_STORAGE_BASE_URL!;
const BUNNY_STORAGE_ZONE = process.env.BUNNY_STORAGE_ZONE!;
const BUNNY_STORAGE_API_KEY = process.env.BUNNY_STORAGE_API_KEY!;


export async function createBunnyVideo(
  title: string,
  BUNNY_API_KEY: string,
  LIBRARY_ID: string
) {
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

export async function uploadBunnyVideo(videoId: string,videoFile: File,BUNNY_API_KEY: string,LIBRARY_ID: string
) {
  const url = `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`;

  // Convert video file to ArrayBuffer
  const arrayBuffer = await videoFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      AccessKey: BUNNY_API_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: buffer,
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Bunny upload error:", error);
    throw new Error(`Failed to upload video: ${res.status} ${res.statusText}`);
  }
}

export async function uploadThumbnailToBunny(
  fileName: string,
  fileBuffer: Buffer
): Promise<string> {
  const url = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${fileName}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      AccessKey: BUNNY_STORAGE_API_KEY,
      "Content-Type": "application/octet-stream",
    },
    body: fileBuffer,
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Bunny thumbnail upload error:", error);
    throw new Error(
      `Failed to upload thumbnail: ${res.status} ${res.statusText}`
    );
  }

  return `${BUNNY_STORAGE_BASE_URL}/${fileName}`;
}

// lib/bunny.ts

export async function deleteBunnyVideo( videoId: string) {
  const url = `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      AccessKey: BUNNY_API_KEY,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete Bunny video. Status ${res.status}. Response: ${text}`);
  }

  return true;
}

export async function deleteBunnyThumbnail( filePath: string, fileName: string) {
  const url = `https://storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${filePath}/${fileName}`;

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      AccessKey:BUNNY_STORAGE_API_KEY,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete Bunny thumbnail. Status ${res.status}. Response: ${text}`);
  }

  return true;
}



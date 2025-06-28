// /lib/bunny.ts

import axios from "axios";

const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
const LIBRARY_ID = process.env.BUNNY_LIBRARY_ID;

export async function createBunnyVideo(title: string) {
  const res = await axios.post(
    `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`,
    {
      title,
      collectionId: null,
    },
    {
      headers: {
        AccessKey: BUNNY_API_KEY!,
        accept: "application/json",
        "content-type": "application/json",
      },
    }
  );

  return res.data; // has GUID
}

export async function uploadBunnyVideo(videoId: string, videoBuffer: Buffer) {
  await axios.put(
    `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos/${videoId}`,
    videoBuffer,
    {
      headers: {
        AccessKey: BUNNY_API_KEY!,
        "Content-Type": "application/octet-stream",
      },
      maxBodyLength: Infinity,
    }
  );
}

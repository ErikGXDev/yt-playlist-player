//@ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import { google, youtube_v3 } from "googleapis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = JSON.parse(req.body);
  console.log(url);

  try {
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.API_KEY,
    });

    const playlistId = getPlaylistIdFromURL(url);

    const playlistResponse = await youtube.playlists.list({
      part: ["snippet", "status"],
      id: [playlistId],
    });

    const playlist = playlistResponse.data.items?.[0];

    if (!playlist) {
      throw new Error("Playlist not found");
    }

    const ownerId = playlist.snippet.channelId;

    if (!ownerId) {
      throw new Error("Owner ID not found");
    }

    const ownerResponse = await youtube.channels.list({
      part: ["snippet"],
      id: [ownerId],
    });

    const owner = ownerResponse.data.items?.[0];

    if (!owner) {
      throw new Error("Owner not found");
    }

    const itemsResponse = await youtube.playlistItems.list({
      part: ["snippet"],
      playlistId: playlistId,
      maxResults: 50,
    });

    const items: PlaylistItem[] = itemsResponse.data.items ?? [];

    res.status(200).json({
      name: playlist.snippet.title,
      owner: owner.snippet.title,
      visibility: playlist.status.privacyStatus,
      items: items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch playlist information" });
  }
}

function getPlaylistIdFromURL(url: string): string {
  const match = url.match(/list=([\w-]+)/);
  return match?.[1] ?? "";
}

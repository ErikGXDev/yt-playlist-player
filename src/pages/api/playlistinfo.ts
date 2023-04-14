//@ts-nocheck

import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

import { getToken } from "next-auth/jwt";
import { isValidHttpUrl } from "@/components/util/isUrl";
import { PlaylistItemType } from "@/components/util/youtubeTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const accessToken = token?.accessToken;

  if (!accessToken || accessToken == "") {
    res
      .status(401)
      .json({ error: "No Access Token provided. Are you logged in?" });
  }
  const { input } = JSON.parse(req.body);

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
      version: "v3",
      auth,
    });

    var playlistId = input;

    if (isValidHttpUrl(input)) {
      playlistId = getPlaylistIdFromURL(input);
    }

    if (!playlistId) {
      res.status(500).json({ error: "Invalid URL or ID" });
    }

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
      part: ["snippet", "contentDetails"],
      playlistId: playlistId,
      maxResults: 50,
    });

    var items: PlaylistItemType[] = itemsResponse.data.items ?? [];

    const videoIds = items.map((item) => item.contentDetails.videoId);

    const videosResponse = await youtube.videos.list({
      part: ["contentDetails"],
      id: videoIds.join(","), // pass the video ID as a query parameter
    });
    console.log(videosResponse);

    for (let index = 0; index < videosResponse.data.items.length; index++) {
      const video = videosResponse.data.items?.[index];
      const duration = video?.contentDetails?.duration;

      items[index].snippet.duration = duration;
    }

    res.status(200).json({
      ownerid: ownerId,
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

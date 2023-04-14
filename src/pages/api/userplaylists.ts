//@ts-nocheck

import { google, youtube_v3 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!accessToken) {
    res
      .status(401)
      .json({ error: "No Access Token provided. Are you logged in?" });
  }
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
      version: "v3",
      auth,
    });

    const playlistsResponse = await youtube.playlists.list({
      part: ["id", "snippet", "contentDetails"],
      mine: true,
      maxResults: 50,
    });

    const playlists = playlistsResponse.data.items || [];

    res.status(200).json({ playlists });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.errors[0].message || "Failed to fetch playlists" });
  }
}

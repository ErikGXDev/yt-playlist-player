//@ts-nocheck
import { google, youtube_v3 } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

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

  const { id } = JSON.parse(req.body);
  if (!id || id == "") {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
      version: "v3",
      auth,
    });

    const channelsResponse = await youtube.channels.list({
      part: ["id", "snippet", "contentDetails"],
      id: id,
    });

    const channels = channelsResponse.data.items || [];

    res.status(200).json({ channel: channels[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch channel details" });
  }
}

import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import {
  FullChannel,
  type PlaylistItemType,
  type PlaylistType,
} from "./util/youtubeTypes";
import SongItem from "./SongItem";
import { iso8601DurationToSeconds, to_h_min } from "./util/time";

interface DetailsProps {
  active: PlaylistType;
  setPlay: Function;
  setPlayPlaylist: Function;
  play?: PlaylistItemType;
}

export default function PlaylistDetails({
  active,
  setPlay,
  setPlayPlaylist,
  play,
}: DetailsProps) {
  const [userinfo, setUserinfo] = useState<FullChannel>();
  useEffect(() => {
    fetch("/api/userinfo", {
      method: "POST",
      body: JSON.stringify({
        id: active.ownerid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserinfo(data.channel);
      });
  }, []);

  return (
    <div className="p-4 h-full">
      <h1 className="w-5/6 text-4xl md:text-6xl xl:text-8xl leading-none font-black mb-2">
        {active.name}
      </h1>
      <div className="flex items-center gap-2">
        <img
          src={userinfo?.snippet.thumbnails.medium.url}
          className="w-8 h-8 rounded-full"
        ></img>
        <p className="font-semibold">{active.owner}</p>
        <BsDot></BsDot>
        <p>{active.items.length} songs,</p>
        <p className="text-root-300">
          {to_h_min(
            active.items.reduce(
              (acc: number, obj: any) =>
                acc + iso8601DurationToSeconds(obj.snippet.duration),
              0
            )
          )}
        </p>
      </div>
      <div className="mt-2">
        {active.items.map((item: PlaylistItemType, index) => (
          <div
            onClick={() => {
              setPlay(item);
              setPlayPlaylist(active);
            }}
            key={item.id}
          >
            <SongItem
              author={item.snippet.videoOwnerChannelTitle}
              title={item.snippet.title}
              playing={item.id == play?.id ? true : false}
              duration={iso8601DurationToSeconds(item.snippet.duration)}
              index={index + 1}
            ></SongItem>
          </div>
        ))}
      </div>
    </div>
  );
}

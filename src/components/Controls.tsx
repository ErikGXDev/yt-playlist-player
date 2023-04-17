import YouTube, { YouTubeEvent } from "react-youtube";
import { PlaylistItemType, PlaylistType } from "./util/youtubeTypes";
import ButtonRadial from "./ButtonRadial";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";

import { MdAudiotrack, MdPause, MdPlayArrow } from "react-icons/md";
import { BsFillSkipEndFill, BsFillSkipStartFill } from "react-icons/bs";

interface ControlsType {
  active?: PlaylistType;
  setPlay: Function;
  play: PlaylistItemType;
}

export default function Controls({ active, play, setPlay }: ControlsType) {
  const opts = {
    height: "80",
    width: "200",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const states = {
    stopped: -1,
    ended: 0,
    playing: 1,
    paused: 2,
    buffering: 3,
    notgood: [-1, 0, 3],
  };

  /*


    player.pauseVideo()
    player.playVideo()
    player.setVolume(volume:Number)
    player.setLoop(loopPlaylists:Boolean)

  */

  const [player, setPlayer] = useState<any>();
  const [playerState, setPlayerState] = useState(0);

  const [progress, setProgress] = useState(0);

  function playPosition(pos: any) {
    console.log("oldpos:" + pos);
    if (active) {
      if (pos < 0) {
        pos = active.items.length - 1;
      }
      setPlay(active.items[pos]);
      console.log("oldpos:" + pos);
    }
  }

  useEffect(() => {
    console.log(active, "- Has changed");
  }, [play]); // <-- here put the parameter to listen

  function playNext() {
    if (active) playPosition((play.snippet.position + 1) % active.items.length);
  }

  function playPrevious() {
    if (active) playPosition((play.snippet.position - 1) % active.items.length);
  }

  var item = play;

  setInterval(() => {
    setProgress(player?.getCurrentTime() || 0);
  }, 200);

  return (
    <>
      <YouTube
        opts={opts}
        className="hidden"
        videoId={item?.contentDetails.videoId}
        onReady={(e: YouTubeEvent) => {
          setPlayer(e.target);
        }}
        onStateChange={(e: YouTubeEvent) => {
          setPlayerState(e.data);
          if (e.data == states.ended) {
            playNext();
          }
        }}
      ></YouTube>
      {item && active && (
        <div className="w-full flex justify-between h-24 px-4 md:px-0">
          <div className="flex items-center gap-4 min-w-0 w-1/2">
            <img
              src={item.snippet.thumbnails.high.url}
              className="h-full w-auto aspect-video object-cover hidden md:block"
            ></img>
            <div className="min-w-0">
              <h1 className="font-semibold text-sm md:text-md  text-front min-w-0 truncate">
                {item.snippet.title}
              </h1>
              <p className="text-root-400 text-sm md:text-md">
                {item.snippet.videoOwnerChannelTitle}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex justify-center items-center gap-2">
              <div
                onClick={() => {
                  playPrevious();
                }}
              >
                <ButtonRadial color="secondary">
                  <BsFillSkipStartFill className="w-5 h-5"></BsFillSkipStartFill>
                </ButtonRadial>
              </div>
              <div
                data-state={playerState}
                onClick={() => {
                  console.log(player?.getCurrentTime());
                  switch (playerState) {
                    case states.paused:
                      player?.playVideo();
                      break;
                    case states.playing:
                      player?.pauseVideo();
                      break;
                  }
                }}
              >
                <ButtonRadial color="primary">
                  <div className="w-8 h-8 flex justify-center items-center">
                    {playerState == states.playing && (
                      <MdPause className="w-6 h-6"></MdPause>
                    )}
                    {playerState == states.paused && (
                      <MdPlayArrow className="w-6 h-6"></MdPlayArrow>
                    )}
                    {states.notgood.includes(playerState) && (
                      <FaSpinner className="w-6 h-6 rotate"></FaSpinner>
                    )}
                  </div>
                </ButtonRadial>
              </div>
              <div
                onClick={() => {
                  playNext();
                }}
              >
                <ButtonRadial color="secondary">
                  <BsFillSkipEndFill className="w-5 h-5"></BsFillSkipEndFill>
                </ButtonRadial>
              </div>
            </div>
            <div>
              <input
                type="range"
                className="w-96 slider"
                value={progress}
                max={player?.getDuration() || 10000}
                onChange={(e) => {
                  let v = parseInt(e.target.value);
                  player?.seekTo(v);
                  setProgress(v);
                }}
              ></input>
            </div>
          </div>
          <div className="w-1/2">a</div>
        </div>
      )}
    </>
  );
}

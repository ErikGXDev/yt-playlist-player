import { useState } from "react";
import { toHHMMSS } from "./util/time";
import { MdAudiotrack, MdPause, MdPlayArrow } from "react-icons/md";

interface SongProps {
  title: string;
  playing: boolean;
  author: string;
  duration: number;
  index: number;
}

export default function SongItem({
  title,
  playing,
  author,
  duration,
  index,
}: SongProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="h-16 w-full flex justify-between items-center p-2 hover:bg-root-900/30 rounded-md select-none"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <div className="flex justify-start items-center min-w-0">
        <div
          className={
            "min-w-fit px-2 text-md flex" +
            " " +
            (playing
              ? hovering
                ? "text-front"
                : "text-red animate-note"
              : hovering
              ? "text-front"
              : "text-root-600")
          }
        >
          <div className="w-6">
            {hovering ? (
              <>{playing ? <MdPause /> : <MdPlayArrow />}</>
            ) : (
              <>{playing ? <MdAudiotrack /> : index}</>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <p
            className={
              "max-h-fit truncate" + " " + (playing ? "text-red" : "text-front")
            }
          >
            {title}
          </p>
          <p className="text-root-400 text-sm">{author}</p>
        </div>
      </div>

      <div className="w-20 text-right px-2">{toHHMMSS(duration)}</div>
    </div>
  );
}

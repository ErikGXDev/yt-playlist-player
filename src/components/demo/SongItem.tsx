import { useState } from "react";
import { toHHMMSS } from "../util/time";
import { MdAudiotrack, MdPause, MdPlayArrow } from "react-icons/md";

export default function SongItem({
  title,
  playing,
  author,
  duration,
  index,
}: any) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="h-16 w-full transition-all duration-75 p-2 px-4 rounded-md hover:bg-dimmest/50"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex justify-start items-center gap-8">
          <div
            className={
              "w-6 text-md " +
              (playing
                ? hovering
                  ? "text-white"
                  : "text-negative animate-note"
                : hovering
                ? "text-white"
                : "text-dim")
            }
          >
            {hovering ? (
              <>{playing ? <MdPause /> : <MdPlayArrow />}</>
            ) : (
              <>{playing ? <MdAudiotrack /> : index}</>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <p
              className={
                "font-semibold " + (playing ? "text-negative" : "text-white")
              }
            >
              {title}
            </p>
            <p className="text-dim">{author}</p>
          </div>
        </div>

        <div>{toHHMMSS(duration)}</div>
      </div>
    </div>
  );
}

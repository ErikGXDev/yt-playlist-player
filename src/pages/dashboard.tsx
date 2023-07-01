import Controls from "@/components/Controls";
import PlaylistDetails from "@/components/PlaylistDetails";
import { PlaylistItemType, PlaylistType } from "@/components/util/youtubeTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsList, BsMenuButton } from "react-icons/bs";
import PlaylistList from "@/components/PlaylistList";

export default function Page() {
  const [active, setActive] = useState<PlaylistType>();

  const [play, setPlay] = useState<PlaylistItemType>();
  const [playPlaylist, setPlayPlaylist] = useState<PlaylistType>();

  async function loadPlaylistView(id: string) {
    const fetched = await fetch("/api/playlistinfo", {
      method: "POST",
      body: JSON.stringify({ input: id }),
    });
    const data = await fetched.json();

    setActive(data);
  }

  return (
    <div className="flex flex-col w-screen h-screen max-h-screen bg-root-900">
      <div className="flex flex-col md:flex-row w-screen h-full">
        <PlaylistList loadPlaylistView={loadPlaylistView}></PlaylistList>
        <div className="w-full overflow-y-scroll bg-root-950/60 h-full md:h-auto mb-24">
          {active && (
            <div className="mb-6">
              <PlaylistDetails
                key={Date.now()}
                active={active}
                setPlay={setPlay}
                setPlayPlaylist={setPlayPlaylist}
                play={play}
              ></PlaylistDetails>
            </div>
          )}
        </div>
      </div>

      <div className="h-24 bg-root-950/80 border-t border-t-root-800 fixed bottom-0 w-screen">
        <>
          {play && (
            <Controls
              play={play}
              active={playPlaylist}
              setPlay={setPlay}
              key={Date.now()}
            ></Controls>
          )}
        </>
      </div>
    </div>
  );
}

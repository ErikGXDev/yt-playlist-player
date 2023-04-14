import Controls from "@/components/Controls";
import PlaylistDetails from "@/components/PlaylistDetails";
import { PlaylistItemType, PlaylistType } from "@/components/util/youtubeTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data } = useSession();

  const { push } = useRouter();

  const [playlists, setPlaylists] = useState<any[]>([]);
  const [active, setActive] = useState<PlaylistType>();

  const [play, setPlay] = useState<PlaylistItemType>();

  useEffect(() => {
    fetch("/api/userplaylists")
      .then((res) => res.json())
      .then((data) => {
        if (data.error == "Invalid Credentials") {
          push("/");
        }
        setPlaylists(data.playlists);
      });
  }, []);

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
        <div className="bg-root-950 w-full md:w-72 md:min-w-[18rem] md:mb-24 mb-0">
          <div className="p-4 flex flex-col gap-2">
            {playlists?.map((playlist, index) => (
              <button
                className="text-root-200 hover:text-front text-start"
                data-index={index}
                data-id={playlist.id}
                key={playlist.id}
                onClick={() => {
                  loadPlaylistView(playlist.id);
                }}
              >
                {playlist.snippet.title}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full overflow-y-scroll bg-root-950/60 h-full md:h-auto mb-24">
          {active && (
            <div className="mb-6">
              <PlaylistDetails
                key={Date.now()}
                active={active}
                setPlay={setPlay}
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
              active={active}
              play={play}
              setPlay={setPlay}
              key={Date.now()}
            ></Controls>
          )}
        </>
      </div>
    </div>
  );
}

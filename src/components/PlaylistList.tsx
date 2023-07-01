import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";

export default function PlaylistList({
  loadPlaylistView,
}: {
  loadPlaylistView: any;
}) {
  const [hidePlaylists, setHidePlaylists] = useState(false);

  const [playlists, setPlaylists] = useState<any[]>([]);
  const { push } = useRouter();
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

  return (
    <>
      <div
        className="absolute right-0 top-0 m-2 cursor-pointer block md:hidden rounded-md hover:bg-root-900/70"
        onClick={() => {
          setHidePlaylists(!hidePlaylists);
        }}
      >
        <BsList size={32}></BsList>
      </div>
      <div
        style={{ display: hidePlaylists ? "none" : "block" }}
        className={"bg-root-950 w-full md:w-72 md:min-w-[18rem] md:mb-24 mb-0"}
      >
        <div className="p-4 flex flex-col gap-2">
          {playlists.length > 0 ? (
            playlists?.map((playlist, index) => (
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
            ))
          ) : (
            <div className="p-2">
              <p className="text-md md:text-xl">Loading Playlists...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

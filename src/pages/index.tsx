import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import ButtonLogin from "@/components/ButtonLogin";
import ExplorerNavbar from "@/components/Navbar/ExplorerNavbar";
import SongItem from "@/components/SongItem";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ExplorerNavbar />
      <div className="flex items-center flex-col">
        <div className="font-bold text-3xl text-center w-full md:w-1/2 mb-8 px-4">
          <span className="text-negative">YouTube Playlists</span>&nbsp;
          <span>but in a</span>&nbsp;
          <span className="text-negative">Spotify</span>&nbsp;
          <span>styled environment</span>
        </div>
      </div>
      <div className="font-bold text-center w-7/8 mb-8 px-4">
        Create YouTube playlists of songs and play them in a Spotify-like UI.
      </div>

      <div className="max-w-md flex flex-col justify-center mx-auto px-4 mb-8">
        <SongItem
          title="After Dark"
          playing={false}
          author="Mr.Kitty"
          duration={257}
          index={1}
        ></SongItem>
        <SongItem
          title="Dioma"
          playing={true}
          author="Jnathyn"
          duration={232}
          index={2}
        ></SongItem>
        <SongItem
          title="Override"
          playing={false}
          author="KLSV"
          duration={257}
          index={3}
        ></SongItem>
        <SongItem
          title="MARiO KART"
          playing={false}
          author="TJ_beastboy"
          duration={236}
          index={4}
        ></SongItem>
      </div>
      <div className="flex flex-col items-center px-4">
        <div className="text-center">
          <ButtonLogin color="primary">Sign in with Google</ButtonLogin>
          <p className="m-2 text-root-700">It's free and easy to use!</p>

          <p>
            By signing in you agree to the{" "}
            <Link href="/terms" className="underline">
              terms of service
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

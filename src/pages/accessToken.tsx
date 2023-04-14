import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useSession } from "next-auth/react";

import ButtonLogin from "@/components/ButtonLogin";
import ButtonLogout from "@/components/ButtonLogout";
import Button from "@/components/Button";

export default function SignIn({}) {
  const { data } = useSession();

  //@ts-ignore
  const accessToken = data?.accessToken || "No Token!";
  return (
    <>
      <ButtonLogin color="primary">Sign In</ButtonLogin>
      <ButtonLogout color="primary">Sign Out</ButtonLogout>
      <p>Your Access Token: {accessToken}</p>
      <div
        onClick={() => {
          fetch("/api/userplaylists");
        }}
      >
        <Button color="primary">Fetch User Playlists</Button>
      </div>
    </>
  );
}

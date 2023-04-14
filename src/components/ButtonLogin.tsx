import Link from "next/link";
import Button from "./Button";
import { ButtonColors } from "./Button";
import { Children } from "./util/interfaces";
import { signIn } from "next-auth/react";

export default function ButtonLogin({
  color,
  children,
}: ButtonColors & Children) {
  return (
    <>
      <div
        onClick={() => {
          signIn("google", {
            callbackUrl:
              window.location.protocol +
              "//" +
              window.location.host +
              "/dashboard",
          });
        }}
      >
        <Button color={color}>{children}</Button>
      </div>
    </>
  );
}

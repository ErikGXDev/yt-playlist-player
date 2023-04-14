import Link from "next/link";
import Button from "./Button";
import { ButtonColors } from "./Button";
import { Children } from "./util/interfaces";
import { signOut } from "next-auth/react";

export default function ButtonLogout({
  color,
  children,
}: ButtonColors & Children) {
  return (
    <>
      <div
        onClick={() => {
          signOut();
        }}
      >
        <Button color={color}>{children}</Button>
      </div>
    </>
  );
}

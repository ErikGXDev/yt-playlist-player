import Link from "next/link";
import Button from "./Button";
import { ButtonColors } from "./Button";
import { Children } from "./util/interfaces";

interface Href {
  href: string;
}

export default function ButtonLink({
  href,
  color,
  children,
}: ButtonColors & Children & Href) {
  return (
    <>
      <Link href={href}>
        <Button color={color}>{children}</Button>
      </Link>
    </>
  );
}

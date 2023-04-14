import Link from "next/link";
import Button from "./Button";
import { ButtonColors } from "./Button";
import { Children } from "./util/interfaces";

export default function ButtonRadial({
  color,
  children,
}: ButtonColors & Children) {
  return (
    <>
      <div className="aspect-square rounded-full overflow-hidden">
        <Button color={color}>{children}</Button>
      </div>
    </>
  );
}

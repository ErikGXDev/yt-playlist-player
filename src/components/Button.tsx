import { Children } from "./util/interfaces";

export interface ButtonColors {
  color: "primary" | "secondary" | "light";
}

export default function Button({
  color = "primary",
  children,
}: ButtonColors & Children) {
  let colorClass = "";
  switch (color) {
    case "primary":
      colorClass =
        "bg-negative text-dark hover:bg-negative-dim active:bg-negative-dimmer";
      break;
    case "secondary":
      colorClass = "bg-dimmest text-front hover:bg-dimmer active:bg-dim";
  }
  return (
    <button className={"p-2 font-semibold rounded-md " + colorClass}>
      {children}
    </button>
  );
}

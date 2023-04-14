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
      colorClass = "bg-red-600 text-dark hover:bg-red-700 active:bg-red-800";
      break;
    case "secondary":
      colorClass =
        "bg-root-900 text-front hover:bg-root-800 active:bg-root-700";
      break;
    case "light":
      colorClass = "bg-white text-root-950 hover:bg-root-50 active:bg-root-100";
  }
  return (
    <button className={"p-2 font-semibold rounded-md " + colorClass}>
      {children}
    </button>
  );
}

import Button from "@/components/Button";
import { FaSpinner } from "react-icons/fa";

export default function Rui() {
  return (
    <div className="p-4">
      <h1 className="text-xl m-2">Buttons</h1>
      <div className="flex gap-2">
        <Button color="primary">Primary Button</Button>
        <Button color="light">Light Button</Button>
        <Button color="secondary">Secondary Button Button</Button>
      </div>
      <h1 className="text-xl m-2">Spinner</h1>
      <FaSpinner className="rotate"></FaSpinner>
    </div>
  );
}

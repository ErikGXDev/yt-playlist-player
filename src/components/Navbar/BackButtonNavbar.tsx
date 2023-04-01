import { BsArrowLeft as Arrow } from "react-icons/bs";
import { useRouter } from "next/router";

export default function BackButtonNavbar() {
  const router = useRouter();

  return (
    <div className="h-14 w-screen p-2 flex items-center mb-8">
      <div className="w-full flex justify-start px-2 md:px-0 md:justify-center gap-2">
        <Arrow className="w-6 h-6" onClick={() => router.back()}></Arrow>
      </div>
    </div>
  );
}

import Button from "../Button";
import NavbarLink from "./NavbarLink";

export default function ExplorerNavbar() {
  return (
    <div className="h-14 border-b border-b-dimmer w-screen p-2 flex items-center mb-8">
      <div className="w-full flex px-8 md:px-0 justify-between md:justify-center gap-4">
        <NavbarLink href="/home">Home</NavbarLink>
        <NavbarLink href="/explore">Explore</NavbarLink>
        <NavbarLink href="/about">About</NavbarLink>
      </div>
    </div>
  );
}

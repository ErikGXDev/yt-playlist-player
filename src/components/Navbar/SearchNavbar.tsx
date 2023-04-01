import Button from "../Button";

export default function SearchNavbar() {
  return (
    <div className="h-14 border-b border-b-dimmer w-screen p-2 flex items-center mb-8">
      <div className="w-full flex justify-center gap-2">
        <input className="py-1 px-2 bg-dark border border-dimmer outline-none focus:border-dim rounded-md"></input>
        <Button color="secondary">Search</Button>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NavbarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="text-front hover:text-negative active:text-negative-dim">
        <Link href={href}>{children}</Link>
      </div>
    </>
  );
}

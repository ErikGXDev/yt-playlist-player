export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-inter bg-dark text-front h-screen">{children}</div>
  );
}

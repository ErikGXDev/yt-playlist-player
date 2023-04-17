export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-inter bg-root-950 text-front min-h-screen">
      {children}
    </div>
  );
}

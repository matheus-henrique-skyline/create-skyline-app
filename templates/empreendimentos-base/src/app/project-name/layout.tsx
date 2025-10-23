"use client";
export default function Project({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-screen bg-background min-h-[800px] min-w-[1200px] project-name">
      {children}
    </div>
  );
}

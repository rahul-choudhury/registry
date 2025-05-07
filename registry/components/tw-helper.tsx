export function TailwindHelper() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="fixed bottom-16 left-4 z-50">
      <div className="rounded-full border border-gray-700 bg-gray-800 px-3 py-1 font-mono text-sm text-white shadow-lg">
        <span className="sm:hidden">xs</span>
        <span className="hidden sm:inline md:hidden">sm</span>
        <span className="hidden md:inline lg:hidden">md</span>
        <span className="hidden lg:inline xl:hidden">lg</span>
        <span className="hidden xl:inline 2xl:hidden">xl</span>
        <span className="hidden 2xl:inline">2xl</span>
      </div>
    </div>
  );
}

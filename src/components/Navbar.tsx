import Link from "next/link";

function Navbar() {
  return (
    <div>
      <div className="h-10 max-h-10 px-4 bg-red-400 border-b flex items-center justify-between">
        <div className="px-[8px]">

          <Link href="/" className="inline-block font-extrabold">
            Tonyway
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href="/journal" className="inline-block">
            Journal
          </Link>
          <Link href="/notes" className="inline-block">
            Notes
          </Link>
          <Link href="/todos" className="inline-block">
            Todos
          </Link>
        </div>
      </div>
    </div>
  );
}

export { Navbar };

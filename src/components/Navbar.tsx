import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface NavbarProps {
  type?: string;          // The '?' means it is optional because you have a default value
  children?: React.ReactNode
}
interface buttons {
  label: string;
  onClick: () => void;
}

function Navbar({ type, children }: NavbarProps) {
  if (type == "write") {
    return (
      <div>
        <div className="h-10 max-h-10 px-4 border-b flex items-center justify-between">
          <div className="px-[8px]">
            <Link href="/dashboard" className="inline-block font-extrabold">
              Tonyway
            </Link>
          </div>
          <div className="flex gap-2">
            {children}
          </div>
        </div>
      </div>
    )
  }
  else return (
    <div>
      <div className="h-10 max-h-10 px-4  border-b flex items-center justify-between">
        <div className="px-[8px]">

          <Link href="/dashboard" className="inline-block font-extrabold">
            Tonyway
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href="/journal" className="inline-block">
            Journal
          </Link>
          <Link href="/notes/write" className="inline-block">
            Write
          </Link>
          <Link href="/todos" className="inline-block">
            Todos
          </Link>
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export { Navbar };

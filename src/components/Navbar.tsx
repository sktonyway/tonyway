import Link from "next/link";

interface NavbarProps {
  type?: string;          // The '?' means it is optional because you have a default value
  buttons?: buttons[] // Required function
}
interface buttons {
  label: string;
  onClick: () => void;
}

function Navbar({ type, buttons }: NavbarProps) {
  if (type == "write") {
    return (
      <div>
        <div className="h-10 max-h-10 px-4 border-b flex items-center justify-between">
          <div className="px-[8px]">
            <Link href="/" className="inline-block font-extrabold">
              Tonyway
            </Link>
          </div>
          <div className="flex gap-2">
            {buttons && buttons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.onClick}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }
  else return (
    <div>
      <div className="h-10 max-h-10 px-4  border-b flex items-center justify-between">
        <div className="px-[8px]">

          <Link href="/" className="inline-block font-extrabold">
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
        </div>
      </div>
    </div>
  );
}

export { Navbar };

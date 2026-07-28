import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-white px-6">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center rounded-full border border-neutral-200 px-4 py-1.5 text-sm text-neutral-600">
          Built for deep work
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
          Work without
          <br />
          the noise.
        </h1>

        {/* Body */}
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-600">
          Productivity isn't about doing more. It's about making space for what
          matters.
        </p>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-neutral-500">
          A calm place to capture ideas, organise your work, and move forward—
          one task at a time. No clutter, no distractions, no unnecessary
          features. Just the tools you need, when you need them.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/sign-in"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Start for free
          </Link>

          <Link
            href="/about"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-400 hover:bg-neutral-50"
          >
            Learn more
          </Link>
        </div>

        {/* Small note */}
        <p className="mt-8 text-xs text-neutral-400">
          No credit card required.
        </p>
      </div>
    </section>
  );
}
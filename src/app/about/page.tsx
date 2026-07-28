export default function AboutPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="max-w-3xl">
        <span className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          About
        </span>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-neutral-900">
          A simpler way to stay productive.
        </h1>

        <div className="mt-8 space-y-6 text-lg leading-8 text-neutral-600">
          <p>
            We believe productivity should feel calm, not overwhelming.
            Too many apps add complexity when what people really need is clarity.
          </p>

          <p>
            Our goal is to create a workspace where capturing ideas, organising
            tasks, and focusing on meaningful work feels effortless. Every
            feature is designed with intention—nothing more, nothing less.
          </p>

          <p>
            Whether you're planning your day, managing projects, or simply
            keeping track of what matters, we're here to help you spend less
            time managing work and more time doing it.
          </p>
        </div>
      </div>
    </main>
  );
}
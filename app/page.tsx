import { BLOCKS } from "@/markdown";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        {BLOCKS.map((Block, idx) => (
          <section className="border rounded-lg p-6" key={idx}>
            <Block />
          </section>
        ))}
      </main>
    </div>
  );
}

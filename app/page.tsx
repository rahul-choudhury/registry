// "use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BLOCKS } from "@/markdown";

export default function Home() {
  const components = BLOCKS.filter(
    (block) =>
      block.type === "registry:component" || block.type === "registry:block",
  ).sort((a, b) => a.name.localeCompare(b.name));
  const hooks = BLOCKS.filter((block) => block.type === "registry:hook").sort(
    (a, b) => a.name.localeCompare(b.name),
  );

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <div className="flex justify-between">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
          <p className="text-muted-foreground">
            A custom registry for distributing code using shadcn.
          </p>
        </header>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://github.com/rahul-choudhury/registry"
              target="_blank"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="dark:fill-white"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="sr-only">Github Repository</span>
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
      <Tabs defaultValue="components" className="flex-1">
        <TabsList>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="hooks">Hooks</TabsTrigger>
        </TabsList>
        <TabsContent value="components" className="flex flex-col gap-8">
          {components.map((block, idx) => (
            <section className="border rounded-lg p-6" key={idx}>
              <block.Component />
            </section>
          ))}
        </TabsContent>
        <TabsContent value="hooks" className="flex flex-col gap-8">
          {hooks.map((block, idx) => (
            <section className="border rounded-lg p-6" key={idx}>
              <block.Component />
            </section>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

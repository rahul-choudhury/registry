import { CodeBlockWithCopy } from "./code-block-with-copy";
import { Badge } from "@/components/ui/badge";

type ItemType = "Component" | "Hook";

export interface RegistryItemType {
  id: string;
  title: string;
  type: ItemType | ItemType[];
  description: string;
  usageExample?: {
    title?: string;
    generalNote?: string;
    code: string;
    codeNote?: string;
  };
  previewComponent?: React.ReactNode;
  previewTitle?: string;
}

export function RegistryItemDisplay({ item }: { item: RegistryItemType }) {
  return (
    <section className="border rounded-lg p-6 space-y-4">
      {/* Title and Description */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold">{item.title}</h2>
          {Array.isArray(item.type) ? (
            item.type.map((type) => (
              <Badge key={type} variant="outline">
                {type}
              </Badge>
            ))
          ) : (
            <Badge variant="outline">{item.type}</Badge>
          )}
        </div>
        <p className="text-muted-foreground">{item.description}</p>
      </div>

      {/* Installation */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Installation</h3>
        <CodeBlockWithCopy
          code={`npx shadcn@latest add https://registry.rchoudhury.dev/r/${item.id}.json`}
        />
      </div>

      {/* Usage Example */}
      {item.usageExample && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {item.usageExample.title || "Usage"}
          </h3>
          {item.usageExample.generalNote && (
            <p className="text-sm text-muted-foreground">
              {item.usageExample.generalNote}
            </p>
          )}
          <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            <pre className="text-sm overflow-x-auto">
              <code>{item.usageExample.code}</code>
            </pre>
            {item.usageExample.codeNote && (
              <span className="text-xs text-muted-foreground block mt-2">
                {item.usageExample.codeNote}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Preview */}
      {item.previewComponent && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {item.previewTitle || "Preview"}
          </h3>
          <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-900">
            {item.previewComponent}
          </div>
        </div>
      )}
    </section>
  );
}

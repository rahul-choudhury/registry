import {
  RegistryItemDisplay,
  RegistryItemType,
} from "@/components/registry-item-display";

const REGISTRY_ITEMS: RegistryItemType[] = [
  {
    id: "meta-pixel",
    type: "Component",
    title: "MetaPixel",
    description:
      "A component that encapsulates meta pixel logic for Facebook tracking.",
    usageExample: {
      generalNote:
        "Non-visual component. Add to your layout or pages where tracking is needed.",
      code: `// In your layout.js or page component
import { MetaPixel } from "@/components/meta-pixel";

export default function Layout({ children }) {
  return (
    <>
      <MetaPixel mpId={your-tracking-id} />
      {children}
    </>
  );
}`,
    },
  },
  {
    id: "tw-helper",
    type: "Component",
    title: "TailwindHelper",
    description:
      "A utility component that displays the current breakpoint. Only visible in development.",
    usageExample: {
      code: `// In your layout.js or root component
import { TailwindHelper } from "@/components/tw-helper";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <TailwindHelper />
    </>
  );
}`,
    },
  },
  {
    id: "use-carousel-api",
    type: "Hook",
    title: "useCarouselApi",
    description:
      "A React hook for controlling carousel components with an improved API.",
    usageExample: {
      code: `import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCarouselApi } from "@/hooks/use-carousel-api";

export function MyCarousel() {
  const { api, setApi, current, count } = useCarouselApi();

  return (
    <Carousel setApi={setApi} className="w-full max-w-xs">
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}`,
    },
  },
  {
    id: "multi-step-form",
    type: ["Component", "Hook"],
    title: "Multi Step Form",
    description: "Components and hook for managing multi step forms.",
    usageExample: {
      code: ` // page.tsx
import { MultiStepFormProvider, MultiStepFormRenderer } from "@/components/multi-step-form";

export default function Page() {
  return (
    <MultiStepFormProvider>
      <MultiStepFormRenderer>
        <Step1 />
        <Step2 />
        ...
      </MultiStepFormRenderer>
    </MultiStepFormProvider>
  );
}

// step1.tsx
import { useMultiStepForm } from "@/components/multi-step-form";

export function Step1() {
  const { nextStep, prevStep } = useMultiStepForm();

  return (
    <form>
      ...
      <button onClick={prevStep}>Previous</button>
      <button onClick={nextStep}>Next</button>
    </form>
  );
}
`,
    },
  },
];

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
        {REGISTRY_ITEMS.map((item) => (
          <RegistryItemDisplay key={item.id} item={item} />
        ))}
      </main>
    </div>
  );
}

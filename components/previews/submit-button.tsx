import { SubmitButton } from "@/registry/components/submit-button";

export function SubmitButtonPreview() {
  return (
    <div className="flex gap-6 justify-center bg-muted p-4">
      <fieldset className="group flex flex-col gap-1">
        <SubmitButton>Submit</SubmitButton>
        <p className="text-xs">Normal state</p>
      </fieldset>
      <fieldset disabled className="group flex flex-col gap-1">
        <SubmitButton>Submit</SubmitButton>
        <p className="text-xs">Loading state</p>
      </fieldset>
    </div>
  );
}

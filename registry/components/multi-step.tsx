"use client";

import * as React from "react";

type MultiStepContextType = {
  currStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
};

const MultiStepContext = React.createContext<MultiStepContextType | null>(null);

function clampStep(step: number, totalSteps: number) {
  if (!Number.isFinite(step) || totalSteps <= 0) {
    return 0;
  }

  return Math.min(Math.max(Math.trunc(step), 0), totalSteps - 1);
}

/**
 * Render a multi-step flow from its children and expose navigation state
 * through `useMultiStep`.
 *
 * @param children Step components rendered one at a time.
 */
export function MultiStep({ children }: { children: React.ReactNode }) {
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;
  const [currStep, setCurrStep] = React.useState(0);

  React.useEffect(() => {
    setCurrStep((prev) => clampStep(prev, totalSteps));
  }, [totalSteps]);

  const nextStep = () => {
    setCurrStep((prev) => clampStep(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrStep((prev) => clampStep(prev - 1, totalSteps));
  };

  const goToStep = (step: number) => {
    setCurrStep(clampStep(step, totalSteps));
  };

  const safeStep = clampStep(currStep, totalSteps);
  const isFirstStep = safeStep === 0;
  const isLastStep = totalSteps <= 1 || safeStep === totalSteps - 1;

  return (
    <MultiStepContext
      value={{
        currStep: safeStep,
        totalSteps,
        isFirstStep,
        isLastStep,
        nextStep,
        prevStep,
        goToStep,
      }}
    >
      {steps[safeStep] ?? null}
    </MultiStepContext>
  );
}

/**
 * Read the current multi-step state and navigation helpers.
 *
 * @returns The active step index, derived booleans, and navigation methods.
 */
export function useMultiStep() {
  const context = React.useContext(MultiStepContext);
  if (!context) {
    throw new Error("useMultiStep must be used within a MultiStep.");
  }
  return context;
}

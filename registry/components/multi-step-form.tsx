"use client";

import * as React from "react";

type MultiStepFormContextType = {
  currStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  registerSteps: (count: number) => void;
};

const MultiStepFormContext =
  React.createContext<MultiStepFormContextType | null>(null);

function clampStep(step: number, totalSteps: number) {
  if (!Number.isFinite(step) || totalSteps <= 0) {
    return 0;
  }

  return Math.min(Math.max(Math.trunc(step), 0), totalSteps - 1);
}

export function MultiStepFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currStep, setCurrStep] = React.useState(0);
  const [totalSteps, setTotalSteps] = React.useState(0);

  const nextStep = React.useCallback(() => {
    setCurrStep((prev) => clampStep(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = React.useCallback(() => {
    setCurrStep((prev) => clampStep(prev - 1, totalSteps));
  }, [totalSteps]);

  const goToStep = React.useCallback(
    (step: number) => {
      setCurrStep(clampStep(step, totalSteps));
    },
    [totalSteps],
  );

  const registerSteps = React.useCallback((count: number) => {
    setTotalSteps(count);
    setCurrStep((prev) => clampStep(prev, count));
  }, []);

  return (
    <MultiStepFormContext
      value={{ currStep, nextStep, prevStep, goToStep, registerSteps }}
    >
      {children}
    </MultiStepFormContext>
  );
}

export function useMultiStepForm() {
  const context = React.useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormProvider.",
    );
  }
  return context;
}

export function MultiStepFormRenderer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currStep, registerSteps } = useMultiStepForm();
  const steps = React.Children.toArray(children);
  const safeStep = clampStep(currStep, steps.length);

  React.useEffect(() => {
    registerSteps(steps.length);
  }, [registerSteps, steps.length]);

  return steps[safeStep] ?? null;
}

"use client";

import * as React from "react";

type MultiStepFormContextType = {
  currStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
};

const MultiStepFormContext =
  React.createContext<MultiStepFormContextType | null>(null);

export function MultiStepFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [step, setStep] = React.useState(0);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(0, prev - 1));
  const goToStep = (step: number) => setStep(step);

  return (
    <MultiStepFormContext
      value={{ currStep: step, nextStep, prevStep, goToStep }}
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
  const { currStep } = useMultiStepForm();
  const steps = React.Children.toArray(children);
  return steps[currStep];
}

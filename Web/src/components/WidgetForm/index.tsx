import { useState } from "react";
import { CloseButton } from "../CloseButton";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
  },
  IDEA: {
    title: "Ideia",
  },
  OTHER: {
    title: "Outro",
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  return (
    <div
      className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col 
      items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto"
    >
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com amor por{" "}
        <a
          className="underline underline-offset-1"
          href="http://github.com/brunokelly"
        >
          Bruno Kelly
        </a>
      </footer>
    </div>
  );
}

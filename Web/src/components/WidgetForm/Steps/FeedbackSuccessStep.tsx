import { Check } from "phosphor-react";
import { CloseButton } from "../../CloseButton";

interface FeedbackSuccessStep {
  onFeedbackRestartRequested: () => void;
}

export function FeedbackSuccessStep({
  onFeedbackRestartRequested,
}: FeedbackSuccessStep) {
  return (
    <>
      <header>
        <CloseButton />
      </header>

      <div className="flex flex-col items-center py-10 w-[304px]">
        <Check />
        <span className="text-xl mt-2">Agradecemos seus feedback</span>

        <button
          type="button"
          onClick={onFeedbackRestartRequested}
          className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparente text-sm leading-6 transition-colors focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none "
        >
          Quero enviar outro
        </button>
      </div>
    </>
  );
}

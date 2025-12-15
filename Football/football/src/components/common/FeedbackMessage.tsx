// START: FeedbackMessage – shows success or error feedback
type Props = {
  type: "success" | "error";
  message: string;
};

const FeedbackMessage = ({ type, message }: Props) => {
  if (!message) return null;

  const base = "mt-4 rounded-lg border px-4 py-2 text-sm";
  const success = "border-emerald-400/40 bg-emerald-500/10 text-emerald-300";
  const error = "border-rose-400/40 bg-rose-500/10 text-rose-300";

  return (
    <div
      className={`${base} ${type === "success" ? success : error}`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default FeedbackMessage;
// SLUTT: FeedbackMessage

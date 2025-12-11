// START: FeedbackMessage – viser grønn eller rød tilbakemelding etter handling

const FeedbackMessage = ({
  type,
  message,
}: {
  type: "success" | "error";
  message: string;
}) => {
  if (!message) return null;

  // Felles styling
  const base =
    "mt-3 rounded-lg border px-4 py-2 text-sm";

  // Suksess – match med eksempelet du viste
  const success =
    "bg-emerald-50 border-emerald-300 text-emerald-700";

  // Feil – match med eksempelet du viste
  const error =
    "bg-rose-50 border-rose-300 text-rose-700";

  return (
    <div className={`${base} ${type === "success" ? success : error}`}>
      {message}
    </div>
  );
};

export default FeedbackMessage;

// SLUTT: FeedbackMessage

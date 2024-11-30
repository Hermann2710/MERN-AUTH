function FormButton({
  loading,
  text,
  type = "button",
}: {
  loading?: boolean;
  text: string;
  type: "submit" | "button" | "reset";
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full bg-red-500 text-white py-3 font-bold hover:bg-red-600 transition-all duration-500 ease-in-out mt-5 rounded-lg"
    >
      {text}
    </button>
  );
}

export default FormButton;

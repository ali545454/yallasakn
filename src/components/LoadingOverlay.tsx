// src/components/LoadingOverlay.tsx
import Loading from "@/components/Loading";
import { useLoading } from "@/context/LoadingContext";

const LoadingOverlay = () => {
  const { isLoading, message } = useLoading(); // ✅ hook جوه الكومبوننت

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-150 flex flex-col items-center justify-center bg-black/40 w-full h-full">
      <Loading />
      {message && <p className="mt-4 text-white text-lg">{message}</p>}
    </div>
  );
};

export default LoadingOverlay;

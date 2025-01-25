import { useLoaderStore } from "@/stores";
import { Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

export default function LoaderLayout() {
  const { isLoading } = useLoaderStore();

  if (!isLoading) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="animate-spin">
        <Loader2 size={64} color="white" />
      </div>
    </div>,
    document.body
  );
}

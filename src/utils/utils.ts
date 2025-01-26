import { AxiosError } from "axios";
import { ExternalToast, toast } from "sonner";

export async function handleSuccess(message: string, options?: ExternalToast) {
  toast.success(message, {
    duration: 5000,
    ...options,
  });
}

export async function handleError(error: unknown, options?: ExternalToast) {
  let errorMessage =
    error instanceof Error ? error.message : "An unexpected error occurred";
  if (error instanceof AxiosError) {
    errorMessage =
      typeof error.response?.data.message === "string"
        ? error.response?.data.message
        : "An unexpected error occurred";
  }
  toast.error(errorMessage, {
    duration: 5000,
    ...options,
  });
}

const signaturesBase64: { [key: string]: string } = {
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg",
};

export function detectMimeType(b64: string) {
  for (const s in signaturesBase64) {
    if (b64.indexOf(s) === 0) {
      return signaturesBase64[s];
    }
  }
  return "";
}

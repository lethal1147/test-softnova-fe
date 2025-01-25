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
  console.log(error);
  toast.error(errorMessage, {
    duration: 5000,
    ...options,
  });
}

import { useAuthStore } from "./auth.store";

export function connectStore(): void {
  useAuthStore();
}

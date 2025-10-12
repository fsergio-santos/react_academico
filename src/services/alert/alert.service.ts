import type { STATUS_TYPES } from "../constants/system.constants";

// alert.service.ts (imperativo)
export type AlertVariant = (typeof STATUS_TYPES)[keyof typeof STATUS_TYPES];

type Listener = (p: {
  message: string;
  variant: AlertVariant;
  duration?: number;
}) => void;

const listeners = new Set<Listener>();

export const AlertBus = {
  subscribe(fn: Listener) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  emit(p: { message: string; variant: AlertVariant; duration?: number }) {
    listeners.forEach((l) => l(p));
  },
};

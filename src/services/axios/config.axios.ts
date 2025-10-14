import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { AlertBus } from "../alert/alert.service";
import { REST_CONFIG, STATUS_TYPES } from "../constants/system.constants";
import { handleAxiosError } from "../mensagens/error.sistema";
import type { MensagemServidor } from "../types/mensage.servidor";

declare module "axios" {
  export interface AxiosRequestConfig {
    silent?: boolean; // não notificar globalmente
    raw?: boolean; // opcional: não normalizar
  }
}

export const http = axios.create({
  baseURL: import.meta.env.SERVIDOR || REST_CONFIG.BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  withCredentials: false,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status ?? 0;
    const payload = (error.response?.data ?? {}) as Partial<
      MensagemServidor<unknown>
    >;
    const msg = payload.mensagem ?? handleAxiosError(status);
    const path = payload.path ?? error.config?.url ?? "desconhecido";
    //const metodo =
    //  payload.metodo ?? error.config?.method?.toUpperCase() ?? "GET";
    const dedupKey = `${status}|${path}`;
    const now = Date.now();

    if (error.config?.silent && !dedupStore.hasRecent(dedupKey, 3000)) {
      dedupStore.mark(dedupKey, now);
      AlertBus.emit({
        message: msg,
        variant: STATUS_TYPES.DANGER,
        duration: 5000,
      });
    }

    const normalizado: MensagemServidor<unknown> = {
      status,
      mensagem: msg,
      dados: payload.dados ?? null,
      path: payload.path ?? error.config?.url,
      //metodo: payload.metodo ?? error.config?.method?.toUpperCase(),
      data: payload.data ?? new Date().toISOString(),
    };

    return Promise.reject(normalizado);
  }
);

const dedupStore = (() => {
  const m = new Map<string, number>();
  return {
    hasRecent: (key: string, ttlMs: number) => {
      const t = m.get(key);
      return t !== undefined && Date.now() - t < ttlMs;
    },
    mark: (key: string, ts: number) => m.set(key, ts),
    cleanup: (now: number) => {
      for (const [k, ts] of m) if (now - ts > 10000) m.delete(k);
    },
  };
})();

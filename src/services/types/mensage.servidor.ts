export type MensagemServidor<T> = {
  status: number;
  mensagem?: string;
  dados: T | null;
  path?: string;
  data?: string;
  metodo?: string;
};

import axios, { AxiosError } from 'axios';
import { MESSAGES } from './mensagens';

interface ApiErrorResponse {
  mensagem?: string;
}

export const handleAxiosError = (error: unknown): string => {
  // Primeiro, garantimos que o erro é do tipo AxiosError
  if (!axios.isAxiosError(error)) {
    // Se não for, pode ser um erro de lógica no código, etc.
    return MESSAGES.DEFAULT;
  }

  // 1. Tenta obter a mensagem específica do backend
  const apiError = error.response?.data as ApiErrorResponse;
  if (apiError?.mensagem) {
    return apiError.mensagem;
  }

  // 2. Tenta obter a mensagem pelo código de erro específico do Axios
  if (error.code && error.code in MESSAGES) {
    // TypeScript precisa de uma asserção de tipo aqui
    return MESSAGES[error.code as keyof typeof MESSAGES];
  }

  // 3. Tenta obter a mensagem pelo status HTTP
  if (error.response?.status && error.response.status in MESSAGES) {
    // TypeScript precisa de uma asserção de tipo aqui
    return MESSAGES[error.response.status as keyof typeof MESSAGES];
  }

  // 4. Se nada funcionar, retorna a mensagem padrão
  return MESSAGES.DEFAULT;
};
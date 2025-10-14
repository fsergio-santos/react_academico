import axios, { AxiosError } from "axios";

interface ApiErrorResponse {
  mensagem?: string;
}

export const MESSAGES = {
  // Mensagens por Status HTTP
  200: "Requisição bem-sucedida!",
  201: "Recurso criado com sucesso!",
  204: "Nenhum conteúdo para retornar.",
  400: "Requisição inválida. Verifique os dados enviados.",
  401: "Você não tem autorização para acessar este recurso.",
  404: "O recurso solicitado não foi encontrado.",
  406: "O formato da requisição não é aceitável.",
  412: "A pré-condição para esta requisição falhou.",
  422: "Erro de validação nos campos enviados.",
  500: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",

  // Mensagens por Código de Erro do Axios
  ECONNABORTED: "A requisição demorou muito e foi cancelada (timeout).",
  ERR_NETWORK: "Erro de rede. Verifique sua conexão com a internet.",
  ERR_CANCEL: "A requisição foi cancelada pelo aplicativo.",
  ERR_CONNECTION_REFUSED: "Não foi possível conectar ao servidor.",

  // Mensagem Padrão/Fallback
  DEFAULT: "Ocorreu um erro inesperado.",
} as const;

export const handleAxiosError = (error: unknown): string => {
  // Se não for um erro Axios, trata como erro genérico do sistema
  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) {
      console.error("Erro do sistema:", error.message);
      return error.message || MESSAGES.DEFAULT;
    }
    console.error("Erro desconhecido:", error);
    return MESSAGES.DEFAULT;
  }

  const axiosError = error as AxiosError<ApiErrorResponse>;

  // Mensagem específica enviada pelo backend (ex: { mensagem: "Usuário não encontrado" })
  const apiError = axiosError.response?.data;
  if (apiError?.mensagem) {
    return apiError.mensagem;
  }

  // Código de erro Axios (como ERR_NETWORK, ECONNABORTED, etc.)
  if (axiosError.code && axiosError.code in MESSAGES) {
    return MESSAGES[axiosError.code as keyof typeof MESSAGES];
  }

  // Status HTTP (como 404, 500, etc.)
  const status = axiosError.response?.status;
  if (status && status in MESSAGES) {
    return MESSAGES[status as keyof typeof MESSAGES];
  }

  // Caso não caia em nenhum dos anteriores
  return MESSAGES.DEFAULT;
};

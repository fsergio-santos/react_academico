
export const MESSAGES = {
  // Mensagens por Status HTTP
  200: 'Requisição bem-sucedida!',
  201: 'Recurso criado com sucesso!',
  204: 'Nenhum conteúdo para retornar.',
  400: 'Requisição inválida. Verifique os dados enviados.',
  401: 'Você não tem autorização para acessar este recurso.',
  404: 'O recurso solicitado não foi encontrado.',
  406: 'O formato da requisição não é aceitável.',
  412: 'A pré-condição para esta requisição falhou.',
  422: 'Erro de validação nos campos enviados.',
  500: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',

  // Mensagens por Código de Erro do Axios
  ECONNABORTED: 'A requisição demorou muito e foi cancelada (timeout).',
  ERR_NETWORK: 'Erro de rede. Verifique sua conexão com a internet.',
  ERR_CANCEL: 'A requisição foi cancelada pelo aplicativo.',
  ERR_CONNECTION_REFUSED: 'Não foi possível conectar ao servidor.',

  // Mensagem Padrão/Fallback
  DEFAULT: 'Ocorreu um erro inesperado.',
};
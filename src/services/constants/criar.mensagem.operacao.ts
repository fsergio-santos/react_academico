export function criarMensagensOperacao(ENTITY_NAME: string) {
  //const ENTITY_NAME_PLURAL = pluralize(ENTITY_NAME);

  return {
    CRIAR: {
      ACAO: `Criar novo cadastro de ${ENTITY_NAME} no sistema`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi criado com sucesso`,
      ERRO: `Falha na criação do cadastro de ${ENTITY_NAME} no sistema`,
      EXISTE: `${ENTITY_NAME} já está cadastrado no sistema`,
      CANCELAR: `Cancelar a criação do cadastro de ${ENTITY_NAME} no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    ATUALIZAR: {
      ACAO: `Atualizar o cadastro de ${ENTITY_NAME} no sistema`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi atualizado com sucesso`,
      ERRO: `Falha na atualização do cadastro de ${ENTITY_NAME} no sistema`,
      NAO_LOCALIZADO: `O código informado do cadastro de ${ENTITY_NAME} não foi localizado no sistema`,
      CANCELAR: `Cancelar a atualização do cadastro de ${ENTITY_NAME} no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    POR_ID: {
      ACAO: `Mostrar o cadastro de ${ENTITY_NAME}  no sistema`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi localizado com sucesso no sistema`,
      ERRO: `O cadastro de ${ENTITY_NAME} não foi localizado no sistema`,
      NAO_LOCALIZADO: `O código informado do cadastro de ${ENTITY_NAME} não foi localizado no sistema`,
      CANCELAR: `Cancelar a consulta do cadastro de ${ENTITY_NAME} no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    EXCLUIR: {
      ACAO: `Excluir o cadastro de ${ENTITY_NAME} no sistema`,
      SUCESSO: `O cadastro de ${ENTITY_NAME} foi excluído com sucesso no sistema`,
      ERRO: `Falha na exclusão do cadastro de ${ENTITY_NAME} no sistema`,
      NAO_LOCALIZADO: `O código informado do cadastro de ${ENTITY_NAME} não foi localizado no sistema`,
      CANCELAR: `Cancelar a exclusão do cadastro de ${ENTITY_NAME} no sistema`,
      FIELDS: `Há campos inválidos no cadastro de ${ENTITY_NAME}`,
    },
    LISTAR: {
      ACAO: `Listagem dos cadastros de ${ENTITY_NAME}s existentes no sistema`,
      SUCESSO: `A consulta dos cadastros de ${ENTITY_NAME}s foi realizada com sucesso no sistema`,
      ERRO: `Falha na consulta dos cadastros de ${ENTITY_NAME}s no sistema`,
    },
  };
}

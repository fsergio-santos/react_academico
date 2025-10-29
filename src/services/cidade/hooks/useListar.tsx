import React, { useMemo, type ChangeEvent } from "react";
import { useAlert } from "../../../contexto/AlertContexto";
import { STATUS_TYPES, UI_CONFIG } from "../../constants/system.constants";
import { handleAxiosError } from "../../mensagens/error.sistema";
import { useApiCidade } from "../api/api.cidade";
import { CIDADE } from "../constants/cidade.constants";
import type { Cidade, SortConfig } from "../type/cidade";



//hook para tratar o acesso aos dados de cidade.
export const useListar = () => {
  // classificação da tabela pelas colunas existenstes no registro apresentado
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({
    key: CIDADE.FIELDS.NOME,
    direction: "asc",
  });
  //número da página atual que ser exibida na tabela
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  // quantidade de registros em cada página exibida na tabela
  const [recordsPerPage, setRecordsPerPage] = React.useState<number>(5);
  // input - cidade que será filtrada no array de cidades e retornando
  // todas as cidades coincidentes com termo pesquisado.
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  // useState = hook - gancho - função reagir as alterações na variável renderiza -
  const [models, setModels] = React.useState<Cidade[] | null>(null);
  // chama api de cidades para carregas os dados da cidade.
  const { getCidades } = useApiCidade();
  // hook de mensagens do sistema
  const { setLoading, showAlert } = useAlert();

  //rotina para buscar todas as cidades na pi
  const buscarTodasCidades = async (): Promise<Cidade[] | null> => {
    setLoading(true);
    try {
      const response = await getCidades();
      return response.data.dados;
    } catch (error: any) {
      const mensagem = handleAxiosError(error);
      showAlert(mensagem, STATUS_TYPES.DANGER);
    } finally {
      setLoading(false);
    }
    return null;
  };

  React.useEffect(() => {
    async function getCidades() {
      const cidades = await buscarTodasCidades();
      if (cidades) {
        setModels(cidades);
      }
    }
    getCidades();
  }, []);

  const filteredData: Cidade[] = useMemo(() => {
    return (models ?? []).filter((item: any) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [models, searchTerm]);

  const handleSort = (key: keyof Cidade) => {
    setSortConfig((currentConfig) => {
      const isSameKey = currentConfig.key === key;

      // Declara uma variável para o novo estado com o tipo explícito.
      // Isso ajuda o TypeScript a entender o que estamos retornando.
      let newConfig: SortConfig;

      if (!isSameKey) {
        // Se for uma nova coluna, sempre começa com 'asc'
        newConfig = { key, direction: "asc" };
      } else {
        // Se for a mesma coluna, alterna entre os 3 estados
        if (currentConfig.direction === "asc") {
          newConfig = { key, direction: "desc" }; // de asc para desc
        } else if (currentConfig.direction === "desc") {
          newConfig = { key, direction: null }; // de desc para null (sem ordenação)
        } else {
          // de null (sem ordenação) de volta para asc
          newConfig = { key, direction: "asc" };
        }
      }
      return newConfig;
    });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const key = sortConfig.key; // Chave a ser ordenada
    const direction = sortConfig.direction; // Direção da ordenação

    return [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = sortedData.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRecordsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const getSortIcon = (field: string) => {
    if (sortConfig.key === field) {
      return sortConfig.direction === "asc"
        ? UI_CONFIG.ARROW_UP
        : UI_CONFIG.ARROW_DOWN;
    }
    return "";
  };

  return {
    currentPage,
    recordsPerPage,
    searchTerm,
    filteredData,
    totalPages,
    currentRecords,
    handleSort,
    handlePageChange,
    handleRecordsPerPageChange,
    getSortIcon,
    setSearchTerm,

  };
};

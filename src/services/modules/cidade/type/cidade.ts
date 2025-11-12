export interface Cidade {
  idCidade: string;
  codCidade: string;
  nomeCidade: string;
}

export interface ErrosCidade {
  idCidade?: boolean;
  codCidade?: boolean;
  nomeCidade?: boolean;
  idCidadeMensagem?: string[];
  codCidadeMensagem?: string[];
  nomeCidadeMensagem?: string[];
}

export interface BuscarCidadePorIdProps {
  cidade: Cidade | null;
  errosCidade: ErrosCidade | null | undefined;
}

export type SortConfig = {
  key: keyof Cidade;
  direction: "asc" | "desc" | null;
};

export interface Usuario {
  idUsuario: string;
  codUsuario: string;
  nomeUsuario: string;
  email: string;
  senha: string;
  confirmSenha: string;
  tipo: string;
  idCidade: string;
  nomeCidade: string;
  idade: string;
  idAluno: string;
  codAluno: string;
  nomeAluno: string;
  idProfessor: string;
  codProfessor: string;
  nomeProfessor: string;
  foto?: string;
  contentType?: string;
  ativo?: string;
}

export interface ErrosUsuario {
  idUsuario?: boolean;
  codUsuario?: boolean;
  nomeUsuario?: boolean;
  email?: boolean;
  senha?: boolean;
  confirmSenha?: boolean;
  tipo?: boolean;
  idCidade?: boolean;
  nomeCidade?: boolean;
  idade?: boolean;
  idAluno?: boolean;
  codAluno?: boolean;
  nomeAluno?: boolean;
  idProfessor?: boolean;
  codProfessor?: boolean;
  nomeProfessor?: boolean;
  foto?: boolean;
  contentType?: boolean;
  ativo?: boolean;

  idUsuarioMensagem?: string[];
  codUsuarioMensagem?: string[];
  nomeUsuarioMensagem?: string[];
  emailMensagem?: string[];
  senhaMensagem?: string[];
  confirmSenhaMensagem?: string[];
  tipoMensagem?: string[];
  idCidadeMensagem?: string[];
  nomeCidadeMensagem?: string[];
  idadeMensagem?: string[];
  idAlunoMensagem?: string[];
  codAlunoMensagem?: string[];
  nomeAlunoMensagem?: string[];
  idProfessorMensagem?: string[];
  codProfessorMensagem?: string[];
  nomeProfessorMensagem?: string[];
  fotoMensagem?: string[];
  contentTypeMensagem?: string[];
  ativoMensagem?: string[];
}

export interface BuscarUsuarioPorIdProps {
  usuario: Usuario | null;
  errosUsuario: ErrosUsuario | null | undefined;
}

export type SortConfig = {
  key: keyof Usuario;
  direction: "asc" | "desc" | null;
};



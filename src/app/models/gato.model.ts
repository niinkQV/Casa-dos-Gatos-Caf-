export enum SexoGato {
  MACHO = 'MACHO',
  FEMEA = 'FEMEA'
}

export enum StatusGato {
  DISPONIVEL = 'DISPONIVEL',
  EM_ADOCAO = 'EM_ADOCAO',
  ADOTADO = 'ADOTADO',
  TRANSFERIDO = 'TRANSFERIDO'
}

export interface GatoRequest {
  nome: string;
  foto: string;
  cor: string;
  sexo: SexoGato;
  idade: number;
  peso: number;
  biografia: string;
  status?: StatusGato;
}

export interface Gato extends GatoRequest {
  id: number;
  status: StatusGato;
}
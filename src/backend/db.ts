import Dexie from 'dexie';

export interface Pessoa {
  id: number;
  nome: string;
  login: string;
  email: string;
  cpf: string;
  senha: string;
}

export interface Evento {
  id: number;
  nome: string;
  empresa: string;
  endereco: string;
  tipo_evento: string;
  qtd_participantes: number;
}

export interface ParticipanteEvento {
  id?: number;
  idPessoa: number;
  idEvento: number;
  tipoParticipacao: string;
  dataCadastro: Date;
  cadastradoPor: string;
  entrada?: Date;
  saida?: Date;
}

class MyDatabase extends Dexie {
  public pessoas: Dexie.Table<Pessoa, number>;
  public eventos: Dexie.Table<Evento, number>;
  public participantesEventos: Dexie.Table<ParticipanteEvento, number>;

  public constructor() {
    super('MyDatabase');
    this.version(1).stores({
      pessoas: '++id, login, senha, nome, cpf',
      eventos: '++id, nome, empresa, endereco, tipo_evento, qtd_participantes',
      participantesEventos: '++id, idPessoa, idEvento, tipoParticipacao, dataCadastro, cadastradoPor, entrada, saida'
    });
    this.pessoas              = this.table('pessoas');
    this.eventos              = this.table('eventos');
    this.participantesEventos = this.table('participantesEventos');
  }
}

export const db = new MyDatabase();
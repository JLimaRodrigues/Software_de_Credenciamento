import Dexie from 'dexie';

export interface Pessoa {
  login?: string;
  senha?: string;
  nome: string;
  cpf: string;
}

class MyDatabase extends Dexie {
  public pessoas: Dexie.Table<Pessoa, number>;

  public constructor() {
    super('MyDatabase');
    this.version(1).stores({
      pessoas: '++id, login, senha, nome, cpf'
    });
    this.pessoas = this.table('pessoas');
    this.table('pessoas').add({login: 'admin', senha: '1234', nome: 'Jefferson', cpf: '1234'});
  }
}

export const db = new MyDatabase();
import Dexie from 'dexie';

export interface Pessoa {
  id: number;
  nome: string;
  login: string;
  email: string;
  cpf: string;
  senha: string;
}

class MyDatabase extends Dexie {
  public pessoas: Dexie.Table<Pessoa, number>;

  public constructor() {
    super('MyDatabase');
    this.version(1).stores({
      pessoas: '++id, login, senha, nome, cpf'
    });
    this.pessoas = this.table('pessoas');
  }
}

export const db = new MyDatabase();
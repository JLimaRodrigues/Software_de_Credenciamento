import Dexie from 'dexie';

export interface Pessoa {
  nome: string;
  sobrenome: string;
  idade: number;
}

class MyDatabase extends Dexie {
  public pessoas: Dexie.Table<Pessoa, number>;

  public constructor() {
    super('MyDatabase');
    this.version(1).stores({
      pessoas: '++id, nome, sobrenome, idade'
    });
    this.pessoas = this.table('pessoas');
  }
}

export const db = new MyDatabase();
import { db, Pessoa } from './db';
import axios from 'axios';

export async function auth(username: string, password: string): Promise<Pessoa | null> {
  try {
    const pessoa = await db.pessoas.get({ 'login': username, 'senha': password });
    if (!pessoa) {
      return null;
    }
    return pessoa;
  } catch (error) {
    //console.error('Erro ao buscar pessoa:', error);
    return null;
  }
}

export async function addPessoa(pessoa: Pessoa): Promise<void> {
  await db.pessoas.add(pessoa);
}

export async function getPessoas(): Promise<Pessoa[]> {
  return await db.pessoas.toArray();
}

export async function syncWithServer(): Promise<void> {
  const pessoas = await getPessoas();
  try {
    const response = await axios.post('https://seu-servidor-remoto/api/sync', { pessoas });
    console.log('Dados sincronizados com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao sincronizar dados:', error);
  }
}
import { db, Pessoa } from './db';
import axios from 'axios';

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
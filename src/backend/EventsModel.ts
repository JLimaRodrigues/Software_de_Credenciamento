import { db, Evento } from './db';
import axios from 'axios';

export async function deleteEvent(id: number): Promise<void> {
  return await db.eventos.delete(id);
}

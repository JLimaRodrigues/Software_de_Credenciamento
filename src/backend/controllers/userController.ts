import { Request, Response } from 'express';
import { openDB } from '../db/sqlite';
import bcrypt from 'bcrypt';

export async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;
  const db = await openDB();
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
}

// Para a criação de usuários (para fins de teste)
export async function createUser(username: string, password: string) {
  const db = await openDB();
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
}
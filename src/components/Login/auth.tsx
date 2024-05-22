import jwt from "jsonwebtoken";
import { db } from "../../backend/db";

const SECRET_KEY: string = 'your_secret_key';

export async function auth(username: string, password: string): Promise<string | null> {
    const pessoa = await db.pessoas.get({'login': username, 'senha': password});

    if(pessoa){
        const token = jwt.sign(
            { id: String(pessoa.id), nome: pessoa.nome || '' },
            SECRET_KEY,
            { expiresIn: '1h' }
        );
        return token;
    } else {
        return null;
    }
}
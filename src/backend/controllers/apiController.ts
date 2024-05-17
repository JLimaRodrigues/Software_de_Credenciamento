import { Request, Response } from 'express';

interface Pessoa {
  nome: string;
  sobrenome: string;
  idade: number;
}

export const pessoal = (req: Request, res: Response) => {
  const pessoas: Pessoa[] = [
    { nome: 'Jefferson', sobrenome: 'Lima', idade: 24 },
    { nome: 'Fabio', sobrenome: 'Anderson', idade: 26 },
    { nome: 'Juliana', sobrenome: 'Lima', idade: 28 },
  ];

  return res.send(pessoas);
};
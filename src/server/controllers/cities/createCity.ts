import { Request, Response } from 'express';

type City = {
  name: string;
};

export const createCity = (req: Request<{}, {}, City>, res: Response) => {
  const data = req.body;

  return res.send('');
};

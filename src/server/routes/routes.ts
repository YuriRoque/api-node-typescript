import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Olá');
});

router.post('/teste', (req, res) => {
  return res.send(req.body);
});

export default router;

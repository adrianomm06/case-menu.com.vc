import Cliente from '../models/Cliente';

export default async (req, res, next) => {
  const { id } = req.params;

  const cliente = await Cliente.findByPk(id);

  if (!cliente) {
    return res.status(400).json({ error: 'Cliente não encontrado!' });
  }

  req.cliente = cliente;

  return next();
};

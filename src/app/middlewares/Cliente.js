import Cliente from '../models/Cliente';

export default async (req, res, next) => {
  const { id } = req.params;
  console.log(req.params);
  console.log(req.params.id);

  const cliente = await Cliente.findByPk(id);
  console.log(cliente);

  if (!cliente) {
    return res.status(401).json({ error: 'Usuário não encontrado!' });
  }

  return next();
};

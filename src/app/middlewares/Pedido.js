import Pedido from '../models/Pedido';
import Cliente from '../models/Cliente';

export default async (req, res, next) => {
  const { id } = req.params;

  const pedido = await Pedido.findByPk(id, {
    attributes: ['id', 'status', 'valor', 'data_pedido', 'cliente_id'],
    include: [
      {
        model: Cliente,
        as: 'cliente',
        attributes: ['primeiro_nome', 'ultimo_nome'],
      },
    ],
  });

  if (!pedido) {
    return res.status(400).json({ error: 'Pedido não encontrado!' });
  }

  req.pedido = pedido;

  return next();
};

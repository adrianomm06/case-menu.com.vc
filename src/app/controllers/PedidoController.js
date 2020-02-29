import * as Yup from 'yup';
import Pedido from '../models/Pedido';
import Cliente from '../models/Cliente';

class PedidoController {
  async index(req, res) {
    const pedidos = await Pedido.findAll({
      attributes: ['id', 'status', 'valor', 'data_pedido', 'cliente_id'],
      include: [
        {
          model: Cliente,
          as: 'cliente',
          attributes: ['primeiro_nome', 'ultimo_nome'],
        },
      ],
    });

    return res.json(pedidos);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
      valor: Yup.number(),
      data_pedido: Yup.date().required(),
      cliente_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados requeridos. Favor validar.' });
    }

    const cliente = await Cliente.findByPk(req.body.cliente_id);

    if (!cliente) {
      return res.status(400).json({ error: 'Cliente não encontrado!' });
    }

    const { id, status, valor, data_pedido, cliente_id } = await Pedido.create(
      req.body
    );

    return res.json({
      id,
      status,
      valor,
      data_pedido,
      cliente_id,
    });
  }

  async show(req, res) {
    return res.json(req.pedido);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
      valor: Yup.number(),
      data_pedido: Yup.date().required(),
      cliente_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Dados requeridos. Favor validar.' });
    }

    const cliente = await Cliente.findByPk(req.body.cliente_id);

    if (!cliente) {
      return res.status(400).json({ error: 'Cliente não encontrado!' });
    }

    const { pedido } = req;

    const { id, status, valor, data_pedido, cliente_id } = await pedido.update(
      req.body
    );

    return res.json({
      id,
      status,
      valor,
      data_pedido,
      cliente_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    Pedido.destroy({
      where: {
        id,
      },
    });

    return res.send();
  }
}

export default new PedidoController();

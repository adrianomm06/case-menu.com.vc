import * as Yup from 'yup';
import Cliente from '../models/Cliente';

class ClienteController {
  async index(req, res) {
    const clientes = await Cliente.findAll({
      attributes: ['id', 'primeiro_nome', 'ultimo_nome', 'email'],
    });

    return res.json(clientes);
  }

  async show(req, res) {
    const { id } = req.params;

    const cliente = await Cliente.findByPk(id);

    return res.json(cliente);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      primeiro_nome: Yup.string().required(),
      ultimo_nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validaçao dos dados.' });
    }

    const ClienteExists = await Cliente.findOne({
      where: { email: req.body.email },
    });

    if (ClienteExists) {
      return res
        .status(400)
        .json({ error: 'Já existe um cliente cadastrado com esse e-mail.' });
    }

    const { id, primeiro_nome, ultimo_nome, email } = await Cliente.create(
      req.body
    );

    return res.json({
      id,
      primeiro_nome,
      ultimo_nome,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      primeiro_nome: Yup.string().required(),
      ultimo_nome: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validaçao dos dados.' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const cliente = await Cliente.findByPk(id);

    if (email !== cliente.email) {
      const ClienteExists = await Cliente.findOne({ where: { email } });

      if (ClienteExists) {
        return res
          .status(400)
          .json({ error: 'Já existe um cliente cadastrado com esse e-mail.' });
      }
    }

    const { primeiro_nome, ultimo_nome } = await cliente.update(req.body);

    return res.json({
      id,
      primeiro_nome,
      ultimo_nome,
      email,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    Cliente.destroy({
      where: {
        id,
      },
    });

    return res.send();
  }
}

export default new ClienteController();

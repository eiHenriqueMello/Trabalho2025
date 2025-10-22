const { Cliente, Cidade } = require('../database').models;

module.exports = {
  async store(req, res) {
    const { nome, altura, nascimento, cidade_id } = req.body;
    
    try {
      const cidade = await Cidade.findByPk(cidade_id);
      if (!cidade) {
          return res.status(404).json({ error: 'Cidade não encontrada.' });
      }

      const cliente = await Cliente.create({ nome, altura, nascimento, cidade_id });
      return res.status(201).json(cliente);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
    }
  },
  
  async show(req, res) {
      const { id } = req.params;
      
      try {
          const cliente = await Cliente.findByPk(id, {
              attributes: ['id', 'nome', 'altura', 'nascimento'],
              include: [{ model: Cidade, as: 'cidade', attributes: ['nome'] }]
          });
          
          if (!cliente) {
              return res.status(404).json({ error: 'Cliente não encontrado.' });
          }
          
          return res.json(cliente);
      } catch (error) {
          return res.status(500).json({ error: 'Erro ao buscar cliente.' });
      }
  },
  
  async update(req, res) {
      const { id } = req.params;
      const { nome, altura, nascimento, cidade_id } = req.body;
      
      try {
          const [updated] = await Cliente.update(
              { nome, altura, nascimento, cidade_id },
              { where: { id: id } }
          );

          if (updated) {
              const updatedCliente = await Cliente.findByPk(id);
              return res.status(200).json(updatedCliente);
          }
          
          return res.status(404).json({ error: 'Cliente não encontrado para atualização.' });

      } catch (error) {
          return res.status(500).json({ error: 'Erro ao atualizar cliente.' });
      }
  }
};
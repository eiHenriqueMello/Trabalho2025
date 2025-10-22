const { Produto, Categoria } = require('../database').models;

module.exports = {
  async index(req, res) {
    try {
      const produtos = await Produto.findAll({
        include: [{ model: Categoria, as: 'categoria' }]
      });
      return res.json(produtos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar produtos.' });
    }
  },

  async store(req, res) {
    const { nome, preco, quantidade, categoria_id } = req.body;

    if (!nome || !preco || !quantidade || !categoria_id) {
        return res.status(400).json({ error: 'Dados incompletos para o produto.' });
    }
    
    try {
      const produto = await Produto.create({ nome, preco, quantidade, categoria_id });
      return res.status(201).json(produto);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar produto.' });
    }
  },
};
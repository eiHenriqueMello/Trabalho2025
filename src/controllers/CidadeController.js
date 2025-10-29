const { Cidade } = require('../database').models;

module.exports = {
 
  async store(req, res) {
    const { nome } = req.body;
    
    if (!nome) {
        return res.status(400).json({ error: 'O nome da cidade é obrigatório.' });
    }

    try {
      const cidade = await Cidade.create({ nome });
      
      return res.status(201).json(cidade);
      
    } catch (error) {
      console.error('ERRO AO CADASTRAR CIDADE:', error);
      return res.status(500).json({ error: 'Erro interno ao cadastrar cidade.' });
    }
  },
  
  
  async index(req, res) {
      try {
          const cidades = await Cidade.findAll();
          return res.json(cidades);
      } catch (error) {
          console.error('ERRO AO LISTAR CIDADES:', error);
          return res.status(500).json({ error: 'Erro ao listar cidades.' });
      }
  }
};
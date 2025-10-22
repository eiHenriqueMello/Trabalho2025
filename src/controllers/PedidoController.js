// src/controllers/PedidoController.js
const { Pedido, Cliente, PedidoProduto, Produto } = require('../database').models;

module.exports = {
  // POST /api/pedidos (Realização de Pedido)
  async store(req, res) {
    const { cliente_id, endereco, itens } = req.body; 

    if (!cliente_id || !endereco || !itens || itens.length === 0) {
        return res.status(400).json({ error: 'Dados incompletos para o pedido.' });
    }
    
    const cliente = await Cliente.findByPk(cliente_id);
    if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    try {
      const pedido = await Pedido.create({ cliente_id, endereco, horario: new Date() });

      for (const item of itens) {
        const produto = await Produto.findByPk(item.produto_id);

        if (!produto || produto.quantidade < item.quantidade) {
            return res.status(400).json({ 
                error: `Produto ID ${item.produto_id} indisponível ou estoque insuficiente.` 
            });
        }
        
        await PedidoProduto.create({
            pedido_id: pedido.id,
            produto_id: produto.id,
            quantidade: item.quantidade,
            preco: produto.preco
        });
        
        // Atualiza o estoque
        produto.quantidade -= item.quantidade;
        await produto.save();
      }

      return res.status(201).json(pedido);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar pedido.' });
    }
  },
  
  // GET /api/pedidos (Lista pedidos do cliente)
  async index(req, res) {
      const { cliente_id } = req.query; 
      
      if (!cliente_id) {
          return res.status(401).json({ error: 'É necessário informar o cliente_id.' });
      }

      try {
          const pedidos = await Pedido.findAll({
              where: { cliente_id },
              include: [{ 
                  model: PedidoProduto, 
                  as: 'itens_pedido',
                  attributes: ['quantidade', 'preco'],
                  include: [{
                      model: Produto,
                      as: 'Produto',
                      attributes: ['nome']
                  }]
              }],
              order: [['horario', 'DESC']]
          });
          
          return res.json(pedidos);

      } catch (error) {
          return res.status(500).json({ error: 'Erro ao listar pedidos.' });
      }
  },
  
  // GET /api/admin/pedidos (Lista todos os pedidos - Admin)
  async indexAll(req, res) {
      try {
          const pedidos = await Pedido.findAll({
              include: [{ model: Cliente, as: 'cliente', attributes: ['nome'] }],
              order: [['horario', 'DESC']]
          });
          
          return res.json(pedidos);
      } catch (error) {
          return res.status(500).json({ error: 'Erro ao listar todos os pedidos.' });
      }
  }
};
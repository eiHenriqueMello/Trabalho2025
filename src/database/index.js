const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Cidade = require('../models/Cidade');
const Cliente = require('../models/Cliente');
const Categoria = require('../models/Categoria');
const Produto = require('../models/Produto');
const Pedido = require('../models/Pedido');
const PedidoProduto = require('../models/PedidoProduto');

const connection = new Sequelize(dbConfig);

Cidade.init(connection);
Cliente.init(connection);
Categoria.init(connection);
Produto.init(connection);
Pedido.init(connection);
PedidoProduto.init(connection); 

const models = connection.models;
Cidade.associate(models);
Cliente.associate(models);
Produto.associate(models);
Pedido.associate(models);
PedidoProduto.associate(models);

module.exports = connection;
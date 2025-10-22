const { Model, DataTypes } = require('sequelize');

class Pedido extends Model {
  static init(sequelize) {
    super.init({
      horario: DataTypes.DATE,
      endereco: DataTypes.STRING(200),
    }, {
      sequelize,
      tableName: 'pedidos',
    });
  }

  static associate(models) {
    this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
    this.belongsToMany(models.Produto, { 
      foreignKey: 'pedido_id', 
      through: 'pedidos_produtos',
      as: 'produtos' 
    });
    this.hasMany(models.PedidoProduto, { foreignKey: 'pedido_id', as: 'itens_pedido' });
  }
}
module.exports = Pedido;
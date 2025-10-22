const { Model, DataTypes } = require('sequelize');

class PedidoProduto extends Model {
  static init(sequelize) {
    super.init({
      preco: DataTypes.DOUBLE,
      quantidade: DataTypes.DOUBLE,
    }, {
      sequelize,
      tableName: 'pedidos_produtos',
    });
  }
  
  static associate(models) {
    this.belongsTo(models.Pedido, { foreignKey: 'pedido_id', as: 'pedido' });
    this.belongsTo(models.Produto, { foreignKey: 'produto_id', as: 'produto' });
  }
}
module.exports = PedidoProduto;
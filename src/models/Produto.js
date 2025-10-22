const { Model, DataTypes } = require('sequelize');

class Produto extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING(100),
      preco: DataTypes.DOUBLE,
      quantidade: DataTypes.DOUBLE,
    }, {
      sequelize,
      tableName: 'produtos',
    });
  }

  static associate(models) {
    this.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
    this.belongsToMany(models.Pedido, { 
      foreignKey: 'produto_id', 
      through: 'pedidos_produtos', 
      as: 'pedidos' 
    });
  }
}
module.exports = Produto;
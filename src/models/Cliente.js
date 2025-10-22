const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {
  static init(sequelize) {
    super.init({
      nome: DataTypes.STRING(100),
      altura: DataTypes.DOUBLE,
      nascimento: DataTypes.DATE,
    }, {
      sequelize,
      tableName: 'clientes',
    });
  }

  static associate(models) {
    this.belongsTo(models.Cidade, { foreignKey: 'cidade_id', as: 'cidade' });
    this.hasMany(models.Pedido, { foreignKey: 'cliente_id', as: 'pedidos' });
  }
}
module.exports = Cliente;